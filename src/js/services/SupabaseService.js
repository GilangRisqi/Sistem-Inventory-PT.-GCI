// Supabase Database Service with Hybrid Storage (Online + Offline)
import { supabase, TABLES, SUPABASE_CONFIG } from "../config/supabase.js";

class SupabaseService {
  constructor() {
    this.isOnline = navigator.onLine;
    this.pendingOperations = [];
    this.realtimeChannels = new Map();

    // Listen for online/offline events
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.syncPendingOperations();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
    });

    // Initialize IndexedDB fallback
    this.initIndexedDB();
  }

  // Initialize IndexedDB for offline support
  async initIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("GCIInventoryOffline", 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.offlineDB = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores for offline data
        if (!db.objectStoreNames.contains("bahan_baku")) {
          const bahanBakuStore = db.createObjectStore("bahan_baku", {
            keyPath: "id",
          });
          bahanBakuStore.createIndex("nama", "nama", { unique: false });
        }

        if (!db.objectStoreNames.contains("daily_reports")) {
          const dailyStore = db.createObjectStore("daily_reports", {
            keyPath: "id",
          });
          dailyStore.createIndex("tanggal", "tanggal", { unique: false });
        }

        if (!db.objectStoreNames.contains("iridesse_reports")) {
          const iridesseStore = db.createObjectStore("iridesse_reports", {
            keyPath: "id",
          });
          iridesseStore.createIndex("tanggal", "tanggal", { unique: false });
        }

        // Store for pending operations when offline
        if (!db.objectStoreNames.contains("pending_operations")) {
          db.createObjectStore("pending_operations", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };
    });
  }

  // Generate UUID for new records
  generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Check if online and Supabase is available
  async isSupabaseAvailable() {
    if (!this.isOnline) return false;

    try {
      const { data, error } = await supabase
        .from(TABLES.BAHAN_BAKU)
        .select("count")
        .limit(1);
      return !error;
    } catch (e) {
      return false;
    }
  }

  // Generic CREATE operation
  async create(tableName, data) {
    const record = {
      ...data,
      id: data.id || this.generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      device_id: this.getDeviceId(),
    };

    if (await this.isSupabaseAvailable()) {
      try {
        const { data: result, error } = await supabase
          .from(tableName)
          .insert(record)
          .select()
          .single();

        if (error) throw error;

        // Also save to offline storage for caching
        await this.saveToOfflineStorage(tableName, result);
        return result;
      } catch (error) {
        console.error("Supabase create error:", error);
        // Fallback to offline storage
        return await this.createOffline(tableName, record);
      }
    } else {
      return await this.createOffline(tableName, record);
    }
  }

  // Generic READ operation
  async read(tableName, filters = {}) {
    if (await this.isSupabaseAvailable()) {
      try {
        let query = supabase.from(tableName).select("*");

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value);
          }
        });

        const { data, error } = await query.order("created_at", {
          ascending: false,
        });

        if (error) throw error;

        // Cache to offline storage
        if (data) {
          for (const record of data) {
            await this.saveToOfflineStorage(tableName, record);
          }
        }

        return data || [];
      } catch (error) {
        console.error("Supabase read error:", error);
        return await this.readOffline(tableName, filters);
      }
    } else {
      return await this.readOffline(tableName, filters);
    }
  }

  // Generic UPDATE operation
  async update(tableName, id, data) {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    if (await this.isSupabaseAvailable()) {
      try {
        const { data: result, error } = await supabase
          .from(tableName)
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;

        // Update offline storage
        await this.saveToOfflineStorage(tableName, result);
        return result;
      } catch (error) {
        console.error("Supabase update error:", error);
        return await this.updateOffline(tableName, id, updateData);
      }
    } else {
      return await this.updateOffline(tableName, id, updateData);
    }
  }

  // Generic DELETE operation
  async delete(tableName, id) {
    if (await this.isSupabaseAvailable()) {
      try {
        const { error } = await supabase.from(tableName).delete().eq("id", id);

        if (error) throw error;

        // Remove from offline storage
        await this.deleteFromOfflineStorage(tableName, id);
        return true;
      } catch (error) {
        console.error("Supabase delete error:", error);
        return await this.deleteOffline(tableName, id);
      }
    } else {
      return await this.deleteOffline(tableName, id);
    }
  }

  // Offline storage operations
  async createOffline(tableName, data) {
    const transaction = this.offlineDB.transaction(
      [tableName, "pending_operations"],
      "readwrite"
    );

    // Save to main table
    await new Promise((resolve, reject) => {
      const request = transaction.objectStore(tableName).add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    // Add to pending operations for sync later
    await new Promise((resolve, reject) => {
      const pendingOp = {
        operation: "create",
        tableName,
        data,
        timestamp: Date.now(),
      };
      const request = transaction
        .objectStore("pending_operations")
        .add(pendingOp);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return data;
  }

  async readOffline(tableName, filters = {}) {
    return new Promise((resolve, reject) => {
      const transaction = this.offlineDB.transaction([tableName], "readonly");
      const store = transaction.objectStore(tableName);
      const request = store.getAll();

      request.onsuccess = () => {
        let results = request.result || [];

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            results = results.filter((item) => item[key] === value);
          }
        });

        resolve(results);
      };

      request.onerror = () => reject(request.error);
    });
  }

  async updateOffline(tableName, id, data) {
    const transaction = this.offlineDB.transaction(
      [tableName, "pending_operations"],
      "readwrite"
    );

    // Update main table
    const record = await new Promise((resolve, reject) => {
      const getRequest = transaction.objectStore(tableName).get(id);
      getRequest.onsuccess = () => {
        const existingRecord = getRequest.result;
        if (existingRecord) {
          const updatedRecord = { ...existingRecord, ...data };
          const putRequest = transaction
            .objectStore(tableName)
            .put(updatedRecord);
          putRequest.onsuccess = () => resolve(updatedRecord);
          putRequest.onerror = () => reject(putRequest.error);
        } else {
          reject(new Error("Record not found"));
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });

    // Add to pending operations
    await new Promise((resolve, reject) => {
      const pendingOp = {
        operation: "update",
        tableName,
        id,
        data,
        timestamp: Date.now(),
      };
      const request = transaction
        .objectStore("pending_operations")
        .add(pendingOp);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return record;
  }

  async deleteOffline(tableName, id) {
    const transaction = this.offlineDB.transaction(
      [tableName, "pending_operations"],
      "readwrite"
    );

    // Delete from main table
    await new Promise((resolve, reject) => {
      const request = transaction.objectStore(tableName).delete(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    // Add to pending operations
    await new Promise((resolve, reject) => {
      const pendingOp = {
        operation: "delete",
        tableName,
        id,
        timestamp: Date.now(),
      };
      const request = transaction
        .objectStore("pending_operations")
        .add(pendingOp);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return true;
  }

  async saveToOfflineStorage(tableName, data) {
    if (!this.offlineDB) return;

    try {
      const transaction = this.offlineDB.transaction([tableName], "readwrite");
      const store = transaction.objectStore(tableName);
      await new Promise((resolve, reject) => {
        const request = store.put(data);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error saving to offline storage:", error);
    }
  }

  async deleteFromOfflineStorage(tableName, id) {
    if (!this.offlineDB) return;

    try {
      const transaction = this.offlineDB.transaction([tableName], "readwrite");
      const store = transaction.objectStore(tableName);
      await new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error deleting from offline storage:", error);
    }
  }

  // Sync pending operations when back online
  async syncPendingOperations() {
    if (!(await this.isSupabaseAvailable())) return;

    try {
      const transaction = this.offlineDB.transaction(
        ["pending_operations"],
        "readwrite"
      );
      const store = transaction.objectStore("pending_operations");
      const request = store.getAll();

      request.onsuccess = async () => {
        const pendingOps = request.result || [];

        for (const op of pendingOps) {
          try {
            switch (op.operation) {
              case "create":
                await supabase.from(op.tableName).insert(op.data);
                break;
              case "update":
                await supabase
                  .from(op.tableName)
                  .update(op.data)
                  .eq("id", op.id);
                break;
              case "delete":
                await supabase.from(op.tableName).delete().eq("id", op.id);
                break;
            }

            // Remove successful operation from pending
            store.delete(op.id);
          } catch (error) {
            console.error("Sync error for operation:", op, error);
          }
        }
      };
    } catch (error) {
      console.error("Error syncing pending operations:", error);
    }
  }

  // Subscribe to real-time changes
  subscribeToTable(tableName, callback) {
    if (!SUPABASE_CONFIG.enableRealtime) return null;

    const channel = supabase
      .channel(`public:${tableName}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: tableName },
        callback
      )
      .subscribe();

    this.realtimeChannels.set(tableName, channel);
    return channel;
  }

  // Unsubscribe from real-time changes
  unsubscribeFromTable(tableName) {
    const channel = this.realtimeChannels.get(tableName);
    if (channel) {
      supabase.removeChannel(channel);
      this.realtimeChannels.delete(tableName);
    }
  }

  // Get device ID for tracking
  getDeviceId() {
    let deviceId = localStorage.getItem("gci_device_id");
    if (!deviceId) {
      deviceId = this.generateId();
      localStorage.setItem("gci_device_id", deviceId);
    }
    return deviceId;
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isOnline: this.isOnline,
      isSupabaseConnected: this.isSupabaseAvailable(),
      deviceId: this.getDeviceId(),
    };
  }
}

// Create singleton instance
export const dbService = new SupabaseService();
export default dbService;
