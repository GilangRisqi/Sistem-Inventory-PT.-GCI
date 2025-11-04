import { dbService } from "../services/SupabaseService.js";
import { TABLES } from "../config/supabase.js";

export class StraplessReportModel {
  constructor() {
    this.data = [];
    this.nextId = 1;
    this.useSupabase = true; // Toggle to enable/disable Supabase
    this.loadFromStorage();
  }

  // Generate new ID
  generateId() {
    const id = this.nextId;
    this.nextId++;
    this.saveToStorage();
    return id;
  }

  // Hybrid add method
  async add(reportData) {
    if (this.useSupabase) {
      return await this.saveToSupabase(reportData);
    } else {
      const id = this.generateId();
      const newEntry = {
        id,
        nomor: reportData.nomor || 0,
        tanggal: reportData.tanggal,
        operator: reportData.operator,
        jenisPekerjaan: reportData.jenisPekerjaan,
        client: reportData.client || "",
        timeStart: reportData.timeStart,
        timeFinish: reportData.timeFinish,
        qtyOk: Number(reportData.qtyOk) || 0,
        qtyNg: Number(reportData.qtyNg) || 0,
        totalQty:
          (Number(reportData.qtyOk) || 0) + (Number(reportData.qtyNg) || 0),
        satuan: reportData.satuan,
        prosesSelanjutnya: reportData.prosesSelanjutnya,
        keterangan: reportData.keterangan || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.data.push(newEntry);
      this.saveToStorage();
      return newEntry;
    }
  }

  // Hybrid getAll method
  async getAll() {
    if (this.useSupabase) {
      return await this.getAllFromSupabase();
    } else {
      return [...this.data];
    }
  }

  // Hybrid getById method
  async getById(id) {
    if (this.useSupabase) {
      try {
        const allReports = await this.getAllFromSupabase();
        return allReports.find((report) => report.id === id);
      } catch (error) {
        console.error(
          "Error getting strapless report by ID from Supabase:",
          error
        );
        throw error;
      }
    } else {
      return this.data.find((item) => item.id === parseInt(id));
    }
  }

  // Hybrid update method
  async update(id, updateData) {
    if (this.useSupabase) {
      // Transform camelCase data to snake_case for Supabase
      const supabaseData = this.transformToSupabaseFormat(updateData);
      return await this.updateSupabaseReport(id, supabaseData);
    } else {
      const index = this.data.findIndex((item) => item.id === parseInt(id));
      if (index === -1) return null;

      // Update only provided fields
      const updatedEntry = { ...this.data[index] };
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== undefined && key !== "id") {
          updatedEntry[key] = updateData[key];
        }
      });

      // Recalculate total if qty values change
      if (updateData.qtyOk !== undefined || updateData.qtyNg !== undefined) {
        updatedEntry.totalQty =
          (Number(updatedEntry.qtyOk) || 0) + (Number(updatedEntry.qtyNg) || 0);
      }

      updatedEntry.updatedAt = new Date().toISOString();
      this.data[index] = updatedEntry;
      this.saveToStorage();
      return updatedEntry;
    }
  }

  // Hybrid delete method
  async delete(id) {
    if (this.useSupabase) {
      return await this.deleteSupabaseReport(id);
    } else {
      const index = this.data.findIndex((item) => item.id === parseInt(id));
      if (index === -1) return false;

      this.data.splice(index, 1);
      this.saveToStorage();
      return true;
    }
  }

  // Hybrid getByDateRange method
  async getByDateRange(startDate, endDate) {
    if (this.useSupabase) {
      return await this.getSupabaseByDateRange(startDate, endDate);
    } else {
      return this.data.filter((item) => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
  }

  // Force refresh data dari Supabase tanpa cache
  async forceRefreshByDateRange(startDate, endDate) {
    try {
      console.log("🔄 Force refreshing strapless reports from Supabase...");
      const rawData = await dbService.read(TABLES.STRAPLESS_REPORTS);
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
      console.error("❌ Error force refreshing strapless reports:", error);
      throw error;
    }
  }

  // Get entries by operator
  getByOperator(operator) {
    return this.data.filter(
      (item) =>
        item.operator &&
        item.operator.toLowerCase().includes(operator.toLowerCase())
    );
  }

  // Get summary statistics
  getSummary(filterData = null) {
    const dataToAnalyze = filterData || this.data;

    return {
      totalEntries: dataToAnalyze.length,
      totalQtyOk: dataToAnalyze.reduce(
        (sum, item) => sum + (Number(item.qtyOk) || 0),
        0
      ),
      totalQtyNg: dataToAnalyze.reduce(
        (sum, item) => sum + (Number(item.qtyNg) || 0),
        0
      ),
      totalQtyAll: dataToAnalyze.reduce(
        (sum, item) => sum + (Number(item.totalQty) || 0),
        0
      ),
      averageQtyOk:
        dataToAnalyze.length > 0
          ? dataToAnalyze.reduce(
              (sum, item) => sum + (Number(item.qtyOk) || 0),
              0
            ) / dataToAnalyze.length
          : 0,
      averageQtyNg:
        dataToAnalyze.length > 0
          ? dataToAnalyze.reduce(
              (sum, item) => sum + (Number(item.qtyNg) || 0),
              0
            ) / dataToAnalyze.length
          : 0,
      averageQtyAll:
        dataToAnalyze.length > 0
          ? dataToAnalyze.reduce(
              (sum, item) => sum + (Number(item.totalQty) || 0),
              0
            ) / dataToAnalyze.length
          : 0,
    };
  }

  // ===== SUPABASE METHODS =====

  // Transform app data (camelCase) to Supabase format (snake_case)
  transformToSupabaseFormat(appData) {
    const supabaseData = {};

    // Direct mappings
    if (appData.id !== undefined) supabaseData.id = appData.id;
    if (appData.nomor !== undefined) supabaseData.nomor = appData.nomor;
    if (appData.tanggal !== undefined) supabaseData.tanggal = appData.tanggal;
    if (appData.operator !== undefined)
      supabaseData.operator = appData.operator;
    if (appData.client !== undefined) supabaseData.client = appData.client;
    if (appData.satuan !== undefined) supabaseData.satuan = appData.satuan;
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
    if (appData.prosesSelanjutnya !== undefined)
      supabaseData.proses_selanjutnya = appData.prosesSelanjutnya;

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

  // Save strapless report to Supabase
  async saveToSupabase(data) {
    try {
      const supabaseData = this.transformToSupabaseFormat(data);
      return await dbService.create(TABLES.STRAPLESS_REPORTS, supabaseData);
    } catch (error) {
      console.error("Error saving strapless report to Supabase:", error);
      throw error;
    }
  }

  // Get all strapless reports from Supabase
  async getAllFromSupabase() {
    try {
      const rawData = await dbService.read(TABLES.STRAPLESS_REPORTS);
      return rawData.map((record) => this.transformSupabaseData(record));
    } catch (error) {
      console.error("Error getting strapless reports from Supabase:", error);
      return [];
    }
  }

  // Get strapless reports by date range from Supabase
  async getSupabaseByDateRange(startDate, endDate) {
    try {
      const rawData = await dbService.read(TABLES.STRAPLESS_REPORTS);
      const filteredData = rawData.filter((report) => {
        const reportDate = new Date(report.tanggal);
        return (
          reportDate >= new Date(startDate) && reportDate <= new Date(endDate)
        );
      });
      return filteredData.map((record) => this.transformSupabaseData(record));
    } catch (error) {
      console.error("Error getting strapless reports by date range:", error);
      return [];
    }
  }

  // Update strapless report in Supabase
  async updateSupabaseReport(id, updateData) {
    try {
      return await dbService.update(TABLES.STRAPLESS_REPORTS, id, updateData);
    } catch (error) {
      console.error("Error updating strapless report:", error);
      throw error;
    }
  }

  // Delete strapless report from Supabase
  async deleteSupabaseReport(id) {
    try {
      return await dbService.delete(TABLES.STRAPLESS_REPORTS, id);
    } catch (error) {
      console.error("Error deleting strapless report:", error);
      throw error;
    }
  }

  // Save to localStorage
  saveToStorage() {
    try {
      localStorage.setItem("straplessReportData", JSON.stringify(this.data));
      localStorage.setItem("straplessReportNextId", this.nextId.toString());
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }

  // Load from localStorage
  loadFromStorage() {
    try {
      const savedData = localStorage.getItem("straplessReportData");
      const savedNextId = localStorage.getItem("straplessReportNextId");

      if (savedData) {
        this.data = JSON.parse(savedData);
      }

      if (savedNextId) {
        this.nextId = parseInt(savedNextId);
      }

      // Ensure nextId is always greater than existing IDs
      if (this.data.length > 0) {
        const maxId = Math.max(...this.data.map((item) => item.id));
        if (this.nextId <= maxId) {
          this.nextId = maxId + 1;
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      this.data = [];
      this.nextId = 1;
    }
  }

  // Get next available nomor for current month (like banner pattern)
  async getNextNomor() {
    try {
      console.log("🔍 Strapless: Getting next nomor from database...");
      const allReports = await this.getAll();
      console.log(
        "📊 Strapless: Total reports in database:",
        allReports.length
      );

      // Get current month and year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // 0-based month
      console.log(
        `📅 Strapless: Current month/year: ${currentMonth + 1}/${currentYear}`
      );

      // Filter reports for the current month and year
      const reportsForMonth = allReports.filter((report) => {
        const reportDate = new Date(report.tanggal);
        const reportYear = reportDate.getFullYear();
        const reportMonth = reportDate.getMonth();
        return reportYear === currentYear && reportMonth === currentMonth;
      });

      console.log(
        "📈 Strapless: Reports for current month:",
        reportsForMonth.length
      );

      if (reportsForMonth.length === 0) {
        console.log("✨ Strapless: First report for this month, returning 1");
        return 1; // First report for this month
      }

      // Find the maximum nomor for this month and increment by 1
      const nomors = reportsForMonth.map((report) => Number(report.nomor) || 0);
      console.log("🔢 Strapless: Existing nomors:", nomors);

      const maxNomor = Math.max(...nomors);
      const nextNomor = maxNomor + 1;

      console.log(
        `🎯 Strapless: Max nomor: ${maxNomor}, Next nomor: ${nextNomor}`
      );
      return nextNomor;
    } catch (error) {
      console.error("❌ Strapless: Error getting next nomor:", error);
      return 1; // Default to 1 if error occurs
    }
  }

  // Hybrid save method (wrapper for add)
  async save(data) {
    try {
      return await this.add(data);
    } catch (error) {
      console.error("Error saving strapless report:", error);
      throw error;
    }
  }

  // Clear all data
  clearAll() {
    this.data = [];
    this.nextId = 1;
    this.saveToStorage();
  }

  // Export data
  exportData() {
    return {
      data: this.data,
      nextId: this.nextId,
      exportedAt: new Date().toISOString(),
    };
  }

  // Import data
  importData(importedData) {
    if (importedData && importedData.data && Array.isArray(importedData.data)) {
      this.data = importedData.data;
      this.nextId = importedData.nextId || 1;

      // Ensure nextId consistency
      if (this.data.length > 0) {
        const maxId = Math.max(...this.data.map((item) => item.id));
        if (this.nextId <= maxId) {
          this.nextId = maxId + 1;
        }
      }

      this.saveToStorage();
      return true;
    }
    return false;
  }
}
