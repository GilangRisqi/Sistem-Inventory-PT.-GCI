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

  async getCurrentBannerOutStock() {
    try {
      console.log("=== getCurrentBannerOutStock called ===");

      // Force refresh DB connection to ensure fresh data after delete
      await db.forceRefreshDB();

      const transactions = await db.getRecords(this.storeNames.transactions);

      console.log("📊 Total transactions in DB:", transactions.length);

      // Filter untuk banner out transactions
      const bannerOutTransactions = transactions.filter(
        (transaction) =>
          transaction.category === "banner" && transaction.type === "out"
      );

      console.log(
        "🎯 Banner Out transactions found:",
        bannerOutTransactions.length
      );
      console.log(
        "📋 Banner Out IDs:",
        bannerOutTransactions.map((t) => t.id || t.timestamp)
      );
      console.log("📋 Banner Out detailed records:", bannerOutTransactions);

      // CRITICAL: Double-check by direct database query
      console.log("🔍 DOUBLE-CHECK: Querying database directly...");
      const dbInstance = await db.openDB();
      const directCheck = new Promise((resolve) => {
        const transaction = dbInstance.transaction(
          [this.storeNames.transactions],
          "readonly"
        );
        const store = transaction.objectStore(this.storeNames.transactions);
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = (event) => {
          const allRecords = event.target.result;
          const directBannerOut = allRecords.filter(
            (r) => r.category === "banner" && r.type === "out"
          );

          console.log("🔍 DIRECT QUERY RESULTS:");
          console.log("  📊 Direct total records:", allRecords.length);
          console.log(
            "  🎯 Direct Banner Out records:",
            directBannerOut.length
          );
          console.log(
            "  📋 Direct Banner Out IDs:",
            directBannerOut.map((r) => r.id)
          );

          resolve(directBannerOut);
        };
      });

      const directResult = await directCheck;

      // Compare results
      if (bannerOutTransactions.length !== directResult.length) {
        console.log(
          "⚠️ CRITICAL: Mismatch between getRecords and direct query!"
        );
        console.log("  getRecords result:", bannerOutTransactions.length);
        console.log("  Direct query result:", directResult.length);
        return directResult; // Use direct query result
      }

      return bannerOutTransactions;
    } catch (error) {
      console.error("Error getting banner out stock:", error);
      return [];
    }
  }

  async getCurrentDigitalStock() {
    const data = await this.getCurrentStock("digital");
    return data;
  }

  async getCurrentProduksiStock() {
    const data = await this.getCurrentStock("produksi");
    return data;
  }

  // Debug method to get all records
  async getAllRecords() {
    try {
      await db.openDB();
      const stockRecords = await db.getRecords(this.storeNames.stock);
      const transactionRecords = await db.getRecords(
        this.storeNames.transactions
      );

      return {
        stock: stockRecords,
        transactions: transactionRecords,
        stockCount: stockRecords.length,
        transactionCount: transactionRecords.length,
      };
    } catch (error) {
      console.error("Error getting all records:", error);
      return {
        stock: [],
        transactions: [],
        stockCount: 0,
        transactionCount: 0,
      };
    }
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
      console.log("🔍 Verifying saved data...");
      const savedStocks = await db.getRecords(this.storeNames.stock);
      const savedStock = savedStocks.find((stock) => stock.id === stockId);
      console.log("✅ Verified saved stock data:", savedStock);

      // Also check all banner stocks
      const bannerStocks = savedStocks.filter(
        (stock) => stock.category === "banner"
      );
      console.log(`📊 Total banner stocks in DB: ${bannerStocks.length}`);
      console.log("📋 All banner stocks:", bannerStocks);

      return stockId;
    } catch (error) {
      console.error("Error adding stock:", error);
      throw error;
    }
  }

  async reduceStock(category, data) {
    try {
      console.log("=== reduceStock called ===");
      console.log("Category:", category);
      console.log("Data received:", JSON.stringify(data, null, 2));

      const transactionData = {
        category,
        type: "out",
        ...data,
        timestamp: new Date().toISOString(),
      };

      console.log(
        "Transaction data to save:",
        JSON.stringify(transactionData, null, 2)
      );

      const id = await db.addRecord(
        this.storeNames.transactions,
        transactionData
      );

      console.log("Transaction saved with ID:", id);
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

  // Method to reset numbering for a specific category-type combination
  async resetNumbering(category, type, startFromNumber = 1) {
    try {
      console.log(
        `🔄 Resetting numbering for ${category}-${type} to start from ${startFromNumber}`
      );

      const transactions = await db.getRecords(this.storeNames.transactions);
      const targetRecords = transactions.filter(
        (t) => t.category === category && t.type === type
      );

      console.log(`Found ${targetRecords.length} records to renumber`);

      // Sort by date to maintain chronological order
      targetRecords.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

      // Renumber records
      for (let i = 0; i < targetRecords.length; i++) {
        const newNumber = startFromNumber + i;
        const record = targetRecords[i];

        console.log(
          `Renumbering record ${record.id}: ${record.nomor} -> ${newNumber}`
        );

        // Update the record
        await db.updateRecord(this.storeNames.transactions, record.id, {
          ...record,
          nomor: newNumber,
        });
      }

      console.log(`✅ Renumbering completed for ${category}-${type}`);
      return targetRecords.length;
    } catch (error) {
      console.error("Error resetting numbering:", error);
      throw error;
    }
  }

  async getNextNumber(category, type, date = null) {
    try {
      const targetDate = date ? new Date(date) : new Date();
      const currentMonth = targetDate.getMonth() + 1; // 1-12
      const currentYear = targetDate.getFullYear();

      console.log(`=== Getting next number for ${category}-${type} ===`);
      console.log(`Current month: ${currentMonth}, year: ${currentYear}`);

      // Create a unique key for this category, type, and month
      const key = `${category}-${type}-${currentYear}-${currentMonth}`;
      console.log("🔢 Generating number for key:", key);

      // Get only transaction records for in/out numbering
      const transactionRecords = await db.getRecords(
        this.storeNames.transactions
      );

      console.log(`📝 Total transaction records: ${transactionRecords.length}`);

      // Filter records for current category, type, and month
      const relevantRecords = [];

      // IMPORTANT: We only use transaction records for in/out forms numbering
      // Stock records are completely ignored for this purpose

      // Process transaction records - this is where in/out records are stored
      console.log(
        `🔍 Filtering from ${transactionRecords.length} transaction records...`
      );

      transactionRecords.forEach((record, index) => {
        // Debug: show what we're checking
        if (record.category === category) {
          console.log(
            `Record ${index}: category=${record.category}, type=${record.type}, nomor=${record.nomor}, tanggal=${record.tanggal}`
          );
        }

        if (
          record.category === category &&
          record.type === type &&
          record.tanggal
        ) {
          const recordDate = new Date(record.tanggal);
          const recordMonth = recordDate.getMonth() + 1;
          const recordYear = recordDate.getFullYear();

          console.log(
            `📅 Record date: ${recordMonth}/${recordYear}, target: ${currentMonth}/${currentYear}`
          );

          if (recordMonth === currentMonth && recordYear === currentYear) {
            relevantRecords.push({
              nomor: record.nomor,
              source: "transaction",
              date: record.tanggal,
              type: record.type,
            });
            console.log(
              `✅ Added record: nomor=${record.nomor}, type=${record.type}`
            );
          }
        }
      });

      console.log(`🎯 Relevant records for ${key}:`, relevantRecords);

      // Find the highest number used this month
      let maxNumber = 0;
      relevantRecords.forEach((record) => {
        const num = Number(record.nomor);
        if (!isNaN(num) && num > maxNumber) {
          maxNumber = num;
        }
      });

      const nextNumber = maxNumber + 1;
      console.log(
        `📊 Max number found for ${key}: ${maxNumber}, next number: ${nextNumber}`
      );
      console.log(
        `✅ Penomoran ${category}-${type} bulan ${currentMonth}/${currentYear}: ${nextNumber}`
      );

      return nextNumber;
    } catch (error) {
      console.error("Error getting next number:", error);
      return 1; // Default to 1 if there's an error
    }
  }

  // Debug method to check all transaction data
  async debugTransactionData() {
    try {
      const transactions = await db.getRecords(this.storeNames.transactions);
      console.log("🔍 All transaction records:", transactions);

      const bannerTransactions = transactions.filter(
        (t) => t.category === "banner"
      );
      console.log("🎯 Banner transactions:", bannerTransactions);

      const bannerIn = bannerTransactions.filter((t) => t.type === "in");
      const bannerOut = bannerTransactions.filter((t) => t.type === "out");

      console.log("📥 Banner IN records:", bannerIn);
      console.log("📤 Banner OUT records:", bannerOut);

      // Check for any records without proper type field
      const invalidRecords = bannerTransactions.filter(
        (t) => !t.type || (t.type !== "in" && t.type !== "out")
      );
      if (invalidRecords.length > 0) {
        console.log(
          "⚠️ Invalid records found (no type or wrong type):",
          invalidRecords
        );
      }

      return {
        all: transactions,
        bannerIn,
        bannerOut,
        invalid: invalidRecords,
      };
    } catch (error) {
      console.error("Error debugging transaction data:", error);
      return null;
    }
  }

  // Method to clean up problematic transaction data
  async cleanupTransactionData() {
    try {
      console.log("🧹 Starting transaction data cleanup...");

      const transactions = await db.getRecords(this.storeNames.transactions);
      const bannerTransactions = transactions.filter(
        (t) => t.category === "banner"
      );

      // Find records that might be causing numbering issues
      let needsCleanup = false;
      const recordsToRemove = [];

      bannerTransactions.forEach((record) => {
        // Check for records without proper type field
        if (!record.type || (record.type !== "in" && record.type !== "out")) {
          console.log("❌ Found invalid record:", record);
          recordsToRemove.push(record.id);
          needsCleanup = true;
        }

        // Check for duplicate numbers in same type/month
        // This would need more complex logic to detect
      });

      if (needsCleanup && recordsToRemove.length > 0) {
        console.log(`🗑️ Removing ${recordsToRemove.length} invalid records...`);
        for (const id of recordsToRemove) {
          await db.deleteRecord(this.storeNames.transactions, id);
        }
        console.log("✅ Cleanup completed");
        return { cleaned: recordsToRemove.length };
      } else {
        console.log("✅ No cleanup needed - data looks good");
        return { cleaned: 0 };
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
      throw error;
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

      // Map the records to the correct format - include ID for delete functionality
      const formattedStock = stockRecords.map((record) => {
        console.log("Processing record:", record);
        const formatted = {
          id: record.id, // Include ID for delete functionality
          nomor: record.nomor,
          jenisKertas: record.jenisKertas,
          ukuran: record.ukuran,
          qtyLastMonth: record.qtyLastMonth,
          jumlahMasuk: record.jumlahMasuk,
          total:
            Number(record.qtyLastMonth || 0) + Number(record.jumlahMasuk || 0),
          tanggal: record.tanggal,
          timestamp: record.timestamp, // Include timestamp as fallback
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

  // Method untuk update transaction record - simplified like DailyReportModel
  async updateTransactionRecord(id, updatedData) {
    try {
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction(
          [this.storeNames.transactions],
          "readwrite"
        );
        const store = transaction.objectStore(this.storeNames.transactions);

        // First get the existing record
        const getRequest = store.get(Number(id));

        getRequest.onerror = () => reject(getRequest.error);
        getRequest.onsuccess = () => {
          const existingData = getRequest.result;

          if (!existingData) {
            reject(new Error("Record tidak ditemukan"));
            return;
          }

          // Merge existing data with updated data
          const mergedData = {
            ...existingData,
            ...updatedData,
            id: Number(id),
            updatedAt: new Date().toISOString(),
          };

          // Put the merged data back
          const putRequest = store.put(mergedData);

          putRequest.onerror = () => reject(putRequest.error);
          putRequest.onsuccess = () => resolve(putRequest.result);
        };
      });
    } catch (error) {
      throw new Error("Gagal mengupdate transaction record: " + error.message);
    }
  }

  // Method untuk update stock record - for Banner In data
  async updateStockRecord(id, updatedData) {
    try {
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction(
          [this.storeNames.stock],
          "readwrite"
        );
        const store = transaction.objectStore(this.storeNames.stock);

        // First get the existing record
        const getRequest = store.get(Number(id));

        getRequest.onerror = () => reject(getRequest.error);
        getRequest.onsuccess = () => {
          const existingData = getRequest.result;

          if (!existingData) {
            reject(new Error("Stock record tidak ditemukan"));
            return;
          }

          // Merge existing data with updated data
          const mergedData = {
            ...existingData,
            ...updatedData,
            id: Number(id),
            updatedAt: new Date().toISOString(),
          };

          // Put the merged data back
          const putRequest = store.put(mergedData);

          putRequest.onerror = () => reject(putRequest.error);
          putRequest.onsuccess = () => resolve(putRequest.result);
        };
      });
    } catch (error) {
      throw new Error("Gagal mengupdate stock record: " + error.message);
    }
  }

  // Method untuk delete stock record - for Banner In data
  async deleteStockRecord(id) {
    try {
      console.log("🗑️ Deleting stock record:", id, "type:", typeof id);

      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction(
          [this.storeNames.stock],
          "readwrite"
        );
        const store = transaction.objectStore(this.storeNames.stock);

        // Convert id to number like in DailyReportModel
        const numericId = Number(id);
        console.log("🔢 Using numeric ID for delete from stock:", numericId);

        const request = store.delete(numericId);

        request.onerror = () => {
          console.error("❌ Delete failed:", request.error);
          reject(request.error);
        };
        request.onsuccess = () => {
          console.log("✅ Delete successful from stock store");
          resolve(request.result);
        };
      });
    } catch (error) {
      console.error("❌ Error in deleteStockRecord:", error);
      throw new Error("Gagal menghapus stock record: " + error.message);
    }
  }

  // Method untuk delete transaction record - simplified like DailyReportModel
  async deleteTransactionRecord(id) {
    try {
      console.log("🗑️ Deleting transaction record:", id, "type:", typeof id);

      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction(
          [this.storeNames.transactions],
          "readwrite"
        );
        const store = transaction.objectStore(this.storeNames.transactions);

        // Convert id to number like in DailyReportModel
        const numericId = Number(id);
        console.log("🔢 Using numeric ID for delete:", numericId);

        const request = store.delete(numericId);

        request.onerror = () => {
          console.error("❌ Delete operation failed:", request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          console.log(
            "✅ Record deleted successfully with numeric ID:",
            numericId
          );
          resolve(request.result);
        };
      });
    } catch (error) {
      console.error("❌ Error deleting transaction record:", error);
      throw new Error(`Gagal menghapus record: ${error.message}`);
    }
  }
}
