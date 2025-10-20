import { dbService } from "../services/SupabaseService.js";
import { TABLES } from "../config/supabase.js";
import * as db from "../db.js"; // Keep for backward compatibility

export class LipatReportModel {
  constructor() {
    this.storeName = "lipat-reports";
    this.storageKey = "lipat-reports";
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
        throw new Error("Gagal menyimpan lipat report: " + error.message);
      }
    }
  }

  // Hybrid getAll method
  async getAll() {
    console.log("🔍 LipatReport getAll: useSupabase =", this.useSupabase);
    if (this.useSupabase) {
      console.log("📡 LipatReport: Using Supabase for getAll");
      const result = await this.getAllFromSupabase();
      console.log("📡 LipatReport: Got from Supabase:", result.length, "items");
      return result;
    } else {
      console.log("💾 LipatReport: Using IndexedDB for getAll");
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
        throw new Error("Gagal mengambil lipat report: " + error.message);
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
        throw new Error("Gagal mengambil lipat report: " + error.message);
      }
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
        console.error("Error getting lipat report by ID from Supabase:", error);
        throw error;
      }
    } else {
      try {
        return await db.getRecordById(this.storeName, id);
      } catch (error) {
        throw new Error("Gagal mengambil lipat report: " + error.message);
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
        throw new Error("Gagal mengupdate lipat report: " + error.message);
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
        throw new Error("Gagal menghapus lipat report: " + error.message);
      }
    }
  }

  // Transform app data (camelCase) to Supabase format (snake_case)
  transformToSupabaseFormat(appData) {
    console.log("🔄 Transform input appData:", appData);
    const supabaseData = {};

    // Direct mappings
    if (appData.id !== undefined) supabaseData.id = appData.id;
    if (appData.nomor !== undefined) {
      supabaseData.nomor = appData.nomor;
      console.log("📝 Nomor mapping:", appData.nomor, "->", supabaseData.nomor);
    }
    if (appData.tanggal !== undefined) supabaseData.tanggal = appData.tanggal;
    if (appData.operator !== undefined)
      supabaseData.operator = appData.operator;
    if (appData.client !== undefined) supabaseData.client = appData.client;
    if (appData.produk !== undefined) supabaseData.produk = appData.produk;
    if (appData.satuan !== undefined) supabaseData.satuan = appData.satuan;
    if (appData.keterangan !== undefined)
      supabaseData.keterangan = appData.keterangan;

    // camelCase to snake_case transformations
    if (appData.jenisPekerjaan !== undefined)
      supabaseData.jenis_pekerjaan = appData.jenisPekerjaan;
    if (appData.terimaDari !== undefined)
      supabaseData.terima_dari = appData.terimaDari;
    if (appData.timeStart !== undefined)
      supabaseData.time_start = appData.timeStart;
    if (appData.timeFinish !== undefined)
      supabaseData.time_finish = appData.timeFinish;
    if (appData.qtyOk !== undefined) supabaseData.qty_ok = appData.qtyOk;
    if (appData.qtyNg !== undefined) supabaseData.qty_ng = appData.qtyNg;
    if (appData.prosesSelanjutnya !== undefined)
      supabaseData.proses_selanjutnya = appData.prosesSelanjutnya;

    console.log("🔄 Transform output supabaseData:", supabaseData);
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
      client: supabaseRecord.client,
      produk: supabaseRecord.produk,
      terimaDari: supabaseRecord.terima_dari,
      timeStart: supabaseRecord.time_start,
      timeFinish: supabaseRecord.time_finish,
      qtyOk: supabaseRecord.qty_ok,
      qtyNg: supabaseRecord.qty_ng,
      satuan: supabaseRecord.satuan,
      prosesSelanjutnya: supabaseRecord.proses_selanjutnya,
      keterangan: supabaseRecord.keterangan,
      // Calculate total for RekapView
      totalQty: (supabaseRecord.qty_ok || 0) + (supabaseRecord.qty_ng || 0),
      createdAt: supabaseRecord.created_at,
      updatedAt: supabaseRecord.updated_at,
    };
  }

  // Hybrid save method
  async save(data) {
    if (this.useSupabase) {
      const transformedData = this.transformToSupabaseFormat(data);
      return await this.saveToSupabase(transformedData);
    } else {
      return this.add(data);
    }
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

  // Save lipat report to Supabase
  async saveToSupabase(data) {
    try {
      // Data here is already in snake_case format from transformToSupabaseFormat
      return await dbService.create(TABLES.LIPAT_REPORTS, data);
    } catch (error) {
      console.error("Error saving lipat report to Supabase:", error);
      throw error;
    }
  }

  // Get all lipat reports from Supabase
  async getAllFromSupabase() {
    try {
      const rawData = await dbService.read(TABLES.LIPAT_REPORTS);
      return rawData.map((record) => this.transformSupabaseData(record));
    } catch (error) {
      console.error("Error getting lipat reports from Supabase:", error);
      return [];
    }
  }

  // Get lipat reports by date range from Supabase
  async getSupabaseByDateRange(startDate, endDate) {
    try {
      const rawData = await dbService.read(TABLES.LIPAT_REPORTS);
      const filteredData = rawData.filter((report) => {
        const reportDate = new Date(report.tanggal);
        return (
          reportDate >= new Date(startDate) && reportDate <= new Date(endDate)
        );
      });
      return filteredData;
    } catch (error) {
      console.error("Error getting lipat reports by date range:", error);
      return [];
    }
  }

  // Update lipat report in Supabase
  async updateSupabaseReport(id, updateData) {
    try {
      return await dbService.update(TABLES.LIPAT_REPORTS, id, updateData);
    } catch (error) {
      console.error("Error updating lipat report:", error);
      throw error;
    }
  }

  // Delete lipat report from Supabase
  async deleteSupabaseReport(id) {
    try {
      return await dbService.delete(TABLES.LIPAT_REPORTS, id);
    } catch (error) {
      console.error("Error deleting lipat report:", error);
      throw error;
    }
  }

  // Get next available nomor for current month (like banner pattern)
  async getNextNomor() {
    try {
      console.log("🔍 Lipat: Getting next nomor from database...");
      const allReports = await this.getAll();
      console.log("📊 Lipat: Total reports in database:", allReports.length);
      console.log("🔍 Lipat: First few reports:", allReports.slice(0, 3));

      // Get current month and year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // 0-based month
      console.log(
        `📅 Lipat: Current month/year: ${currentMonth + 1}/${currentYear}`
      );

      // Filter reports for the current month and year
      const reportsForMonth = allReports.filter((report) => {
        const reportDate = new Date(report.tanggal);
        const reportYear = reportDate.getFullYear();
        const reportMonth = reportDate.getMonth();
        console.log(
          `🔍 Lipat: Report date ${
            report.tanggal
          } -> Year: ${reportYear}, Month: ${
            reportMonth + 1
          }, Current: ${currentYear}/${currentMonth + 1}`
        );
        return reportYear === currentYear && reportMonth === currentMonth;
      });

      console.log(
        "📈 Lipat: Reports for current month:",
        reportsForMonth.length
      );
      console.log("📋 Lipat: Current month reports:", reportsForMonth);

      if (reportsForMonth.length === 0) {
        console.log("✨ Lipat: First report for this month, returning 1");
        return 1; // First report for this month
      }

      // Find the maximum nomor for this month and increment by 1
      const nomors = reportsForMonth.map((report) => {
        console.log(
          "🔍 Lipat: Processing report nomor:",
          report.nomor,
          typeof report.nomor
        );
        return Number(report.nomor) || 0;
      });
      console.log("🔢 Lipat: Existing nomors:", nomors);

      const maxNomor = Math.max(...nomors);
      const nextNomor = maxNomor + 1;

      console.log(`🎯 Lipat: Max nomor: ${maxNomor}, Next nomor: ${nextNomor}`);
      return nextNomor;
    } catch (error) {
      console.error("❌ Lipat: Error getting next nomor:", error);
      return 1; // Default to 1 if error occurs
    }
  }

  // ========== LOCALSTORAGE FALLBACK METHODS ==========

  // Update existing lipat report (localStorage fallback)
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

  // Delete lipat report (localStorage fallback)
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

  // Export data
  async export() {
    const data = await this.getAll();
    return JSON.stringify(data, null, 2);
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
}
