import * as db from "../db.js";

export class DailyReportModel {
  constructor() {
    this.storeName = db.DB_STORES.dailyReport;
  }

  async add(data) {
    try {
      const id = await db.addRecord(this.storeName, data);
      await db.addToSyncQueue({
        type: "dailyReport",
        action: "add",
        data,
      });
      return id;
    } catch (error) {
      throw new Error("Gagal menyimpan daily report: " + error.message);
    }
  }

  async getByDateRange(startDate, endDate) {
    try {
      return await db.getRecordsByDateRange(this.storeName, startDate, endDate);
    } catch (error) {
      throw new Error("Gagal mengambil daily report: " + error.message);
    }
  }
}
