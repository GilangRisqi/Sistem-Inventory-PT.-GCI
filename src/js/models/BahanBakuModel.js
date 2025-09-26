import * as db from "../db.js";

export class BahanBakuModel {
  constructor() {
    this.storeNames = {
      stock: db.DB_STORES.bahanBakuStock,
      transactions: db.DB_STORES.bahanBakuTransactions,
    };
  }

  async updateStock(category, data) {
    // Extract tanggalLengkap from data if it exists
    const { tanggalLengkap, ...restData } = data;

    const stockData = {
      category,
      ...restData,
      updatedAt: tanggalLengkap || new Date().toISOString(),
    };

    try {
      // Check if nomor already exists for the category
      const existing = await db.getRecordsByIndex(
        this.storeNames.stock,
        "nomor",
        data.nomor,
        (record) => record.category === category
      );

      if (existing && existing.length > 0) {
        throw new Error(
          `Nomor ${data.nomor} sudah ada untuk kategori ${category}`
        );
      }

      const id = await db.addRecord(this.storeNames.stock, stockData);
      await db.addToSyncQueue({
        type: "bahanBakuStock",
        action: "update",
        data: stockData,
      });
      return id;
    } catch (error) {
      throw new Error(`Gagal memperbarui stock ${category}: ${error.message}`);
    }
  }

  async addStock(category, data) {
    const transactionData = {
      category,
      type: "in",
      ...data,
      timestamp: new Date().toISOString(),
    };

    try {
      const id = await db.addRecord(
        this.storeNames.transactions,
        transactionData
      );
      await db.addToSyncQueue({
        type: "bahanBakuTransactions",
        action: "add",
        data: transactionData,
      });
      return id;
    } catch (error) {
      throw new Error(`Gagal menambah stock ${category}: ${error.message}`);
    }
  }

  async reduceStock(category, data) {
    const transactionData = {
      category,
      type: "out",
      ...data,
      timestamp: new Date().toISOString(),
    };

    try {
      const id = await db.addRecord(
        this.storeNames.transactions,
        transactionData
      );
      await db.addToSyncQueue({
        type: "bahanBakuTransactions",
        action: "add",
        data: transactionData,
      });
      return id;
    } catch (error) {
      throw new Error(`Gagal mengurangi stock ${category}: ${error.message}`);
    }
  }

  async getStockByCategory(category) {
    try {
      return await db.getRecordsByIndex(
        this.storeNames.stock,
        "category",
        category
      );
    } catch (error) {
      throw new Error(
        `Gagal mengambil data stock ${category}: ${error.message}`
      );
    }
  }

  async getTransactionsByDateRange(category, startDate, endDate) {
    try {
      return await db.getRecordsByDateRange(
        this.storeNames.transactions,
        startDate,
        endDate,
        (record) => record.category === category
      );
    } catch (error) {
      throw new Error(
        `Gagal mengambil data transaksi ${category}: ${error.message}`
      );
    }
  }
}
