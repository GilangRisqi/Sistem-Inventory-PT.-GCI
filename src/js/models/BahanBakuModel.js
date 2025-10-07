import * as db from "../db.js";

export class BahanBakuModel {
  constructor() {
    this.storeNames = {
      stock: db.DB_STORES.bahanBakuStock,
      transactions: db.DB_STORES.bahanBakuTransactions,
    };
  }

  async getCurrentBannerStock() {
    const data = await this.getCurrentStock("banner");
    return data;
  }

  async getCurrentDigitalStock() {
    const data = await this.getCurrentStock("digital");
    return data;
  }

  async getCurrentProduksiStock() {
    const data = await this.getCurrentStock("produksi");
    return data;
  }

  async initDatabase() {
    try {
      await db.openDB();
      console.log("BahanBakuModel: Database connection verified");
    } catch (error) {
      console.error("BahanBakuModel: Database initialization failed:", error);
      throw error;
    }
  }

  async updateStock(category, data) {
    try {
      console.log("=== Updating Stock in Model ===");
      console.log("Category:", category);
      console.log("Data:", JSON.stringify(data, null, 2));

      // Extract tanggalLengkap from data if it exists
      const { tanggalLengkap, ...restData } = data;

      const stockData = {
        category,
        ...restData,
        updatedAt: tanggalLengkap || new Date().toISOString(),
      };

      console.log("Prepared stock data:", JSON.stringify(stockData, null, 2));

      // Check if nomor already exists for the category
      console.log("Checking for existing nomor...");
      try {
        const existing = await db.getRecordsByIndex(
          this.storeNames.stock,
          "nomor",
          data.nomor
        );
        console.log("All records with nomor:", existing);

        // Filter by category
        const existingInCategory = existing.filter(
          (record) => record.category === category
        );
        console.log("Existing records in category:", existingInCategory.length);

        if (existingInCategory && existingInCategory.length > 0) {
          throw new Error(
            `Nomor ${data.nomor} sudah ada untuk kategori ${category}`
          );
        }
      } catch (indexError) {
        console.warn(
          'Index "nomor" not found, using alternative method:',
          indexError.message
        );
        // Fallback: get all records and filter manually
        try {
          const allRecords = await db.getRecords(this.storeNames.stock);
          const existingInCategory = allRecords.filter(
            (record) =>
              record.category === category && record.nomor === data.nomor
          );

          if (existingInCategory && existingInCategory.length > 0) {
            throw new Error(
              `Nomor ${data.nomor} sudah ada untuk kategori ${category}`
            );
          }
        } catch (fallbackError) {
          console.warn(
            "Fallback method also failed, continuing without validation:",
            fallbackError.message
          );
        }
      }

      console.log("Adding record to IndexedDB...");
      const id = await db.addRecord(this.storeNames.stock, stockData);
      console.log("Record added with ID:", id);

      await db.addToSyncQueue({
        type: "bahanBakuStock",
        action: "update",
        data: stockData,
      });
      console.log("Added to sync queue");

      return id;
    } catch (error) {
      console.error("Error in updateStock:", error);
      throw new Error(`Gagal memperbarui stock ${category}: ${error.message}`);
    }
  }

  async addStock(category, formData) {
    try {
      console.log("=== Adding Stock (Model) ===>");
      console.log("Category:", category);
      console.log("Form Data:", JSON.stringify(formData, null, 2));

      const { data } = formData;
      if (!data) {
        throw new Error("Data tidak valid");
      }

      console.log("Validating data structure...");

      // Update stock data
      console.log("Updating stock data...");
      const stockId = await this.updateStock(category, data);
      console.log(`Stock updated with ID: ${stockId}`);

      // Log transaction
      console.log("Logging transaction...");
      const transactionId = await this.logTransaction(category, "in", data);
      console.log(`Transaction logged with ID: ${transactionId}`);

      // Immediately fetch and verify the saved data
      const savedStocks = await db.getRecords(this.storeNames.stock);
      const savedStock = savedStocks.find((stock) => stock.id === stockId);
      console.log("Verified saved stock data:", savedStock);

      return stockId;
    } catch (error) {
      console.error("Error adding stock:", error);
      throw error;
    }
  }

  async reduceStock(category, data) {
    try {
      const transactionData = {
        category,
        type: "out",
        ...data,
        timestamp: new Date().toISOString(),
      };

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

  async logTransaction(category, type, data) {
    try {
      const transactionData = {
        category,
        type,
        nomor: data.nomor,
        jenisKertas: data.jenisKertas,
        ukuran: data.ukuran,
        quantity: type === "in" ? data.jumlahMasuk : data.jumlahKeluar,
        tanggal: data.tanggal,
        timestamp: new Date().toISOString(),
      };

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
      throw new Error(`Gagal mencatat transaksi ${category}: ${error.message}`);
    }
  }

  async getCurrentStock(category) {
    try {
      console.log(`=== Getting current stock for category: ${category} ===`);

      // First, let's verify database connection
      await db.openDB();
      console.log("Database connection verified");

      // Get current stock directly from stock store
      console.log("Querying stock records from database...");
      const stockRecords = await db.getRecordsByIndex(
        this.storeNames.stock,
        "category",
        category
      );
      console.log(
        `Found ${stockRecords.length} stock records for ${category}:`
      );
      console.log("Raw stock records:", JSON.stringify(stockRecords, null, 2));

      // Map the records to the correct format
      const formattedStock = stockRecords.map((record) => {
        console.log("Processing record:", record);
        const formatted = {
          nomor: record.nomor,
          jenisKertas: record.jenisKertas,
          ukuran: record.ukuran,
          qtyLastMonth: record.qtyLastMonth,
          jumlahMasuk: record.jumlahMasuk,
          total:
            Number(record.qtyLastMonth || 0) + Number(record.jumlahMasuk || 0),
          tanggal: record.tanggal,
          remark: record.remark, // Include remark field for produksi category
        };
        console.log("Formatted record:", formatted);
        return formatted;
      });

      // Sort by nomor for consistent display
      formattedStock.sort(
        (a, b) => (Number(a.nomor) || 0) - (Number(b.nomor) || 0)
      );

      console.log(
        "Final formatted and sorted stock data:",
        JSON.stringify(formattedStock, null, 2)
      );
      return formattedStock;
    } catch (error) {
      console.error(`Error getting ${category} stock:`, error);
      throw new Error(
        `Gagal mengambil data stock ${category}: ${error.message}`
      );
    }
  }
}
