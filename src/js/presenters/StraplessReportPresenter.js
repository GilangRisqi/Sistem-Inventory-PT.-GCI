import { StraplessReportModel } from "../models/StraplessReportModel.js";

export class StraplessReportPresenter {
  constructor(view) {
    this.view = view;
    this.model = new StraplessReportModel();

    // Bind handlers
    this.view.bindAddStraplessReport(this.handleAddStraplessReport.bind(this));
    this.view.bindEditRecord(this.handleEditRecord.bind(this));
    this.view.bindSaveRecord(this.handleSaveRecord.bind(this));
    this.view.bindCancelEdit(this.handleCancelEdit.bind(this));
    this.view.bindDeleteRecord(this.handleDeleteRecord.bind(this));

    // Bind the save handler (like DailyReportPresenter pattern)
    this.view.bindSaveReport(this.handleSaveReport.bind(this));

    // Add event listener for auto-nomor
    document.addEventListener("straplessReportGetNextNomor", (event) => {
      this.handleGetNextNomor(event.detail);
    });

    console.log("✅ StraplessReportPresenter initialized");
  }

  // Handle adding new strapless report
  handleAddStraplessReport(reportData) {
    try {
      console.log("📝 Adding new strapless report:", reportData);

      // Validate required fields
      const requiredFields = [
        "nomor",
        "tanggal",
        "operator",
        "jenisPekerjaan",
        "timeStart",
        "timeFinish",
        "qtyOk",
        "qtyNg",
        "satuan",
      ];

      for (const field of requiredFields) {
        if (!reportData[field] && reportData[field] !== 0) {
          throw new Error(`Field ${field} is required`);
        }
      }

      // Validate number fields
      if (isNaN(reportData.qtyOk) || reportData.qtyOk < 0) {
        throw new Error("QTY OK must be a valid non-negative number");
      }
      if (isNaN(reportData.qtyNg) || reportData.qtyNg < 0) {
        throw new Error("QTY NG must be a valid non-negative number");
      }

      // Validate date
      const reportDate = new Date(reportData.tanggal);
      if (isNaN(reportDate.getTime())) {
        throw new Error("Invalid date format");
      }

      // Validate time format
      if (
        !this.isValidTimeFormat(reportData.timeStart) ||
        !this.isValidTimeFormat(reportData.timeFinish)
      ) {
        throw new Error("Invalid time format");
      }

      const newEntry = this.model.add(reportData);
      this.view.showSuccess("Data strapless report berhasil ditambahkan!");
      this.view.clearForm();

      console.log("✅ Strapless report added successfully:", newEntry);
      return newEntry;
    } catch (error) {
      console.error("❌ Error adding strapless report:", error);
      this.view.showError(`Gagal menambahkan data: ${error.message}`);
      return null;
    }
  }

  // Handle editing record
  handleEditRecord(id, type) {
    try {
      console.log(`📝 Starting edit for strapless report ID: ${id}`);
      const record = this.model.getById(id);

      if (!record) {
        throw new Error("Record not found");
      }

      return record;
    } catch (error) {
      console.error("❌ Error starting edit:", error);
      this.view.showError(`Gagal memulai edit: ${error.message}`);
      return null;
    }
  }

  // Handle saving edited record
  handleSaveRecord(id, type, updateData) {
    try {
      console.log(`💾 Saving strapless report ID: ${id}`, updateData);

      // Validate updated data
      if (updateData.qtyOk !== undefined) {
        if (isNaN(updateData.qtyOk) || updateData.qtyOk < 0) {
          throw new Error("QTY OK must be a valid non-negative number");
        }
      }
      if (updateData.qtyNg !== undefined) {
        if (isNaN(updateData.qtyNg) || updateData.qtyNg < 0) {
          throw new Error("QTY NG must be a valid non-negative number");
        }
      }

      if (updateData.tanggal !== undefined) {
        const date = new Date(updateData.tanggal);
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date format");
        }
      }

      if (
        updateData.timeStart !== undefined &&
        !this.isValidTimeFormat(updateData.timeStart)
      ) {
        throw new Error("Invalid time start format");
      }
      if (
        updateData.timeFinish !== undefined &&
        !this.isValidTimeFormat(updateData.timeFinish)
      ) {
        throw new Error("Invalid time finish format");
      }

      const updatedRecord = this.model.update(id, updateData);
      if (!updatedRecord) {
        throw new Error("Failed to update record");
      }

      this.view.showSuccess("Data berhasil diperbarui!");
      console.log("✅ Strapless report updated successfully:", updatedRecord);
      return updatedRecord;
    } catch (error) {
      console.error("❌ Error saving record:", error);
      this.view.showError(`Gagal menyimpan data: ${error.message}`);
      return null;
    }
  }

  // Handle canceling edit
  handleCancelEdit(id, type) {
    console.log(`❌ Canceling edit for strapless report ID: ${id}`);
    // View handles the UI reset
  }

  // Handle deleting record
  handleDeleteRecord(id, type) {
    try {
      console.log(`🗑️ Deleting strapless report ID: ${id}`);

      const success = this.model.delete(id);
      if (!success) {
        throw new Error("Failed to delete record");
      }

      this.view.showSuccess("Data berhasil dihapus!");

      // Refresh the table if we're in rekap view
      if (this.view.refreshTable) {
        this.view.refreshTable();
      }

      console.log("✅ Strapless report deleted successfully");
      return true;
    } catch (error) {
      console.error("❌ Error deleting record:", error);
      this.view.showError(`Gagal menghapus data: ${error.message}`);
      return false;
    }
  }

  // Get all strapless reports
  getAllStraplessReports() {
    return this.model.getAll();
  }

  // Get strapless reports by date range
  getStraplessReportsByDateRange(startDate, endDate) {
    try {
      console.log(
        `📊 Getting strapless reports from ${startDate} to ${endDate}`
      );
      return this.model.getByDateRange(startDate, endDate);
    } catch (error) {
      console.error("❌ Error getting reports by date range:", error);
      return [];
    }
  }

  // Get strapless reports by operator
  getStraplessReportsByOperator(operator) {
    try {
      console.log(`📊 Getting strapless reports for operator: ${operator}`);
      return this.model.getByOperator(operator);
    } catch (error) {
      console.error("❌ Error getting reports by operator:", error);
      return [];
    }
  }

  // Get summary statistics
  getStraplessReportsSummary(filterData = null) {
    try {
      return this.model.getSummary(filterData);
    } catch (error) {
      console.error("❌ Error getting summary:", error);
      return {
        totalEntries: 0,
        totalQtyOk: 0,
        totalQtyNg: 0,
        totalQtyAll: 0,
        averageQtyOk: 0,
        averageQtyNg: 0,
        averageQtyAll: 0,
      };
    }
  }

  // Validate time format (HH:MM)
  isValidTimeFormat(time) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  // Export data
  exportStraplessReportsData() {
    try {
      return this.model.exportData();
    } catch (error) {
      console.error("❌ Error exporting data:", error);
      return null;
    }
  }

  // Import data
  importStraplessReportsData(data) {
    try {
      const success = this.model.importData(data);
      if (success) {
        this.view.showSuccess("Data berhasil diimpor!");
        return true;
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("❌ Error importing data:", error);
      this.view.showError(`Gagal mengimpor data: ${error.message}`);
      return false;
    }
  }

  // Clear all data
  clearAllStraplessReports() {
    try {
      this.model.clearAll();
      this.view.showSuccess("Semua data strapless report telah dihapus!");
      console.log("✅ All strapless reports cleared");
      return true;
    } catch (error) {
      console.error("❌ Error clearing data:", error);
      this.view.showError(`Gagal menghapus semua data: ${error.message}`);
      return false;
    }
  }

  // Handle save report (like DailyReportPresenter pattern)
  async handleSaveReport(data) {
    try {
      // Validate required fields
      if (!data.tanggal || !data.operator || !data.jenisPekerjaan) {
        this.view.showError("Harap lengkapi data yang wajib diisi!");
        return;
      }

      // Save to database
      await this.model.save(data);
      this.view.showSuccess("Strapless Report berhasil disimpan!");
    } catch (error) {
      console.error("❌ Strapless: Error saving report:", error);
      this.view.showError("Gagal menyimpan laporan: " + error.message);
    }
  }

  // Handle get next nomor request
  async handleGetNextNomor(detail) {
    try {
      console.log("🔄 Strapless Presenter: Getting next nomor from model...");
      const nextNomor = await this.model.getNextNomor();
      console.log(
        `📞 Strapless Presenter: Got nomor ${nextNomor}, detail has callback:`,
        !!detail.callback
      );

      if (detail.callback) {
        // New callback pattern (like banner)
        console.log(
          "📤 Strapless Presenter: Calling callback with nomor:",
          nextNomor
        );
        detail.callback(nextNomor);
      } else {
        // Old pattern for backward compatibility
        console.log(
          "📤 Strapless Presenter: Setting auto nomor via view method"
        );
        this.view.setAutoNomor(nextNomor);
      }
    } catch (error) {
      console.error("❌ Strapless Presenter: Error getting next nomor:", error);
      const defaultNomor = 1;

      if (detail.callback) {
        detail.callback(defaultNomor);
      } else {
        this.view.setAutoNomor(defaultNomor);
      }
    }
  }
}
