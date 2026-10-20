// Real-time Sync Manager for PT. GCI Inventory System
import { dbService } from "./SupabaseService.js";
import { TABLES } from "../config/supabase.js";

class RealtimeManager {
  constructor() {
    this.subscriptions = new Map();
    this.callbacks = new Map();
    this.isConnected = false;
  }

  // Initialize real-time connections
  async initialize() {
    try {
      console.log("🔄 Initializing real-time sync...");

      // Subscribe to all tables
      this.subscribeToTable(TABLES.BAHAN_BAKU, "stock");
      this.subscribeToTable(TABLES.DAILY_REPORTS, "daily-reports");
      this.subscribeToTable(TABLES.IRIDESSE_REPORTS, "iridesse-reports");

      this.isConnected = true;
      console.log("✅ Real-time sync initialized successfully");

      // Dispatch custom event for UI updates
      window.dispatchEvent(
        new CustomEvent("realtimeConnected", {
          detail: { status: "connected", timestamp: new Date().toISOString() },
        })
      );
    } catch (error) {
      console.error("❌ Failed to initialize real-time sync:", error);
      this.isConnected = false;
    }
  }

  // Subscribe to table changes
  subscribeToTable(tableName, eventName) {
    try {
      const channel = dbService.subscribeToTable(tableName, (payload) => {
        console.log(`📡 Real-time update for ${tableName}:`, payload);
        this.handleRealtimeUpdate(eventName, payload);
      });

      this.subscriptions.set(tableName, channel);
      console.log(`✅ Subscribed to ${tableName} changes`);
    } catch (error) {
      console.error(`❌ Failed to subscribe to ${tableName}:`, error);
    }
  }

  // Handle real-time updates
  handleRealtimeUpdate(eventName, payload) {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    // Log the update
    console.log(`🔄 Real-time ${eventType} for ${eventName}:`, {
      new: newRecord,
      old: oldRecord,
    });

    // Trigger callbacks
    const callbacks = this.callbacks.get(eventName) || [];
    callbacks.forEach((callback) => {
      try {
        callback({ eventType, newRecord, oldRecord, tableName: eventName });
      } catch (error) {
        console.error("Error in real-time callback:", error);
      }
    });

    // Dispatch custom events for different operations
    switch (eventType) {
      case "INSERT":
        window.dispatchEvent(
          new CustomEvent(`${eventName}-added`, {
            detail: { record: newRecord, timestamp: new Date().toISOString() },
          })
        );
        break;

      case "UPDATE":
        window.dispatchEvent(
          new CustomEvent(`${eventName}-updated`, {
            detail: {
              newRecord,
              oldRecord,
              timestamp: new Date().toISOString(),
            },
          })
        );
        break;

      case "DELETE":
        window.dispatchEvent(
          new CustomEvent(`${eventName}-deleted`, {
            detail: { record: oldRecord, timestamp: new Date().toISOString() },
          })
        );
        break;
    }

    // Show toast notification for important updates
    this.showUpdateNotification(eventName, eventType, newRecord || oldRecord);
  }

  // Show notification for updates
  showUpdateNotification(eventName, eventType, record) {
    const messages = {
      stock: {
        INSERT: `📦 Bahan baku baru ditambahkan: ${record?.nama}`,
        UPDATE: `📝 Bahan baku diperbarui: ${record?.nama}`,
        DELETE: `🗑️ Bahan baku dihapus: ${record?.nama}`,
      },
      "daily-reports": {
        INSERT: `📊 Laporan harian baru: ${record?.operator} - ${record?.tanggal}`,
        UPDATE: `📝 Laporan harian diperbarui: ${record?.operator}`,
        DELETE: `🗑️ Laporan harian dihapus: ${record?.operator}`,
      },
      "iridesse-reports": {
        INSERT: `🖨️ Laporan Iridesse baru: ${record?.job_name}`,
        UPDATE: `📝 Laporan Iridesse diperbarui: ${record?.job_name}`,
        DELETE: `🗑️ Laporan Iridesse dihapus: ${record?.job_name}`,
      },
    };

    const message =
      messages[eventName]?.[eventType] || `${eventType} pada ${eventName}`;

    // Show toast notification (if toast system exists)
    if (window.showToast) {
      window.showToast(message, "info", 3000);
    } else {
      // Fallback to console
      console.log(`🔔 ${message}`);
    }
  }

  // Register callback for specific table updates
  onTableUpdate(tableName, callback) {
    if (!this.callbacks.has(tableName)) {
      this.callbacks.set(tableName, []);
    }
    this.callbacks.get(tableName).push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.callbacks.get(tableName);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  // Register callback for stock updates
  onStockUpdate(callback) {
    return this.onTableUpdate("stock", callback);
  }

  // Register callback for daily report updates
  onDailyReportUpdate(callback) {
    return this.onTableUpdate("daily-reports", callback);
  }

  // Register callback for Iridesse report updates
  onIridesseReportUpdate(callback) {
    return this.onTableUpdate("iridesse-reports", callback);
  }

  // Disconnect all real-time subscriptions
  disconnect() {
    try {
      console.log("🔌 Disconnecting real-time sync...");

      this.subscriptions.forEach((channel, tableName) => {
        dbService.unsubscribeFromTable(tableName);
      });

      this.subscriptions.clear();
      this.callbacks.clear();
      this.isConnected = false;

      window.dispatchEvent(
        new CustomEvent("realtimeDisconnected", {
          detail: {
            status: "disconnected",
            timestamp: new Date().toISOString(),
          },
        })
      );

      console.log("✅ Real-time sync disconnected");
    } catch (error) {
      console.error("❌ Error disconnecting real-time sync:", error);
    }
  }

  // Get connection status
  getStatus() {
    return {
      isConnected: this.isConnected,
      subscriptions: Array.from(this.subscriptions.keys()),
      callbackCount: Array.from(this.callbacks.values()).reduce(
        (sum, arr) => sum + arr.length,
        0
      ),
    };
  }

  // Force reconnect
  async reconnect() {
    console.log("🔄 Reconnecting real-time sync...");
    this.disconnect();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    await this.initialize();
  }
}

// Create singleton instance
export const realtimeManager = new RealtimeManager();
export default realtimeManager;

// Auto-initialize when module is loaded
if (typeof window !== "undefined") {
  // Initialize after DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => realtimeManager.initialize(), 1000);
    });
  } else {
    setTimeout(() => realtimeManager.initialize(), 1000);
  }
}
