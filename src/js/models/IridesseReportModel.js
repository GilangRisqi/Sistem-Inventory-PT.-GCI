import { dbService } from "../services/SupabaseService.js";
import { TABLES } from "../config/supabase.js";
import * as db from "../db.js"; // Keep for backward compatibility

export class IridesseReportModel {
  constructor() {
    this.storeName = db.DB_STORES.iridesseReports;
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
        throw new Error("Gagal menyimpan laporan Iridesse: " + error.message);
      }
    }
  }

  // Hybrid getAll method
  async getAll() {
    if (this.useSupabase) {
      console.log("📡 IridesseReport: Using Supabase for getAll");
      return await this.getAllFromSupabase();
    } else {
      console.log("💾 IridesseReport: Using IndexedDB for getAll");
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
        throw new Error("Gagal mengambil laporan Iridesse: " + error.message);
      }
    }
  }

  // Hybrid getByDateRange method
  async getByDateRange(startDate, endDate) {
    if (this.useSupabase) {
      try {
        const rawData = await dbService.read(TABLES.IRIDESSE_REPORTS);
        const filteredData = rawData.filter((report) => {
          const reportDate = new Date(report.tanggal);
          return (
            reportDate >= new Date(startDate) && reportDate <= new Date(endDate)
          );
        });
        return filteredData.map((record) => this.transformSupabaseData(record));
      } catch (error) {
        console.error("Error getting Iridesse reports by date range:", error);
        return [];
      }
    } else {
      try {
        return await db.getRecordsByDateRange(
          this.storeName,
          startDate,
          endDate
        );
      } catch (error) {
        throw new Error("Gagal mengambil laporan Iridesse: " + error.message);
      }
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
          "Error getting Iridesse report by ID from Supabase:",
          error
        );
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
        throw new Error("Gagal mengambil laporan Iridesse: " + error.message);
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
        throw new Error("Gagal mengupdate laporan Iridesse: " + error.message);
      }
    }
  }

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
        throw new Error("Gagal menghapus laporan Iridesse: " + error.message);
      }
    }
  }

  // ===== SUPABASE METHODS =====

  // Save Iridesse report to Supabase
  async saveToSupabase(data) {
    try {
      // Transform data to snake_case format for Supabase
      const transformedData = this.transformToSupabaseFormat(data);
      return await dbService.create(TABLES.IRIDESSE_REPORTS, transformedData);
    } catch (error) {
      console.error("Error saving Iridesse report to Supabase:", error);
      throw error;
    }
  }

  // Transform app data (camelCase) to Supabase format (snake_case)
  transformToSupabaseFormat(appData) {
    const supabaseData = {};

    // Direct mappings
    if (appData.id !== undefined) supabaseData.id = appData.id;
    if (appData.tanggal !== undefined) supabaseData.tanggal = appData.tanggal;
    if (appData.status !== undefined) supabaseData.status = appData.status;

    // camelCase to snake_case transformations
    if (appData.startBilling !== undefined)
      supabaseData.start_billing = appData.startBilling;
    if (appData.noSpk !== undefined) supabaseData.no_spk = appData.noSpk;
    if (appData.namaClient !== undefined)
      supabaseData.nama_client = appData.namaClient;
    if (appData.namaPekerjaan !== undefined)
      supabaseData.nama_pekerjaan = appData.namaPekerjaan;
    if (appData.jenisKertas !== undefined)
      supabaseData.jenis_kertas = appData.jenisKertas;
    if (appData.ukuranKertas !== undefined)
      supabaseData.ukuran_kertas = appData.ukuranKertas;
    if (appData.jenisPrint !== undefined)
      supabaseData.jenis_print = appData.jenisPrint;
    if (appData.jumlahCetak !== undefined)
      supabaseData.jumlah_cetak = appData.jumlahCetak;
    if (appData.ng !== undefined) supabaseData.ng = appData.ng;
    if (appData.timeStart !== undefined)
      supabaseData.time_start = appData.timeStart;
    if (appData.timeFinish !== undefined)
      supabaseData.time_finish = appData.timeFinish;
    if (appData.finishBilling !== undefined)
      supabaseData.finish_billing = appData.finishBilling;
    if (appData.billing !== undefined) supabaseData.billing = appData.billing;
    if (appData.gap !== undefined) supabaseData.gap = appData.gap;

    return supabaseData;
  }

  // Transform Supabase data (snake_case) to app format (camelCase)
  transformSupabaseData(supabaseRecord) {
    return {
      id: supabaseRecord.id,
      tanggal: supabaseRecord.tanggal,
      startBilling: supabaseRecord.start_billing,
      noSpk: supabaseRecord.no_spk,
      namaClient: supabaseRecord.nama_client,
      namaPekerjaan: supabaseRecord.nama_pekerjaan,
      jenisKertas: supabaseRecord.jenis_kertas,
      ukuranKertas: supabaseRecord.ukuran_kertas,
      jenisPrint: supabaseRecord.jenis_print,
      jumlahCetak: supabaseRecord.jumlah_cetak,
      ng: supabaseRecord.ng,
      timeStart: supabaseRecord.time_start,
      timeFinish: supabaseRecord.time_finish,
      finishBilling: supabaseRecord.finish_billing,
      billing: supabaseRecord.billing,
      gap: supabaseRecord.gap,
      status: supabaseRecord.status,
      // Calculate total for RekapView
      totalCetak: Math.max(
        0,
        (supabaseRecord.jumlah_cetak || 0) - (supabaseRecord.ng || 0)
      ),
      createdAt: supabaseRecord.created_at,
      updatedAt: supabaseRecord.updated_at,
    };
  }

  // Get all Iridesse reports from Supabase
  async getAllFromSupabase() {
    try {
      const rawData = await dbService.read(TABLES.IRIDESSE_REPORTS);
      return rawData.map((record) => this.transformSupabaseData(record));
    } catch (error) {
      console.error("Error getting Iridesse reports from Supabase:", error);
      return [];
    }
  }

  // Update Iridesse report in Supabase
  async updateSupabaseReport(id, updateData) {
    try {
      return await dbService.update(TABLES.IRIDESSE_REPORTS, id, updateData);
    } catch (error) {
      console.error("Error updating Iridesse report:", error);
      throw error;
    }
  }

  // Delete Iridesse report from Supabase
  async deleteSupabaseReport(id) {
    try {
      return await dbService.delete(TABLES.IRIDESSE_REPORTS, id);
    } catch (error) {
      console.error("Error deleting Iridesse report:", error);
      throw error;
    }
  }

  // Migration helper
  async migrateToSupabase() {
    try {
      console.log("🔄 Starting Iridesse Report migration to Supabase...");

      const indexedDBReports = await this.getAll();
      console.log(
        `📊 Found ${indexedDBReports.length} Iridesse reports in IndexedDB`
      );

      const migrationResults = [];
      for (const report of indexedDBReports) {
        try {
          const result = await this.saveToSupabase(report);
          migrationResults.push({
            success: true,
            report: report.jobName,
            supabaseId: result.id,
          });
          console.log(
            `✅ Migrated Iridesse report: ${report.jobName} - ${report.tanggal}`
          );
        } catch (error) {
          migrationResults.push({
            success: false,
            report: report.jobName,
            error: error.message,
          });
          console.error(
            `❌ Failed to migrate Iridesse report: ${report.jobName}`,
            error
          );
        }
      }

      console.log("🎉 Iridesse Report migration completed!");
      return migrationResults;
    } catch (error) {
      console.error("Error during Iridesse Report migration:", error);
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
        console.error("Error getting all Iridesse reports:", error);
        return [];
      }
    }
  }
}
