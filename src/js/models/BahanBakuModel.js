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
    console.log("=== getCurrentDigitalStock called ===");

    // Debug: Check all records in stock store
    const allStockRecords = await db.getRecords(this.storeNames.stock);
    console.log("🗃️ All stock records in database:", allStockRecords.length);
    console.log("📋 All stock records:", allStockRecords);

    // Check specifically for digital records
    const digitalRecords = allStockRecords.filter(
      (record) => record.category === "digital"
    );
    console.log("📊 Digital records found:", digitalRecords.length);
    console.log("🔍 Digital records details:", digitalRecords);

    const data = await this.getCurrentStock("digital");
    console.log("✅ getCurrentStock result:", data);
    return data;
  }

  async getCurrentDigitalOutStock() {
    try {
      console.log("=== getCurrentDigitalOutStock called ===");

      // Force refresh DB connection to ensure fresh data after delete
      await db.forceRefreshDB();

      const transactions = await db.getRecords(this.storeNames.transactions);

      console.log("📊 Total transactions in DB:", transactions.length);

      // Filter untuk digital out transactions
      const digitalOutTransactions = transactions.filter(
        (transaction) =>
          transaction.category === "digital" && transaction.type === "out"
      );

      console.log(
        "🎯 Digital Out transactions found:",
        digitalOutTransactions.length
      );
      console.log(
        "📋 Digital Out IDs:",
        digitalOutTransactions.map((t) => t.id)
      );
      console.log("📋 Digital Out detailed records:", digitalOutTransactions);

      // Format data untuk tampilan - sesuai dengan form digital out yang sebenarnya
      return digitalOutTransactions.map((transaction) => ({
        id: transaction.id,
        nomor: transaction.nomor,
        jenisKertas: transaction.jenisKertas,
        ukuran: transaction.ukuran,
        totalMasuk: transaction.totalMasuk,
        totalKeluarOk: transaction.totalKeluarOk,
        totalKeluarNg: transaction.totalKeluarNg,
        totalKeluar: transaction.totalKeluar,
        sisaStock: transaction.sisaStock,
        tanggal: transaction.tanggal,
        timestamp: transaction.timestamp,
      }));
    } catch (error) {
      console.error("Error getting digital out stock:", error);
      return [];
    }
  }

  async getCurrentProduksiStock() {
    try {
      await db.openDB();
      const records = await db.getRecords(this.storeNames.transactions);
      console.log("🔍 All transaction records for Produksi In:", records);

      // Filter untuk kategori produksi dan type in (handle both old and new format)
      const produksiInRecords = records.filter(
        (record) =>
          record &&
          record.category === "produksi" &&
          (record.type === "in-produksi" || record.type === "in")
      );

      console.log("📊 Filtered Produksi In records:", produksiInRecords);

      // Transform data untuk display
      const transformedData = produksiInRecords.map((record) => ({
        id: record.id,
        timestamp: record.timestamp,
        nomor: record.data?.nomor || record.nomor,
        jenisKertas: record.data?.jenisKertas || record.jenisKertas,
        ukuran: record.data?.ukuran || record.ukuran,
        qtyLastMonth: record.data?.qtyLastMonth || record.qtyLastMonth || 0,
        jumlahMasuk: record.data?.jumlahMasuk || record.jumlahMasuk || 0,
        total: record.data?.total || record.total || 0,
        tanggal: record.data?.tanggal || record.tanggal,
        remark: record.data?.remark || record.remark || "",
      }));

      console.log("🎯 Final Produksi In data:", transformedData);
      return transformedData;
    } catch (error) {
      console.error("Error getting current produksi in stock:", error);
      throw error;
    }
  }

  async getCurrentProduksiOutStock() {
    try {
      await db.openDB();
      const records = await db.getRecords(this.storeNames.transactions);
      console.log("🔍 All transaction records:", records);

      // Filter untuk kategori produksi dan type out (handle both old and new format)
      const produksiOutRecords = records.filter(
        (record) =>
          record &&
          record.category === "produksi" &&
          (record.type === "out-produksi" || record.type === "out")
      );

      console.log("📊 Filtered Produksi Out records:", produksiOutRecords);

      // Transform data untuk display
      const transformedData = produksiOutRecords.map((record) => ({
        id: record.id,
        timestamp: record.timestamp,
        nomor: record.data?.nomor || record.nomor,
        jenisKertas: record.data?.jenisKertas || record.jenisKertas,
        ukuran: record.data?.ukuran || record.ukuran,
        totalMasuk: record.data?.totalMasuk || record.totalMasuk || 0,
        totalKeluarOk: record.data?.totalKeluarOk || record.totalKeluarOk || 0,
        totalKeluarNg: record.data?.totalKeluarNg || record.totalKeluarNg || 0,
        totalKeluar: record.data?.totalKeluar || record.totalKeluar || 0,
        sisaStock: record.data?.sisaStock || record.sisaStock || 0,
        tanggal: record.data?.tanggal || record.tanggal,
      }));

      console.log("🎯 Final Produksi Out data:", transformedData);
      return transformedData;
    } catch (error) {
      console.error("Error getting current produksi out stock:", error);
      throw error;
    }
  }

  // Debug method to get all records with detailed filtering info
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
        type: `out-${category}`,
        data: data,
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
        type: `${type}-${category}`,
        data: data,
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
            `Record ${index}: category=${record.category}, type=${
              record.type
            }, nomor=${record.data?.nomor || record.nomor}, tanggal=${
              record.data?.tanggal || record.tanggal
            }`
          );
        }

        // Check for both new format (type: "in-category") and old format (type: "in")
        const isMatchingType =
          record.type === `${type}-${category}` || record.type === type;
        const recordTanggal = record.data?.tanggal || record.tanggal;
        const recordNomor = record.data?.nomor || record.nomor;

        if (record.category === category && isMatchingType && recordTanggal) {
          const recordDate = new Date(recordTanggal);
          const recordMonth = recordDate.getMonth() + 1;
          const recordYear = recordDate.getFullYear();

          console.log(
            `📅 Record date: ${recordMonth}/${recordYear}, target: ${currentMonth}/${currentYear}`
          );

          if (recordMonth === currentMonth && recordYear === currentYear) {
            relevantRecords.push({
              nomor: recordNomor,
              source: "transaction",
              date: recordTanggal,
              type: record.type,
            });
            console.log(
              `✅ Added record: nomor=${recordNomor}, type=${record.type}`
            );
          }
        }
      });

      console.log(`🎯 Relevant records for ${key}:`, relevantRecords);

      // NEW LOGIC: Gap filling - find the smallest available number
      const existingNumbers = [];
      relevantRecords.forEach((record) => {
        const num = Number(record.nomor);
        if (!isNaN(num) && num > 0) {
          existingNumbers.push(num);
        }
      });

      // Sort numbers to find gaps
      existingNumbers.sort((a, b) => a - b);

      console.log(
        `🔢 Existing numbers sorted: [${existingNumbers.join(", ")}]`
      );

      // Find the first gap or next available number
      let nextNumber = 1;

      if (existingNumbers.length === 0) {
        // No existing numbers, start from 1
        nextNumber = 1;
        console.log(`📊 No existing numbers, starting from 1`);
      } else {
        // Look for gaps in sequence
        for (
          let i = 1;
          i <= existingNumbers[existingNumbers.length - 1] + 1;
          i++
        ) {
          if (!existingNumbers.includes(i)) {
            nextNumber = i;
            console.log(`🔍 Found gap at number: ${nextNumber}`);
            break;
          }
        }
      }

      console.log(
        `✅ Next available number for ${category}-${type} bulan ${currentMonth}/${currentYear}: ${nextNumber}`
      );
      console.log(
        `📋 Gap analysis: existing [${existingNumbers.join(
          ", "
        )}] → next: ${nextNumber}`
      );

      return nextNumber;
    } catch (error) {
      console.error("Error getting next number:", error);
      return 1; // Default to 1 if there's an error
    }
  }

  // Debug method to check hidden records for specific category and type
  async debugHiddenRecords(category, type, date = null) {
    try {
      const targetDate = date ? new Date(date) : new Date();
      const currentMonth = targetDate.getMonth() + 1;
      const currentYear = targetDate.getFullYear();

      console.log(`🕵️ DEBUGGING HIDDEN RECORDS FOR ${category}-${type}`);
      console.log(`Target month/year: ${currentMonth}/${currentYear}`);

      const transactionRecords = await db.getRecords(
        this.storeNames.transactions
      );

      console.log(`📊 Total transactions in DB: ${transactionRecords.length}`);

      // Show ALL records for this category
      const categoryRecords = transactionRecords.filter(
        (r) => r.category === category
      );
      console.log(`📋 All ${category} records:`, categoryRecords.length);

      categoryRecords.forEach((record, index) => {
        const recordTanggal = record.data?.tanggal || record.tanggal;
        const recordNomor = record.data?.nomor || record.nomor;
        const recordDate = recordTanggal ? new Date(recordTanggal) : null;
        const recordMonth = recordDate ? recordDate.getMonth() + 1 : "N/A";
        const recordYear = recordDate ? recordDate.getFullYear() : "N/A";

        console.log(`${index + 1}. ID: ${record.id || record.timestamp}`);
        console.log(`   Type: ${record.type}`);
        console.log(`   Nomor: ${recordNomor}`);
        console.log(`   Tanggal: ${recordTanggal}`);
        console.log(`   Month/Year: ${recordMonth}/${recordYear}`);
        console.log(`   Data Structure:`, record.data ? "NESTED" : "FLAT");
        console.log(`   Raw Record:`, record);
        console.log("---");
      });

      // Check what would match for current numbering
      const expectedType1 = `${type}-${category}`;
      const expectedType2 = type;

      console.log(
        `🎯 Looking for types: "${expectedType1}" OR "${expectedType2}"`
      );

      const matchingRecords = categoryRecords.filter((record) => {
        const isMatchingType =
          record.type === expectedType1 || record.type === expectedType2;
        const recordTanggal = record.data?.tanggal || record.tanggal;

        if (isMatchingType && recordTanggal) {
          const recordDate = new Date(recordTanggal);
          const recordMonth = recordDate.getMonth() + 1;
          const recordYear = recordDate.getFullYear();
          return recordMonth === currentMonth && recordYear === currentYear;
        }
        return false;
      });

      console.log(
        `✅ Matching records for numbering: ${matchingRecords.length}`
      );
      matchingRecords.forEach((record, index) => {
        const recordNomor = record.data?.nomor || record.nomor;
        console.log(
          `${index + 1}. Nomor: ${recordNomor}, Type: ${record.type}`
        );
      });

      return {
        totalTransactions: transactionRecords.length,
        categoryRecords: categoryRecords.length,
        matchingRecords: matchingRecords.length,
        allCategoryRecords: categoryRecords,
        matchingNumberRecords: matchingRecords,
      };
    } catch (error) {
      console.error("Error in debugHiddenRecords:", error);
      return null;
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
          // Handle nested data structure for new format
          const mergedData = {
            ...existingData,
            id: Number(id),
            updatedAt: new Date().toISOString(),
          };

          // If existing data has nested 'data' property, update it
          if (existingData.data) {
            mergedData.data = {
              ...existingData.data,
              ...updatedData,
            };
          } else {
            // For backward compatibility with flat structure
            Object.assign(mergedData, updatedData);
          }

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

  // Method to clear all records for a specific category
  async clearCategoryRecords(category) {
    try {
      console.log(`🗑️ CLEARING ALL RECORDS FOR CATEGORY: ${category}`);

      const database = await db.openDB();

      // Clear from transactions store
      const transactionRecords = await db.getRecords(
        this.storeNames.transactions
      );
      const categoryTransactions = transactionRecords.filter(
        (r) => r.category === category
      );

      console.log(
        `Found ${categoryTransactions.length} transaction records for ${category}`
      );

      for (const record of categoryTransactions) {
        await this.deleteTransactionRecord(record.id || record.timestamp);
        console.log(`Deleted transaction: ${record.id || record.timestamp}`);
      }

      // Clear from stock store
      const stockRecords = await db.getRecords(this.storeNames.stock);
      const categoryStocks = stockRecords.filter(
        (r) => r.category === category
      );

      console.log(
        `Found ${categoryStocks.length} stock records for ${category}`
      );

      for (const record of categoryStocks) {
        await this.deleteStockRecord(record.id || record.timestamp);
        console.log(`Deleted stock: ${record.id || record.timestamp}`);
      }

      console.log(`✅ All ${category} records cleared`);
      return true;
    } catch (error) {
      console.error("Error clearing category records:", error);
      throw error;
    }
  }

  // Method untuk testing gap filling logic
  async testGapFilling(category, type, date = null) {
    try {
      console.log(`🧪 TESTING GAP FILLING for ${category}-${type}`);

      const targetDate = date ? new Date(date) : new Date();
      const currentMonth = targetDate.getMonth() + 1;
      const currentYear = targetDate.getFullYear();

      const transactionRecords = await db.getRecords(
        this.storeNames.transactions
      );

      // Get all numbers for this category/type/month
      const numbers = [];
      transactionRecords.forEach((record) => {
        const isMatchingType =
          record.type === `${type}-${category}` || record.type === type;
        const recordTanggal = record.data?.tanggal || record.tanggal;
        const recordNomor = record.data?.nomor || record.nomor;

        if (record.category === category && isMatchingType && recordTanggal) {
          const recordDate = new Date(recordTanggal);
          const recordMonth = recordDate.getMonth() + 1;
          const recordYear = recordDate.getFullYear();

          if (recordMonth === currentMonth && recordYear === currentYear) {
            const num = Number(recordNomor);
            if (!isNaN(num) && num > 0) {
              numbers.push(num);
            }
          }
        }
      });

      numbers.sort((a, b) => a - b);
      console.log(`📊 Current numbers: [${numbers.join(", ")}]`);

      // Test gap detection
      const gaps = [];
      if (numbers.length > 0) {
        for (let i = 1; i < numbers[numbers.length - 1]; i++) {
          if (!numbers.includes(i)) {
            gaps.push(i);
          }
        }
      }

      console.log(`🔍 Found gaps: [${gaps.join(", ")}]`);

      const nextNumber = await this.getNextNumber(category, type, date);
      console.log(`🎯 Next number will be: ${nextNumber}`);

      return {
        currentNumbers: numbers,
        gaps: gaps,
        nextNumber: nextNumber,
      };
    } catch (error) {
      console.error("Error testing gap filling:", error);
      return null;
    }
  }
}
