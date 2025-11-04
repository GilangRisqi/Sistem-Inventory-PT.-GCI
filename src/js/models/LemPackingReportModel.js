import { dbService } from "../services/SupabaseService.js";
import { TABLES } from "../config/supabase.js";
import * as db from "../db.js"; // Keep for backward compatibility

export class LemPackingReportModel {
  constructor() {
    this.storeName = "lem-packing-reports";
    this.storageKey = "lem-packing-reports";
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
        throw new Error("Gagal menyimpan lem packing report: " + error.message);
      }
    }
  }

  // Hybrid getAll method
  async getAll() {
    if (this.useSupabase) {
      console.log("📡 LemPackingReport: Using Supabase for getAll");
      return await this.getAllFromSupabase();
    } else {
      console.log("💾 LemPackingReport: Using IndexedDB for getAll");
      try {
        const database = await db.openDB();
        return new Promise((resolve, reject) => {
          const transaction = database.transaction(
            [this.storeName],
            "readonly"
          );
          const store = transaction.objectStore(this.storeName);
          const request = store.getAll();

          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        });
      } catch (error) {
        throw new Error("Gagal mengambil lem packing report: " + error.message);
      }
    }
  }

  // Hybrid getByDateRange method
  async getByDateRange(startDate, endDate) {
    if (this.useSupabase) {
      const supabaseData = await this.getSupabaseByDateRange(
        startDate,
        endDate
      );
      // Transform snake_case data from Supabase to camelCase for the app
      return supabaseData
        ? supabaseData.map((item) => this.transformSupabaseData(item))
        : [];
    } else {
      try {
        return await db.getRecordsByDateRange(
          this.storeName,
          startDate,
          endDate
        );
      } catch (error) {
        throw new Error("Gagal mengambil lem packing report: " + error.message);
      }
    }
  }

  // Force refresh data dari Supabase tanpa cache
  async forceRefreshByDateRange(startDate, endDate) {
    try {
      console.log("🔄 Force refreshing lem packing reports from Supabase...");
      const rawData = await dbService.read(TABLES.LEM_PACKING_REPORTS);
      console.log(`📊 Raw data retrieved: ${rawData.length} records`);

      const filteredData = rawData.filter((report) => {
        const reportDate = new Date(report.tanggal);
        const isInRange =
          reportDate >= new Date(startDate) && reportDate <= new Date(endDate);
        if (isInRange) {
          console.log(
            `✅ Record in range: ${report.tanggal} - Client: ${report.client}`
          );
        }
        return isInRange;
      });

      console.log(`🎯 Filtered data: ${filteredData.length} records`);
      return filteredData.map((record) => this.transformSupabaseData(record));
    } catch (error) {
      console.error("❌ Error force refreshing lem packing reports:", error);
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
        console.error(
          "Error getting lem packing report by ID from Supabase:",
          error
        );
        throw error;
      }
    } else {
      try {
        return await db.getRecordById(this.storeName, id);
      } catch (error) {
        throw new Error("Gagal mengambil lem packing report: " + error.message);
      }
    }
  }

  // Clear all data (for testing/reset purposes)
  clearAll() {
    localStorage.removeItem(this.storageKey);
    return { success: true };
  }

  // Export data
  async export() {
    const data = await this.getAll();
    return JSON.stringify(data, null, 2);
  }

  // Transform app data (camelCase) to Supabase format (snake_case)
  transformToSupabaseFormat(appData) {
    const supabaseData = {};

    // Direct mappings
    if (appData.id !== undefined) supabaseData.id = appData.id;
    if (appData.nomor !== undefined) supabaseData.nomor = appData.nomor;
    if (appData.tanggal !== undefined) supabaseData.tanggal = appData.tanggal;
    if (appData.operator !== undefined)
      supabaseData.operator = appData.operator;
    if (appData.keterangan !== undefined)
      supabaseData.keterangan = appData.keterangan;

    // camelCase to snake_case transformations
    if (appData.jenisPekerjaan !== undefined)
      supabaseData.jenis_pekerjaan = appData.jenisPekerjaan;
    if (appData.timeStart !== undefined)
      supabaseData.time_start = appData.timeStart;
    if (appData.timeFinish !== undefined)
      supabaseData.time_finish = appData.timeFinish;
    if (appData.qtyOk !== undefined) supabaseData.qty_ok = appData.qtyOk;
    if (appData.qtyNg !== undefined) supabaseData.qty_ng = appData.qtyNg;
    if (appData.noSpk !== undefined) supabaseData.no_spk = appData.noSpk;

    return supabaseData;
  }

  // Transform Supabase data (snake_case) to app format (camelCase)
  transformSupabaseData(supabaseRecord) {
    return {
      id: supabaseRecord.id,
      nomor: supabaseRecord.nomor,
      tanggal: supabaseRecord.tanggal,
      operator: supabaseRecord.operator,
      jenisPekerjaan: supabaseRecord.jenis_pekerjaan,
      timeStart: supabaseRecord.time_start,
      timeFinish: supabaseRecord.time_finish,
      qtyOk: supabaseRecord.qty_ok,
      qtyNg: supabaseRecord.qty_ng,
      noSpk: supabaseRecord.no_spk,
      keterangan: supabaseRecord.keterangan,
      // Calculate total for RekapView
      totalQty: (supabaseRecord.qty_ok || 0) + (supabaseRecord.qty_ng || 0),
      createdAt: supabaseRecord.created_at,
      updatedAt: supabaseRecord.updated_at,
    };
  }

  // Hybrid update method
  async update(id, updateData) {
    if (this.useSupabase) {
      // Transform camelCase data to snake_case for Supabase
      const supabaseData = this.transformToSupabaseFormat(updateData);
      return await this.updateSupabaseReport(id, supabaseData);
    } else {
      return this.updateLocalStorage(id, updateData);
    }
  }

  // Hybrid delete method
  async delete(id) {
    if (this.useSupabase) {
      return await this.deleteSupabaseReport(id);
    } else {
      return this.deleteFromStorage(id);
    }
  }

  // Duplicate method removed - using the one that follows DailyReportModel pattern

  // Save lem packing report to Supabase
  async saveToSupabase(data) {
    try {
      // Transform data to snake_case format for Supabase
      const transformedData = this.transformToSupabaseFormat(data);
      return await dbService.create(
        TABLES.LEM_PACKING_REPORTS,
        transformedData
      );
    } catch (error) {
      console.error("Error saving lem packing report to Supabase:", error);
      throw error;
    }
  }

  // Get all lem packing reports from Supabase
  async getAllFromSupabase() {
    try {
      const rawData = await dbService.read(TABLES.LEM_PACKING_REPORTS);
      return rawData.map((record) => this.transformSupabaseData(record));
    } catch (error) {
      console.error("Error getting lem packing reports from Supabase:", error);
      return [];
    }
  }

  // Get lem packing reports by date range from Supabase
  async getSupabaseByDateRange(startDate, endDate) {
    try {
      const rawData = await dbService.read(TABLES.LEM_PACKING_REPORTS);
      const filteredData = rawData.filter((report) => {
        const reportDate = new Date(report.tanggal);
        return (
          reportDate >= new Date(startDate) && reportDate <= new Date(endDate)
        );
      });
      return filteredData;
    } catch (error) {
      console.error("Error getting lem packing reports by date range:", error);
      return [];
    }
  }

  // Update lem packing report in Supabase
  async updateSupabaseReport(id, updateData) {
    try {
      return await dbService.update(TABLES.LEM_PACKING_REPORTS, id, updateData);
    } catch (error) {
      console.error("Error updating lem packing report:", error);
      throw error;
    }
  }

  // Delete lem packing report from Supabase
  async deleteSupabaseReport(id) {
    try {
      return await dbService.delete(TABLES.LEM_PACKING_REPORTS, id);
    } catch (error) {
      console.error("Error deleting lem packing report:", error);
      throw error;
    }
  }

  // Get next available nomor for current month (like banner pattern)
  async getNextNomor() {
    try {
      console.log("🔍 LemPacking: Getting next nomor from database...");
      const allReports = await this.getAll();
      console.log(
        "📊 LemPacking: Total reports in database:",
        allReports.length
      );

      // Get current month and year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // 0-based month
      console.log(
        `📅 LemPacking: Current month/year: ${currentMonth + 1}/${currentYear}`
      );

      // Filter reports for the current month and year
      const reportsForMonth = allReports.filter((report) => {
        const reportDate = new Date(report.tanggal);
        const reportYear = reportDate.getFullYear();
        const reportMonth = reportDate.getMonth();
        return reportYear === currentYear && reportMonth === currentMonth;
      });

      console.log(
        "📈 LemPacking: Reports for current month:",
        reportsForMonth.length
      );

      if (reportsForMonth.length === 0) {
        console.log("✨ LemPacking: First report for this month, returning 1");
        return 1; // First report for this month
      }

      // Find the maximum nomor for this month and increment by 1
      const nomors = reportsForMonth.map((report) => Number(report.nomor) || 0);
      console.log("🔢 LemPacking: Existing nomors:", nomors);

      const maxNomor = Math.max(...nomors);
      const nextNomor = maxNomor + 1;

      console.log(
        `🎯 LemPacking: Max nomor: ${maxNomor}, Next nomor: ${nextNomor}`
      );
      return nextNomor;
    } catch (error) {
      console.error("❌ LemPacking: Error getting next nomor:", error);
      return 1; // Default to 1 if error occurs
    }
  }

  // Import data
  import(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format");
      }
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ========== LOCALSTORAGE FALLBACK METHODS ==========

  // Update existing lem packing report (localStorage fallback)
  updateLocalStorage(id, reportData) {
    try {
      const reports = this.getAllFromStorage();
      const index = reports.findIndex((r) => r.id == id);

      if (index === -1) {
        throw new Error("Laporan tidak ditemukan");
      }

      // Update only provided fields
      const updatedEntry = { ...reports[index] };
      Object.keys(reportData).forEach((key) => {
        if (reportData[key] !== undefined && key !== "id") {
          updatedEntry[key] = reportData[key];
        }
      });

      // Recalculate total if qty values change
      if (reportData.qtyOk !== undefined || reportData.qtyNg !== undefined) {
        updatedEntry.totalQty =
          (Number(updatedEntry.qtyOk) || 0) + (Number(updatedEntry.qtyNg) || 0);
      }

      updatedEntry.updatedAt = new Date().toISOString();
      reports[index] = updatedEntry;
      this.saveToStorage(reports);
      return { success: true, data: updatedEntry };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Delete lem packing report (localStorage fallback)
  deleteFromStorage(id) {
    try {
      const reports = this.getAllFromStorage();
      const index = reports.findIndex((r) => r.id == id);

      if (index === -1) {
        throw new Error("Laporan tidak ditemukan");
      }

      reports.splice(index, 1);
      this.saveToStorage(reports);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get reports by date range (localStorage fallback)
  getByDateRangeFromStorage(startDate, endDate) {
    const reports = this.getAllFromStorage();
    return reports
      .filter((report) => {
        const reportDate = new Date(report.tanggal);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return reportDate >= start && reportDate <= end;
      })
      .sort(
        (a, b) => new Date(a.tanggal) - new Date(b.tanggal) || a.nomor - b.nomor
      );
  }

  // Save to localStorage
  saveToStorage(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data || []));
  }
}
