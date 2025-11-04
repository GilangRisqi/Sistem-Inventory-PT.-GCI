import { dbService } from "../services/SupabaseService.js";
import { TABLES } from "../config/supabase.js";
import * as db from "../db.js"; // Keep for backward compatibility

export class BahanBakuModel {
  constructor() {
    this.storeNames = {
      stock: db.DB_STORES.bahanBakuStock,
      transactions: db.DB_STORES.bahanBakuTransactions,
    };
    this.useSupabase = true; // Toggle to enable/disable Supabase
  }

  async getCurrentBannerStock() {
    try {
      if (this.useSupabase) {
        const supabaseData = await this.getBannerInStockFromSupabase();

        if (supabaseData.length > 0) {
          // Transform dari snake_case ke camelCase untuk UI
          const transformedData = supabaseData.map((item) => ({
            id: item.id,
            nomor: item.nomor,
            jenisKertas: item.jenis_kertas,
            ukuran: item.ukuran,
            satuan: item.satuan,
            qtyLastMonth: item.qty_last_month,
            jumlahMasuk: item.jumlah_kertas_masuk, // Sesuai field di database
            total: item.total, // calculated field dari database
            tanggal: item.tanggal,
            timestamp: item.created_at, // for compatibility
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          }));
          return transformedData;
        }
      }

      // Fallback ke IndexedDB jika Supabase kosong atau error
      const data = await this.getCurrentStock("banner");
      return data;
    } catch (error) {
      console.error("Error in getCurrentBannerStock:", error);
      // Fallback ke IndexedDB jika ada error
      return await this.getCurrentStock("banner");
    }
  }

  async getCurrentBannerOutStock() {
    try {
      if (this.useSupabase) {
        const supabaseData = await this.getBannerOutStockFromSupabase();

        if (supabaseData.length > 0) {
          const transformedData = supabaseData.map((item) => ({
            id: item.id,
            nomor: item.nomor,
            jenisKertas: item.jenis_kertas,
            ukuran: item.ukuran,
            satuan: item.satuan,
            totalMasuk: item.total_kertas_masuk,
            totalKeluarOk: item.total_keluar_ok,
            totalKeluarNg: item.total_keluar_ng,
            totalKeluar: item.total_keluar, // calculated field
            sisaStock: item.sisa_stock, // calculated field
            tanggal: item.tanggal,
            timestamp: item.created_at,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          }));
          return transformedData;
        }
      }

      // Fallback ke IndexedDB
      await db.forceRefreshDB();

      const transactions = await db.getRecords(this.storeNames.transactions);

      // Filter untuk banner out transactions - fix: type is saved as "out-banner"
      const bannerOutTransactions = transactions.filter(
        (transaction) =>
          transaction.category === "banner" &&
          (transaction.type === "out" || transaction.type === "out-banner")
      );

      // CRITICAL: Double-check by direct database query
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
            (r) =>
              r.category === "banner" &&
              (r.type === "out" || r.type === "out-banner")
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
      let resultTransactions;
      if (bannerOutTransactions.length !== directResult.length) {
        resultTransactions = directResult; // Use direct query result
      } else {
        resultTransactions = bannerOutTransactions;
      }

      // Transform transaction format to flat data format for display
      const transformedData = resultTransactions.map((transaction) => {
        // Check if transaction has data property (nested structure) or if fields are at root level
        const sourceData = transaction.data || transaction;

        const transformed = {
          id: transaction.id,
          timestamp: transaction.timestamp,
          nomor: sourceData.nomor,
          jenisKertas: sourceData.jenisKertas,
          ukuran: sourceData.ukuran,
          totalMasuk: sourceData.totalMasuk,
          totalKeluarOk: sourceData.totalKeluarOk,
          totalKeluarNg: sourceData.totalKeluarNg,
          tanggal: sourceData.tanggal,
        };

        return transformed;
      });

      return transformedData;
    } catch (error) {
      console.error("Error getting banner out stock:", error);
      return [];
    }
  }

  async getCurrentDigitalStock() {
    try {
      if (this.useSupabase) {
        const supabaseData = await this.getDigitalInStockFromSupabase();

        if (supabaseData.length > 0) {
          const transformedData = supabaseData.map((item) => ({
            id: item.id,
            nomor: item.nomor,
            jenisKertas: item.jenis_kertas,
            ukuran: item.ukuran,
            satuan: item.satuan,
            qtyLastMonth: item.qty_last_month,
            jumlahMasuk: item.jumlah_kertas_masuk,
            total: item.total, // calculated field
            tanggal: item.tanggal,
            timestamp: item.created_at,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          }));
          return transformedData;
        }
      }

      // Fallback ke IndexedDB
      // Debug: Check all records in stock store
      const allStockRecords = await db.getRecords(this.storeNames.stock);

      // Check specifically for digital records
      const digitalRecords = allStockRecords.filter(
        (record) => record.category === "digital"
      );

      const data = await this.getCurrentStock("digital");
      return data;
    } catch (error) {
      console.error("Error in getCurrentDigitalStock:", error);
      return await this.getCurrentStock("digital");
    }
  }

  async getCurrentDigitalOutStock() {
    try {
      if (this.useSupabase) {
        const supabaseData = await this.getDigitalOutStockFromSupabase();

        if (supabaseData.length > 0) {
          const transformedData = supabaseData.map((item) => ({
            id: item.id,
            nomor: item.nomor,
            jenisKertas: item.jenis_kertas,
            ukuran: item.ukuran,
            satuan: item.satuan,
            totalMasuk: item.total_kertas_masuk,
            totalKeluarOk: item.total_keluar_ok,
            totalKeluarNg: item.total_keluar_ng,
            totalKeluar: item.total_keluar, // calculated field
            sisaStock: item.sisa_stock, // calculated field
            tanggal: item.tanggal,
            timestamp: item.created_at,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          }));
          return transformedData;
        }
      }

      // Fallback ke IndexedDB
      await db.forceRefreshDB();

      const transactions = await db.getRecords(this.storeNames.transactions);

      // Filter untuk digital out transactions - fix: type is saved as "out-digital"
      const digitalOutTransactions = transactions.filter(
        (transaction) =>
          transaction.category === "digital" &&
          (transaction.type === "out" || transaction.type === "out-digital")
      );

      // Transform transaction format to flat data format for display
      const transformedData = digitalOutTransactions.map((transaction) => {
        // Check if transaction has data property (nested structure) or if fields are at root level
        const sourceData = transaction.data || transaction;

        const transformed = {
          id: transaction.id,
          timestamp: transaction.timestamp,
          nomor: sourceData.nomor,
          jenisKertas: sourceData.jenisKertas,
          ukuran: sourceData.ukuran,
          totalMasuk: sourceData.totalMasuk,
          totalKeluarOk: sourceData.totalKeluarOk,
          totalKeluarNg: sourceData.totalKeluarNg,
          tanggal: sourceData.tanggal,
        };

        return transformed;
      });

      return transformedData;
    } catch (error) {
      console.error("Error getting digital out stock:", error);
      return [];
    }
  }

  async getCurrentProduksiStock() {
    try {
      if (this.useSupabase) {
        console.log("🔄 Loading Produksi In from Supabase...");
        const supabaseData = await this.getProduksiInStockFromSupabase();

        if (supabaseData.length > 0) {
          const transformedData = supabaseData.map((item) => ({
            id: item.id,
            nomor: item.nomor,
            jenisKertas: item.jenis_kertas,
            ukuran: item.ukuran,
            satuan: item.satuan,
            qtyLastMonth: item.qty_last_month,
            jumlahMasuk: item.jumlah_kertas_masuk,
            total: item.total, // calculated field
            tanggal: item.tanggal,
            remark: item.remark, // Produksi In punya field remark
            timestamp: item.created_at,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          }));
          console.log("✅ Transformed Produksi In data:", transformedData);
          return transformedData;
        }
      }

      // Fallback ke IndexedDB
      console.log("📦 Fallback to IndexedDB for Produksi In...");
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
      if (this.useSupabase) {
        console.log("🔄 Loading Produksi Out from Supabase...");
        const supabaseData = await this.getProduksiOutStockFromSupabase();

        if (supabaseData.length > 0) {
          const transformedData = supabaseData.map((item) => ({
            id: item.id,
            nomor: item.nomor,
            jenisKertas: item.jenis_kertas,
            ukuran: item.ukuran,
            satuan: item.satuan,
            totalMasuk: item.total_kertas_masuk,
            totalKeluarOk: item.total_keluar_ok,
            totalKeluarNg: item.total_keluar_ng,
            totalKeluar: item.total_keluar, // calculated field
            sisaStock: item.sisa_stock, // calculated field
            tanggal: item.tanggal,
            timestamp: item.created_at,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          }));
          console.log("✅ Transformed Produksi Out data:", transformedData);
          return transformedData;
        }
      }

      // Fallback ke IndexedDB
      console.log("📦 Fallback to IndexedDB for Produksi Out...");
      await db.openDB();
      const records = await db.getRecords(this.storeNames.transactions);
      console.log("🔍 All transaction records:", records);

      // Filter untuk kategori produksi dan type out (handle both old dan new format)
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

  // Alias untuk kompatibilitas dengan RekapPresenter
  async getByDateRange(startDate, endDate) {
    return await this.getTransactionsByDateRange(
      "bahan-baku",
      startDate,
      endDate
    );
  }

  // Force refresh data dari Supabase tanpa cache untuk bahan baku
  async forceRefreshByDateRange(startDate, endDate) {
    try {
      console.log("🔄 Force refreshing bahan baku data from Supabase...");
      const rawData = await dbService.read(TABLES.BAHAN_BAKU);
      console.log(`📊 Raw data retrieved: ${rawData.length} records`);

      const filteredData = rawData.filter((record) => {
        const recordDate = new Date(record.tanggal);
        const isInRange =
          recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
        if (isInRange) {
          console.log(
            `✅ Record in range: ${record.tanggal} - Item: ${record.nama_item}`
          );
        }
        return isInRange;
      });

      console.log(`🎯 Filtered data: ${filteredData.length} records`);
      return filteredData;
    } catch (error) {
      console.error("❌ Error force refreshing bahan baku data:", error);
      // Fallback ke method standard
      return await this.getByDateRange(startDate, endDate);
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

      // Create a unique key for this category, type, and month
      const key = `${category}-${type}-${currentYear}-${currentMonth}`;

      // Get only transaction records for in/out numbering
      const transactionRecords = await db.getRecords(
        this.storeNames.transactions
      );

      // Filter records for current category, type, and month
      const relevantRecords = [];

      // IMPORTANT: We only use transaction records for in/out forms numbering
      // Stock records are completely ignored for this purpose

      // Process transaction records - this is where in/out records are stored
      transactionRecords.forEach((record, index) => {
        // Check for both new format (type: "in-category") and old format (type: "in")
        const isMatchingType =
          record.type === `${type}-${category}` || record.type === type;
        const recordTanggal = record.data?.tanggal || record.tanggal;
        const recordNomor = record.data?.nomor || record.nomor;

        if (record.category === category && isMatchingType && recordTanggal) {
          const recordDate = new Date(recordTanggal);
          const recordMonth = recordDate.getMonth() + 1;
          const recordYear = recordDate.getFullYear();

          if (recordMonth === currentMonth && recordYear === currentYear) {
            relevantRecords.push({
              nomor: recordNomor,
              source: "transaction",
              date: recordTanggal,
              type: record.type,
            });
          }
        }
      });

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

      // Find the first gap or next available number
      let nextNumber = 1;

      if (existingNumbers.length === 0) {
        // No existing numbers, start from 1
        nextNumber = 1;
      } else {
        // Look for gaps in sequence
        for (
          let i = 1;
          i <= existingNumbers[existingNumbers.length - 1] + 1;
          i++
        ) {
          if (!existingNumbers.includes(i)) {
            nextNumber = i;
            break;
          }
        }
      }

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
      // First, let's verify database connection
      await db.openDB();

      // Get current stock directly from stock store
      const stockRecords = await db.getRecordsByIndex(
        this.storeNames.stock,
        "category",
        category
      );

      // Map the records to the correct format - include ID for delete functionality
      const formattedStock = stockRecords.map((record) => {
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
        return formatted;
      });

      // Sort by nomor for consistent display
      formattedStock.sort(
        (a, b) => (Number(a.nomor) || 0) - (Number(b.nomor) || 0)
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
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction(
          [this.storeNames.stock],
          "readwrite"
        );
        const store = transaction.objectStore(this.storeNames.stock);

        // Convert id to number like in DailyReportModel
        const numericId = Number(id);

        const request = store.delete(numericId);

        request.onerror = () => {
          reject(request.error);
        };
        request.onsuccess = () => {
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
      const database = await db.openDB();
      return new Promise((resolve, reject) => {
        const transaction = database.transaction(
          [this.storeNames.transactions],
          "readwrite"
        );
        const store = transaction.objectStore(this.storeNames.transactions);

        // Convert id to number like in DailyReportModel
        const numericId = Number(id);

        const request = store.delete(numericId);

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
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

  // ===== SUPABASE METHODS =====

  // Methods untuk Banner In Stock (Supabase)
  async getBannerInStockFromSupabase() {
    try {
      const data = await dbService.read(TABLES.BANNER_IN_STOCK);
      return data || [];
    } catch (error) {
      console.error("Error getting banner in stock from Supabase:", error);
      return [];
    }
  }

  async saveBannerInStockToSupabase(data) {
    try {
      // Transform data ke format Supabase sesuai struktur tabel yang ada
      const supabaseData = {
        nomor: data.nomor,
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        qty_last_month: data.qtyLastMonth || 0,
        jumlah_kertas_masuk: data.jumlahMasuk || 0, // Sesuai field di database
        satuan: data.satuan,
        tanggal: data.tanggal,
      };

      return await dbService.create(TABLES.BANNER_IN_STOCK, supabaseData);
    } catch (error) {
      console.error("Error saving banner in stock to Supabase:", error);
      throw error;
    }
  }

  async updateBannerInStockInSupabase(id, data) {
    try {
      const supabaseData = {
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        qty_last_month: parseInt(data.qtyLastMonth) || 0,
        jumlah_kertas_masuk: parseInt(data.jumlahMasuk) || 0, // Sesuai field di database
        satuan: data.satuan,
        tanggal: data.tanggal,
      };

      console.log("🔄 Updating Supabase banner_in_stock:", {
        id,
        supabaseData,
      });
      return await dbService.update(TABLES.BANNER_IN_STOCK, id, supabaseData);
    } catch (error) {
      console.error("Error updating banner in stock in Supabase:", error);
      throw error;
    }
  }

  async deleteBannerInStockFromSupabase(id) {
    try {
      console.log("🗑️ Deleting from Supabase banner_in_stock:", id);
      return await dbService.delete(TABLES.BANNER_IN_STOCK, id);
    } catch (error) {
      console.error("Error deleting banner in stock from Supabase:", error);
      throw error;
    }
  }

  // ===== BANNER OUT STOCK METHODS =====
  async getBannerOutStockFromSupabase() {
    try {
      const data = await dbService.read(TABLES.BANNER_OUT_STOCK);
      console.log("📊 Banner Out data from Supabase:", data);
      return data || [];
    } catch (error) {
      console.error("Error getting banner out stock from Supabase:", error);
      return [];
    }
  }

  async saveBannerOutStockToSupabase(data) {
    try {
      const supabaseData = {
        nomor: data.nomor,
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        total_kertas_masuk: data.totalMasuk || 0,
        satuan: data.satuan,
        total_keluar_ok: data.totalKeluarOk || 0,
        total_keluar_ng: data.totalKeluarNg || 0,
        tanggal: data.tanggal,
      };

      console.log("💾 Saving to Supabase banner_out_stock:", supabaseData);
      return await dbService.create(TABLES.BANNER_OUT_STOCK, supabaseData);
    } catch (error) {
      console.error("Error saving banner out stock to Supabase:", error);
      throw error;
    }
  }

  async updateBannerOutStockInSupabase(id, data) {
    try {
      const supabaseData = {
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        total_kertas_masuk: parseInt(data.totalMasuk) || 0,
        satuan: data.satuan,
        total_keluar_ok: parseInt(data.totalKeluarOk) || 0,
        total_keluar_ng: parseInt(data.totalKeluarNg) || 0,
        tanggal: data.tanggal,
      };

      console.log("🔄 Updating Supabase banner_out_stock:", {
        id,
        supabaseData,
      });
      return await dbService.update(TABLES.BANNER_OUT_STOCK, id, supabaseData);
    } catch (error) {
      console.error("Error updating banner out stock in Supabase:", error);
      throw error;
    }
  }

  async deleteBannerOutStockFromSupabase(id) {
    try {
      console.log("🗑️ Deleting from Supabase banner_out_stock:", id);
      return await dbService.delete(TABLES.BANNER_OUT_STOCK, id);
    } catch (error) {
      console.error("Error deleting banner out stock from Supabase:", error);
      throw error;
    }
  }

  // ===== DIGITAL IN STOCK METHODS =====
  async getDigitalInStockFromSupabase() {
    try {
      const data = await dbService.read(TABLES.DIGITAL_IN_STOCK);
      console.log("📊 Digital In data from Supabase:", data);
      return data || [];
    } catch (error) {
      console.error("Error getting digital in stock from Supabase:", error);
      return [];
    }
  }

  async saveDigitalInStockToSupabase(data) {
    try {
      const supabaseData = {
        nomor: data.nomor,
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        qty_last_month: data.qtyLastMonth || 0,
        jumlah_kertas_masuk: data.jumlahMasuk || 0,
        satuan: data.satuan,
        tanggal: data.tanggal,
      };

      console.log("💾 Saving to Supabase digital_in_stock:", supabaseData);
      return await dbService.create(TABLES.DIGITAL_IN_STOCK, supabaseData);
    } catch (error) {
      console.error("Error saving digital in stock to Supabase:", error);
      throw error;
    }
  }

  async updateDigitalInStockInSupabase(id, data) {
    try {
      const supabaseData = {
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        qty_last_month: parseInt(data.qtyLastMonth) || 0,
        jumlah_kertas_masuk: parseInt(data.jumlahMasuk) || 0,
        satuan: data.satuan,
        tanggal: data.tanggal,
      };

      console.log("🔄 Updating Supabase digital_in_stock:", {
        id,
        supabaseData,
      });
      return await dbService.update(TABLES.DIGITAL_IN_STOCK, id, supabaseData);
    } catch (error) {
      console.error("Error updating digital in stock in Supabase:", error);
      throw error;
    }
  }

  async deleteDigitalInStockFromSupabase(id) {
    try {
      console.log("🗑️ Deleting from Supabase digital_in_stock:", id);
      return await dbService.delete(TABLES.DIGITAL_IN_STOCK, id);
    } catch (error) {
      console.error("Error deleting digital in stock from Supabase:", error);
      throw error;
    }
  }

  // ===== DIGITAL OUT STOCK METHODS =====
  async getDigitalOutStockFromSupabase() {
    try {
      const data = await dbService.read(TABLES.DIGITAL_OUT_STOCK);
      console.log("📊 Digital Out data from Supabase:", data);
      return data || [];
    } catch (error) {
      console.error("Error getting digital out stock from Supabase:", error);
      return [];
    }
  }

  async saveDigitalOutStockToSupabase(data) {
    try {
      const supabaseData = {
        nomor: data.nomor,
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        total_kertas_masuk: data.totalMasuk || 0,
        satuan: data.satuan,
        total_keluar_ok: data.totalKeluarOk || 0,
        total_keluar_ng: data.totalKeluarNg || 0,
        tanggal: data.tanggal,
      };

      console.log("💾 Saving to Supabase digital_out_stock:", supabaseData);
      return await dbService.create(TABLES.DIGITAL_OUT_STOCK, supabaseData);
    } catch (error) {
      console.error("Error saving digital out stock to Supabase:", error);
      throw error;
    }
  }

  async updateDigitalOutStockInSupabase(id, data) {
    try {
      const supabaseData = {
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        total_kertas_masuk: parseInt(data.totalMasuk) || 0,
        satuan: data.satuan,
        total_keluar_ok: parseInt(data.totalKeluarOk) || 0,
        total_keluar_ng: parseInt(data.totalKeluarNg) || 0,
        tanggal: data.tanggal,
      };

      console.log("🔄 Updating Supabase digital_out_stock:", {
        id,
        supabaseData,
      });
      return await dbService.update(TABLES.DIGITAL_OUT_STOCK, id, supabaseData);
    } catch (error) {
      console.error("Error updating digital out stock in Supabase:", error);
      throw error;
    }
  }

  async deleteDigitalOutStockFromSupabase(id) {
    try {
      console.log("🗑️ Deleting from Supabase digital_out_stock:", id);
      return await dbService.delete(TABLES.DIGITAL_OUT_STOCK, id);
    } catch (error) {
      console.error("Error deleting digital out stock from Supabase:", error);
      throw error;
    }
  }

  // ===== PRODUKSI IN STOCK METHODS =====
  async getProduksiInStockFromSupabase() {
    try {
      const data = await dbService.read(TABLES.PRODUKSI_IN_STOCK);
      return data || [];
    } catch (error) {
      return [];
    }
  }

  async saveProduksiInStockToSupabase(data) {
    try {
      const supabaseData = {
        nomor: data.nomor,
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        qty_last_month: data.qtyLastMonth || 0,
        jumlah_kertas_masuk: data.jumlahMasuk || 0,
        satuan: data.satuan,
        tanggal: data.tanggal,
        remark: data.remark || null,
      };

      console.log("💾 Saving to Supabase produksi_in_stock:", supabaseData);
      return await dbService.create(TABLES.PRODUKSI_IN_STOCK, supabaseData);
    } catch (error) {
      console.error("Error saving produksi in stock to Supabase:", error);
      throw error;
    }
  }

  async updateProduksiInStockInSupabase(id, data) {
    try {
      const supabaseData = {
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        qty_last_month: parseInt(data.qtyLastMonth) || 0,
        jumlah_kertas_masuk: parseInt(data.jumlahMasuk) || 0,
        satuan: data.satuan,
        tanggal: data.tanggal,
        remark: data.remark || null,
      };

      console.log("🔄 Updating Supabase produksi_in_stock:", {
        id,
        supabaseData,
      });
      return await dbService.update(TABLES.PRODUKSI_IN_STOCK, id, supabaseData);
    } catch (error) {
      console.error("Error updating produksi in stock in Supabase:", error);
      throw error;
    }
  }

  async deleteProduksiInStockFromSupabase(id) {
    try {
      console.log("🗑️ Deleting from Supabase produksi_in_stock:", id);
      return await dbService.delete(TABLES.PRODUKSI_IN_STOCK, id);
    } catch (error) {
      console.error("Error deleting produksi in stock from Supabase:", error);
      throw error;
    }
  }

  // ===== PRODUKSI OUT STOCK METHODS =====
  async getProduksiOutStockFromSupabase() {
    try {
      const data = await dbService.read(TABLES.PRODUKSI_OUT_STOCK);
      console.log("📊 Produksi Out data from Supabase:", data);
      return data || [];
    } catch (error) {
      console.error("Error getting produksi out stock from Supabase:", error);
      return [];
    }
  }

  async saveProduksiOutStockToSupabase(data) {
    try {
      const supabaseData = {
        nomor: data.nomor,
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        total_kertas_masuk: data.totalMasuk || 0,
        satuan: data.satuan,
        total_keluar_ok: data.totalKeluarOk || 0,
        total_keluar_ng: data.totalKeluarNg || 0,
        tanggal: data.tanggal,
      };

      console.log("💾 Saving to Supabase produksi_out_stock:", supabaseData);
      return await dbService.create(TABLES.PRODUKSI_OUT_STOCK, supabaseData);
    } catch (error) {
      console.error("Error saving produksi out stock to Supabase:", error);
      throw error;
    }
  }

  async updateProduksiOutStockInSupabase(id, data) {
    try {
      const supabaseData = {
        jenis_kertas: data.jenisKertas,
        ukuran: data.ukuran,
        total_kertas_masuk: parseInt(data.totalMasuk) || 0,
        satuan: data.satuan,
        total_keluar_ok: parseInt(data.totalKeluarOk) || 0,
        total_keluar_ng: parseInt(data.totalKeluarNg) || 0,
        tanggal: data.tanggal,
      };

      return await dbService.update(
        TABLES.PRODUKSI_OUT_STOCK,
        id,
        supabaseData
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteProduksiOutStockFromSupabase(id) {
    try {
      console.log("🗑️ Deleting from Supabase produksi_out_stock:", id);
      return await dbService.delete(TABLES.PRODUKSI_OUT_STOCK, id);
    } catch (error) {
      console.error("Error deleting produksi out stock from Supabase:", error);
      throw error;
    }
  }

  // Banner In Number - sama seperti DailyReportModel.getNextNomor()
  async getNextBannerInNumber(date) {
    try {
      const targetDate = new Date(date);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth(); // 0-based month untuk konsistensi dengan DailyReportModel

      if (this.useSupabase) {
        const supabaseRecords = await this.getBannerInStockFromSupabase();

        // Filter records for current month and year (sama seperti DailyReportModel)
        const monthRecords = supabaseRecords.filter((record) => {
          const recordDate = new Date(record.tanggal);
          const recordYear = recordDate.getFullYear();
          const recordMonth = recordDate.getMonth();
          return recordYear === year && recordMonth === month;
        });

        if (monthRecords.length === 0) {
          return 1;
        }

        // Find max nomor and increment by 1 (sama seperti DailyReportModel)
        const nomors = monthRecords.map((record) => Number(record.nomor) || 0);

        const maxNomor = Math.max(...nomors);
        const nextNomor = maxNomor + 1;

        return nextNomor;
      }

      // Fallback to IndexedDB logic
      return 1; // Default untuk fallback
    } catch (error) {
      console.error("❌ Error getting next Banner In number:", error);
      return 1;
    }
  }

  // Banner Out Number
  async getNextBannerOutNumber(date) {
    try {
      const targetDate = new Date(date);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();

      if (this.useSupabase) {
        const supabaseRecords = await this.getBannerOutStockFromSupabase();

        const monthRecords = supabaseRecords.filter((record) => {
          const recordDate = new Date(record.tanggal);
          const recordYear = recordDate.getFullYear();
          const recordMonth = recordDate.getMonth();
          return recordYear === year && recordMonth === month;
        });

        if (monthRecords.length === 0) {
          return 1;
        }

        const nomors = monthRecords.map((record) => Number(record.nomor) || 0);

        const maxNomor = Math.max(...nomors);
        const nextNomor = maxNomor + 1;

        return nextNomor;
      }

      return 1;
    } catch (error) {
      console.error("❌ Error getting next Banner Out number:", error);
      return 1;
    }
  }

  // Digital In Number
  async getNextDigitalInNumber(date) {
    try {
      const targetDate = new Date(date);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();

      if (this.useSupabase) {
        const supabaseRecords = await this.getDigitalInStockFromSupabase();

        const monthRecords = supabaseRecords.filter((record) => {
          const recordDate = new Date(record.tanggal);
          const recordYear = recordDate.getFullYear();
          const recordMonth = recordDate.getMonth();
          return recordYear === year && recordMonth === month;
        });

        if (monthRecords.length === 0) {
          return 1;
        }

        const nomors = monthRecords.map((record) => Number(record.nomor) || 0);

        const maxNomor = Math.max(...nomors);
        const nextNomor = maxNomor + 1;

        return nextNomor;
      }

      return 1;
    } catch (error) {
      console.error("❌ Error getting next Digital In number:", error);
      return 1;
    }
  }

  // Digital Out Number
  async getNextDigitalOutNumber(date) {
    try {
      const targetDate = new Date(date);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();

      if (this.useSupabase) {
        const supabaseRecords = await this.getDigitalOutStockFromSupabase();

        const monthRecords = supabaseRecords.filter((record) => {
          const recordDate = new Date(record.tanggal);
          const recordYear = recordDate.getFullYear();
          const recordMonth = recordDate.getMonth();
          return recordYear === year && recordMonth === month;
        });

        if (monthRecords.length === 0) {
          return 1;
        }

        const nomors = monthRecords.map((record) => Number(record.nomor) || 0);

        const maxNomor = Math.max(...nomors);
        const nextNomor = maxNomor + 1;

        return nextNomor;
      }

      return 1;
    } catch (error) {
      console.error("❌ Error getting next Digital Out number:", error);
      return 1;
    }
  }

  // Produksi In Number
  async getNextProduksiInNumber(date) {
    try {
      const targetDate = new Date(date);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();

      if (this.useSupabase) {
        const supabaseRecords = await this.getProduksiInStockFromSupabase();

        const monthRecords = supabaseRecords.filter((record) => {
          const recordDate = new Date(record.tanggal);
          const recordYear = recordDate.getFullYear();
          const recordMonth = recordDate.getMonth();
          return recordYear === year && recordMonth === month;
        });

        if (monthRecords.length === 0) {
          return 1;
        }

        const nomors = monthRecords.map((record) => Number(record.nomor) || 0);

        const maxNomor = Math.max(...nomors);
        const nextNomor = maxNomor + 1;

        return nextNomor;
      }

      return 1;
    } catch (error) {
      console.error("❌ Error getting next Produksi In number:", error);
      return 1;
    }
  }

  // Produksi Out Number
  async getNextProduksiOutNumber(date) {
    try {
      const targetDate = new Date(date);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();

      if (this.useSupabase) {
        const supabaseRecords = await this.getProduksiOutStockFromSupabase();

        const monthRecords = supabaseRecords.filter((record) => {
          const recordDate = new Date(record.tanggal);
          const recordYear = recordDate.getFullYear();
          const recordMonth = recordDate.getMonth();
          return recordYear === year && recordMonth === month;
        });

        if (monthRecords.length === 0) {
          return 1;
        }

        const nomors = monthRecords.map((record) => Number(record.nomor) || 0);

        const maxNomor = Math.max(...nomors);
        const nextNomor = maxNomor + 1;

        return nextNomor;
      }

      return 1;
    } catch (error) {
      console.error("❌ Error getting next Produksi Out number:", error);
      return 1;
    }
  }

  // Get all stock items from Supabase
  async getSupabaseStock() {
    try {
      return await dbService.read(TABLES.BAHAN_BAKU);
    } catch (error) {
      console.error("Error getting Supabase stock:", error);
      return [];
    }
  }

  // Add new stock item to Supabase
  async addSupabaseStock(stockData) {
    try {
      const newStock = {
        nama: stockData.nama,
        stok: stockData.stok || 0,
        satuan: stockData.satuan || "pcs",
        harga_satuan: stockData.harga_satuan || 0,
        supplier: stockData.supplier || "",
        kategori: stockData.kategori || "",
        minimum_stok: stockData.minimum_stok || 0,
        lokasi_penyimpanan: stockData.lokasi_penyimpanan || "",
        keterangan: stockData.keterangan || "",
      };

      return await dbService.create(TABLES.BAHAN_BAKU, newStock);
    } catch (error) {
      console.error("Error adding Supabase stock:", error);
      throw error;
    }
  }

  // Update stock item in Supabase
  async updateSupabaseStock(id, updateData) {
    try {
      return await dbService.update(TABLES.BAHAN_BAKU, id, updateData);
    } catch (error) {
      console.error("Error updating Supabase stock:", error);
      throw error;
    }
  }

  // Delete stock item from Supabase
  async deleteSupabaseStock(id) {
    try {
      return await dbService.delete(TABLES.BAHAN_BAKU, id);
    } catch (error) {
      console.error("Error deleting Supabase stock:", error);
      throw error;
    }
  }

  // Get stock by category from Supabase
  async getSupabaseStockByCategory(kategori) {
    try {
      return await dbService.read(TABLES.BAHAN_BAKU, { kategori });
    } catch (error) {
      console.error("Error getting Supabase stock by category:", error);
      return [];
    }
  }

  // Update stock quantity in Supabase
  async updateSupabaseStockQuantity(id, newQuantity) {
    try {
      return await dbService.update(TABLES.BAHAN_BAKU, id, {
        stok: newQuantity,
      });
    } catch (error) {
      console.error("Error updating Supabase stock quantity:", error);
      throw error;
    }
  }

  // Migration helper: Convert IndexedDB data to Supabase format
  async migrateToSupabase() {
    try {
      console.log("🔄 Starting migration from IndexedDB to Supabase...");

      // Get all stock data from IndexedDB
      const indexedDBStock = await db.getRecords(this.storeNames.stock);
      console.log(`📊 Found ${indexedDBStock.length} stock items in IndexedDB`);

      // Convert and upload to Supabase
      const migrationResults = [];
      for (const item of indexedDBStock) {
        try {
          const supabaseData = {
            nama: item.nama || item.name,
            stok: item.stok || item.stock || 0,
            satuan: item.satuan || item.unit || "pcs",
            kategori: item.kategori || item.category || "",
            keterangan: `Migrated from IndexedDB - Original ID: ${item.id}`,
          };

          const result = await this.addSupabaseStock(supabaseData);
          migrationResults.push({
            success: true,
            item: item.nama,
            supabaseId: result.id,
          });
          console.log(`✅ Migrated: ${item.nama}`);
        } catch (error) {
          migrationResults.push({
            success: false,
            item: item.nama,
            error: error.message,
          });
          console.error(`❌ Failed to migrate: ${item.nama}`, error);
        }
      }

      console.log("🎉 Migration completed!");
      console.log(
        `✅ Successful: ${migrationResults.filter((r) => r.success).length}`
      );
      console.log(
        `❌ Failed: ${migrationResults.filter((r) => !r.success).length}`
      );

      return migrationResults;
    } catch (error) {
      console.error("Error during migration:", error);
      throw error;
    }
  }

  // Hybrid method: Use Supabase if enabled, fallback to IndexedDB
  async getStock() {
    if (this.useSupabase) {
      return await this.getSupabaseStock();
    } else {
      return await db.getRecords(this.storeNames.stock);
    }
  }

  async addStock(stockData) {
    if (this.useSupabase) {
      return await this.addSupabaseStock(stockData);
    } else {
      return await db.addRecord(this.storeNames.stock, stockData);
    }
  }

  async updateStock(id, updateData) {
    if (this.useSupabase) {
      return await this.updateSupabaseStock(id, updateData);
    } else {
      return await db.updateRecord(this.storeNames.stock, id, updateData);
    }
  }

  async deleteStock(id) {
    if (this.useSupabase) {
      return await this.deleteSupabaseStock(id);
    } else {
      return await db.deleteRecord(this.storeNames.stock, id);
    }
  }
}
