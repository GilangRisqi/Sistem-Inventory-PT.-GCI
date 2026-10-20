import { dbService } from "../services/SupabaseService.js";
import { TABLES } from "../config/supabase.js";
import * as db from "../db.js"; // Keep for backward compatibility

export class DailyReportModel {
  constructor() {
    this.storeName = db.DB_STORES.dailyReport;
    this.useSupabase = true; // Toggle to enable/disable Supabase
  }

  // Hybrid save method
  async save(data) {
    if (this.useSupabase) {
      return await this.saveToSupabase(data);
    } else {
      try {
        if (!data.createdAt) {
          data.createdAt = new Date().toISOString();
        }
        data.updatedAt = new Date().toISOString();
        return await db.addRecord(this.storeName, data);
      } catch (error) {
        throw new Error("Gagal menyimpan daily report: " + error.message);
      }
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

  // Hybrid getByDateRange method
  async getByDateRange(startDate, endDate) {
    if (this.useSupabase) {
      return await this.getSupabaseByDateRange(startDate, endDate);
    } else {
      try {
        return await db.getRecordsByDateRange(
          this.storeName,
          startDate,
          endDate
        );
      } catch (error) {
        throw new Error("Gagal mengambil daily report: " + error.message);
      }
    }
  }

  // Force refresh data dari Supabase tanpa cache
  async forceRefreshByDateRange(startDate, endDate) {
    try {
      console.log("🔄 Force refreshing daily reports from Supabase...");
      console.log(
        `📅 Filter range: ${startDate.toISOString().split("T")[0]} to ${
          endDate.toISOString().split("T")[0]
        }`
      );

      const rawData = await dbService.read(TABLES.DAILY_REPORTS);
      console.log(`📊 Raw data retrieved: ${rawData.length} records`);

      // Log semua record dengan status filter
      console.group("📋 All records with filter status:");
      rawData.forEach((report, index) => {
        const reportDate = new Date(report.tanggal);
        const startCompare = new Date(startDate);
        const endCompare = new Date(endDate);
        const isInRange =
          reportDate >= startCompare && reportDate <= endCompare;

        console.log(
          `${index + 1}. ${report.tanggal} - ${report.client} - ${
            isInRange ? "✅ INCLUDED" : "❌ EXCLUDED"
          }`
        );
        if (!isInRange) {
          console.log(
            `   📅 Date comparison: ${
              reportDate.toISOString().split("T")[0]
            } vs range ${startCompare.toISOString().split("T")[0]} to ${
              endCompare.toISOString().split("T")[0]
            }`
          );
        }
      });
      console.groupEnd();

      const filteredData = rawData.filter((report) => {
        const reportDate = new Date(report.tanggal);
        return (
          reportDate >= new Date(startDate) && reportDate <= new Date(endDate)
        );
      });

      console.log(`🎯 Filtered data: ${filteredData.length} records`);
      return filteredData.map((record) => this.transformSupabaseData(record));
    } catch (error) {
      console.error("❌ Error force refreshing daily reports:", error);
      throw error;
    }
  }

  // Hybrid getById method
  async getById(id) {
    if (this.useSupabase) {
      // For Supabase, we need to get by ID from the service
      try {
        const allReports = await this.getAllFromSupabase();
        return allReports.find((report) => report.id === id);
      } catch (error) {
        console.error("Error getting daily report by ID from Supabase:", error);
        throw error;
      }
    } else {
      try {
        const database = await db.openDB();
        return new Promise((resolve, reject) => {
          const transaction = database.transaction(
            [this.storeName],
            "readonly"
          );
          const store = transaction.objectStore(this.storeName);
          const request = store.get(Number(id));

          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        });
      } catch (error) {
        throw new Error("Gagal mengambil daily report: " + error.message);
      }
    }
  }

  // Hybrid update method
  async update(id, data) {
    if (this.useSupabase) {
      // Transform camelCase data to snake_case for Supabase
      const supabaseData = this.transformToSupabaseFormat(data);
      return await this.updateSupabaseReport(id, supabaseData);
    } else {
      try {
        data.updatedAt = new Date().toISOString();
        data.id = Number(id);

        const database = await db.openDB();
        return new Promise((resolve, reject) => {
          const transaction = database.transaction(
            [this.storeName],
            "readwrite"
          );
          const store = transaction.objectStore(this.storeName);
          const request = store.put(data);

          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        });
      } catch (error) {
        throw new Error("Gagal mengupdate daily report: " + error.message);
      }
    }
  }

  // Hybrid delete method
  async delete(id) {
    if (this.useSupabase) {
      return await this.deleteSupabaseReport(id);
    } else {
      try {
        const database = await db.openDB();
        return new Promise((resolve, reject) => {
          const transaction = database.transaction(
            [this.storeName],
            "readwrite"
          );
          const store = transaction.objectStore(this.storeName);
          const request = store.delete(Number(id));

          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        });
      } catch (error) {
        throw new Error("Gagal menghapus daily report: " + error.message);
      }
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

  // ===== SUPABASE METHODS =====

  // Save daily report to Supabase
  async saveToSupabase(data) {
    try {
      const reportData = {
        nomor: data.nomor || 0,
        tanggal: data.tanggal,
        qty_po: data.qtyPo || 0,
        satuan: data.satuan || "PCS",
        jenis_bahan: data.jenisBahan || "",
        jenis_print: data.jenisPrint || "",
        jenis_pekerjaan: data.jenisPekerjaan || "",
        client: data.client || "",
        spesifikasi: data.spesifikasi || "",
        qty_cetak_ok: data.qtyCetakOk || 0,
        qty_cetak_ng: data.qtyCetakNg || 0,
        satuan_cetak: data.satuanCetak || "LEMBAR PLANO",
        waktu_start: data.waktuStart || null,
        waktu_finish: data.waktuFinish || null,
        no_spk: data.noSpk || "",
        keterangan: data.keterangan || "",
        status: data.status || "SELESAI",
      };

      return await dbService.create(TABLES.DAILY_REPORTS, reportData);
    } catch (error) {
      console.error("Error saving daily report to Supabase:", error);
      throw error;
    }
  }

  // Transform app data (camelCase) to Supabase format (snake_case)
  transformToSupabaseFormat(appData) {
    const supabaseData = {};

    // Direct mappings
    if (appData.id !== undefined) supabaseData.id = appData.id;
    if (appData.nomor !== undefined) supabaseData.nomor = appData.nomor;
    if (appData.tanggal !== undefined) supabaseData.tanggal = appData.tanggal;
    if (appData.satuan !== undefined) supabaseData.satuan = appData.satuan;
    if (appData.client !== undefined) supabaseData.client = appData.client;
    if (appData.spesifikasi !== undefined)
      supabaseData.spesifikasi = appData.spesifikasi;
    if (appData.keterangan !== undefined)
      supabaseData.keterangan = appData.keterangan;
    if (appData.status !== undefined) supabaseData.status = appData.status;

    // camelCase to snake_case transformations
    if (appData.qtyPo !== undefined) supabaseData.qty_po = appData.qtyPo;
    if (appData.jenisBahan !== undefined)
      supabaseData.jenis_bahan = appData.jenisBahan;
    if (appData.jenisPrint !== undefined)
      supabaseData.jenis_print = appData.jenisPrint;
    if (appData.jenisPekerjaan !== undefined)
      supabaseData.jenis_pekerjaan = appData.jenisPekerjaan;
    if (appData.qtyCetakOk !== undefined)
      supabaseData.qty_cetak_ok = appData.qtyCetakOk;
    if (appData.qtyCetakNg !== undefined)
      supabaseData.qty_cetak_ng = appData.qtyCetakNg;
    if (appData.satuanCetak !== undefined)
      supabaseData.satuan_cetak = appData.satuanCetak;
    if (appData.waktuStart !== undefined)
      supabaseData.waktu_start = appData.waktuStart;
    if (appData.waktuFinish !== undefined)
      supabaseData.waktu_finish = appData.waktuFinish;
    if (appData.noSpk !== undefined) supabaseData.no_spk = appData.noSpk;

    return supabaseData;
  }

  // Transform Supabase data (snake_case) to app format (camelCase)
  transformSupabaseData(supabaseRecord) {
    return {
      id: supabaseRecord.id,
      nomor: supabaseRecord.nomor,
      tanggal: supabaseRecord.tanggal,
      qtyPo: supabaseRecord.qty_po,
      satuan: supabaseRecord.satuan,
      jenisBahan: supabaseRecord.jenis_bahan,
      jenisPrint: supabaseRecord.jenis_print,
      jenisPekerjaan: supabaseRecord.jenis_pekerjaan,
      client: supabaseRecord.client,
      spesifikasi: supabaseRecord.spesifikasi,
      qtyCetakOk: supabaseRecord.qty_cetak_ok,
      qtyCetakNg: supabaseRecord.qty_cetak_ng,
      satuanCetak: supabaseRecord.satuan_cetak,
      waktuStart: supabaseRecord.waktu_start,
      waktuFinish: supabaseRecord.waktu_finish,
      noSpk: supabaseRecord.no_spk,
      keterangan: supabaseRecord.keterangan,
      status: supabaseRecord.status,
      // Calculate total for RekapView
      totalQtyCetakAll:
        (supabaseRecord.qty_cetak_ok || 0) + (supabaseRecord.qty_cetak_ng || 0),
      createdAt: supabaseRecord.created_at,
      updatedAt: supabaseRecord.updated_at,
    };
  }

  // Get all daily reports from Supabase
  async getAllFromSupabase() {
    try {
      const rawData = await dbService.read(TABLES.DAILY_REPORTS);
      return rawData.map((record) => this.transformSupabaseData(record));
    } catch (error) {
      console.error("Error getting daily reports from Supabase:", error);
      return [];
    }
  }

  // Get daily reports by date range from Supabase
  async getSupabaseByDateRange(startDate, endDate) {
    try {
      const rawData = await dbService.read(TABLES.DAILY_REPORTS);
      const filteredData = rawData.filter((report) => {
        const reportDate = new Date(report.tanggal);
        return (
          reportDate >= new Date(startDate) && reportDate <= new Date(endDate)
        );
      });
      return filteredData.map((record) => this.transformSupabaseData(record));
    } catch (error) {
      console.error("Error getting daily reports by date range:", error);
      return [];
    }
  }

  // Update daily report in Supabase
  async updateSupabaseReport(id, updateData) {
    try {
      return await dbService.update(TABLES.DAILY_REPORTS, id, updateData);
    } catch (error) {
      console.error("Error updating daily report:", error);
      throw error;
    }
  }

  // Delete daily report from Supabase
  async deleteSupabaseReport(id) {
    try {
      return await dbService.delete(TABLES.DAILY_REPORTS, id);
    } catch (error) {
      console.error("Error deleting daily report:", error);
      throw error;
    }
  }

  // Migration helper
  async migrateToSupabase() {
    try {
      console.log("🔄 Starting Daily Report migration to Supabase...");

      const indexedDBReports = await this.getAll();
      console.log(
        `📊 Found ${indexedDBReports.length} daily reports in IndexedDB`
      );

      const migrationResults = [];
      for (const report of indexedDBReports) {
        try {
          const result = await this.saveToSupabase(report);
          migrationResults.push({
            success: true,
            report: report.operator,
            supabaseId: result.id,
          });
          console.log(
            `✅ Migrated daily report: ${report.operator} - ${report.tanggal}`
          );
        } catch (error) {
          migrationResults.push({
            success: false,
            report: report.operator,
            error: error.message,
          });
          console.error(
            `❌ Failed to migrate daily report: ${report.operator}`,
            error
          );
        }
      }

      console.log("🎉 Daily Report migration completed!");
      return migrationResults;
    } catch (error) {
      console.error("Error during Daily Report migration:", error);
      throw error;
    }
  }

  // Hybrid getAll method
  async getAll() {
    if (this.useSupabase) {
      return await this.getAllFromSupabase();
    } else {
      try {
        const database = await db.openDB();
        return new Promise((resolve, reject) => {
          const transaction = database.transaction(
            [this.storeName],
            "readonly"
          );
          const store = transaction.objectStore(this.storeName);
          const request = store.getAll();

          request.onsuccess = () => {
            const reports = request.result || [];
            // Sort by date descending (newest first)
            reports.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
            resolve(reports);
          };

          request.onerror = () => reject(request.error);
        });
      } catch (error) {
        console.error("Error getting all daily reports:", error);
        return [];
      }
    }
  }
}
