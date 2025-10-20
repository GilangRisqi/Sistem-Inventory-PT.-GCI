import * as db from "../db.js";

export class DailyReportModel {
  constructor() {
    this.storeName = db.DB_STORES.dailyReport;
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
      throw new Error("Gagal menyimpan daily report: " + error.message);
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
      throw new Error("Gagal mengambil daily report: " + error.message);
    }
  }

  async getByDateRange(startDate, endDate) {
    try {
      return await db.getRecordsByDateRange(this.storeName, startDate, endDate);
    } catch (error) {
      throw new Error("Gagal mengambil daily report: " + error.message);
    }
  }

  async getById(id) {
    try {
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction([this.storeName], "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(Number(id));

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      throw new Error("Gagal mengambil daily report: " + error.message);
    }
  }

  async update(id, data) {
    try {
      data.updatedAt = new Date().toISOString();
      data.id = Number(id);

      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.put(data);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      throw new Error("Gagal mengupdate daily report: " + error.message);
    }
  }

  async delete(id) {
    try {
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(Number(id));

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      throw new Error("Gagal menghapus daily report: " + error.message);
    }
  }

  // Get next available nomor for current month (like banner pattern)
  async getNextNomor() {
    try {
      console.log("🔍 Getting next nomor from database...");
      const allReports = await this.getAll();
      console.log("📊 Total reports in database:", allReports.length);

      // Get current month and year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // 0-based month
      console.log(`📅 Current month/year: ${currentMonth + 1}/${currentYear}`);

      // Filter reports for the current month and year
      const reportsForMonth = allReports.filter((report) => {
        const reportDate = new Date(report.tanggal);
        const reportYear = reportDate.getFullYear();
        const reportMonth = reportDate.getMonth();
        return reportYear === currentYear && reportMonth === currentMonth;
      });

      console.log("📈 Reports for current month:", reportsForMonth.length);

      if (reportsForMonth.length === 0) {
        console.log("✨ First report for this month, returning 1");
        return 1; // First report for this month
      }

      // Find the maximum nomor for this month and increment by 1
      const nomors = reportsForMonth.map((report) => Number(report.nomor) || 0);
      console.log("🔢 Existing nomors:", nomors);

      const maxNomor = Math.max(...nomors);
      const nextNomor = maxNomor + 1;

      console.log(`🎯 Max nomor: ${maxNomor}, Next nomor: ${nextNomor}`);
      return nextNomor;
    } catch (error) {
      console.error("❌ Error getting next nomor:", error);
      return 1; // Default to 1 if error occurs
    }
  }

  // Legacy method untuk backward compatibility
  async add(data) {
    return this.save(data);
  }
}
