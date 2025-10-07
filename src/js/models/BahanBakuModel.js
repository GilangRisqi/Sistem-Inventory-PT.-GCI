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
    console.log("Adding stock:", { category, data });
    const transactionData = {
      category,
      type: "in",
      ...data,
      timestamp: new Date().toISOString(),
      sisaStock: data.total || data.qtyLastMonth + data.jumlahMasuk || 0,
    };
    console.log("Transaction data:", transactionData);

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

  async getCurrentStock(category) {
    try {
      // Get all transactions for the specified category
      const transactions = await db.getRecordsByIndex(
        this.storeNames.transactions,
        "category",
        category
      );

      // Group transactions by product (jenisKertas & ukuran combination)
      const stockMap = new Map();

      transactions.forEach((transaction) => {
        const key = `${transaction.jenisKertas}-${transaction.ukuran}`;
        if (!stockMap.has(key)) {
          stockMap.set(key, {
            nomor: transaction.nomor,
            jenisKertas: transaction.jenisKertas,
            ukuran: transaction.ukuran,
            totalMasuk: 0,
            totalKeluar: 0,
            tanggal: transaction.tanggal,
          });
        }

        const item = stockMap.get(key);

        // Update the latest date
        if (new Date(transaction.tanggal) > new Date(item.tanggal)) {
          item.tanggal = transaction.tanggal;
        }

        if (transaction.type === "in") {
          // Untuk transaksi masuk, tambahkan jumlah masuk ke total
          const jumlahMasuk = transaction.jumlahMasuk || 0;
          item.totalMasuk += jumlahMasuk;

          // Update tanggal jika ini adalah transaksi terbaru
          if (
            !item.lastUpdate ||
            new Date(transaction.tanggal) > new Date(item.lastUpdate)
          ) {
            item.lastUpdate = transaction.tanggal;
          }
        } else if (transaction.type === "out") {
          // Untuk transaksi keluar, tambahkan total keluar
          const totalKeluarBaru =
            (transaction.totalKeluarOk || 0) + (transaction.totalKeluarNg || 0);
          item.totalKeluar += totalKeluarBaru;
        }

        // Hitung sisa stock berdasarkan total masuk dan keluar
        item.sisaStock = item.totalMasuk - item.totalKeluar;
      });

      // Convert map to array and sort by nomor
      return Array.from(stockMap.values()).sort((a, b) => a.nomor - b.nomor);
    } catch (error) {
      throw new Error(
        `Gagal mengambil data stock ${category}: ${error.message}`
      );
    }
  }

  async getCurrentBannerStock() {
    return this.getCurrentStock("banner");
  }

  async getCurrentDigitalStock() {
    return this.getCurrentStock("digital");
  }

  async getCurrentProduksiStock() {
    return this.getCurrentStock("produksi");
  }
}
