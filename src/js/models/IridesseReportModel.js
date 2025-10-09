import * as db from "../db.js";

export class IridesseReportModel {
  constructor() {
    this.storeName = db.DB_STORES.iridesseReports;
  }

  async save(data) {
    try {
      // Add timestamp if not present
      if (!data.createdAt) {
        data.createdAt = new Date().toISOString();
      }
      data.updatedAt = new Date().toISOString();

      const id = await db.addRecord(this.storeName, data);
      return id;
    } catch (error) {
      throw new Error("Gagal menyimpan laporan Iridesse: " + error.message);
    }
  }

  async getAll() {
    try {
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction([this.storeName], "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      throw new Error("Gagal mengambil laporan Iridesse: " + error.message);
    }
  }

  async getByDateRange(startDate, endDate) {
    try {
      return await db.getRecordsByDateRange(this.storeName, startDate, endDate);
    } catch (error) {
      throw new Error("Gagal mengambil laporan Iridesse: " + error.message);
    }
  }

  async getById(id) {
    try {
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(Number(id));
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      throw new Error("Gagal mengambil laporan Iridesse: " + error.message);
    }
  }

  async update(id, data) {
    try {
      data.updatedAt = new Date().toISOString();
      data.id = Number(id);
      
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put(data);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      throw new Error("Gagal mengupdate laporan Iridesse: " + error.message);
    }
  }

  async delete(id) {
    try {
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(Number(id));
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      throw new Error("Gagal menghapus laporan Iridesse: " + error.message);
    }
  }
}
