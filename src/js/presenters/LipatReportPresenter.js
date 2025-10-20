class LipatReportPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind the save handler (like DailyReportPresenter pattern)
    this.view.bindSaveReport(this.handleSaveReport.bind(this));

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Listen for form submission
    document.addEventListener("lipatReportSubmit", (event) => {
      this.handleReportSubmit(event.detail);
    });

    // Listen for next nomor request (updated for callback pattern)
    document.addEventListener("lipatReportGetNextNomor", (event) => {
      this.handleGetNextNomor(event.detail);
    });

    // Listen for edit requests from rekap
    document.addEventListener("editLipatReport", (event) => {
      this.handleEditReport(event.detail.id);
    });

    // Listen for delete requests from rekap
    document.addEventListener("deleteLipatReport", (event) => {
      this.handleDeleteReport(event.detail.id);
    });
  }

  // Handle report submission (create or update)
  handleReportSubmit(formData) {
    try {
      let result;
      const editId = this.view.getEditId();

      if (editId) {
        // Update existing report
        result = this.model.update(editId, formData);
      } else {
        // Create new report
        result = this.model.add(formData);
      }

      if (result.success) {
        const action = editId ? "diperbarui" : "disimpan";
        this.view.showSuccess(`Laporan berhasil ${action}!`);
        this.view.clearForm();
        this.view.clearEditId();

        // Refresh rekap if it's showing lipat reports
        const rekapTipe = document.getElementById("rekap-tipe");
        if (rekapTipe && rekapTipe.value === "lipat-report") {
          document.dispatchEvent(new CustomEvent("refreshRekap"));
        }
      } else {
        this.view.showError(result.error);
      }
    } catch (error) {
      console.error("Error submitting lipat report:", error);
      this.view.showError("Terjadi kesalahan saat menyimpan laporan");
    }
  }

  // Handle get next nomor request
  // Handle get next nomor request
  async handleGetNextNomor(detail) {
    try {
      console.log("🔄 Lipat Presenter: Getting next nomor from model...");
      const nextNomor = await this.model.getNextNomor();
      console.log(
        `📞 Lipat Presenter: Got nomor ${nextNomor}, detail has callback:`,
        !!detail.callback
      );

      if (detail.callback) {
        // New callback pattern (like banner)
        console.log(
          "📤 Lipat Presenter: Calling callback with nomor:",
          nextNomor
        );
        detail.callback(nextNomor);
      } else {
        // Old pattern for backward compatibility
        console.log("📤 Lipat Presenter: Setting auto nomor via view method");
        this.view.setAutoNomor(nextNomor);
      }
    } catch (error) {
      console.error("❌ Lipat Presenter: Error getting next nomor:", error);
      const defaultNomor = 1;

      if (detail.callback) {
        detail.callback(defaultNomor);
      } else {
        this.view.setAutoNomor(defaultNomor);
      }
    }
  }

  // Handle edit report request
  handleEditReport(id) {
    try {
      const report = this.model.getById(id);
      if (report) {
        // Switch to lipat report section
        document.dispatchEvent(
          new CustomEvent("navigateTo", {
            detail: { page: "lipat-report" },
          })
        );

        // Wait a bit for navigation to complete, then populate form
        setTimeout(() => {
          this.view.populateForm(report);
          this.view.showSuccess("Data dimuat untuk diedit");
        }, 100);
      } else {
        this.view.showError("Data laporan tidak ditemukan");
      }
    } catch (error) {
      console.error("Error editing lipat report:", error);
      this.view.showError("Terjadi kesalahan saat memuat data");
    }
  }

  // Handle delete report request
  handleDeleteReport(id) {
    try {
      const report = this.model.getById(id);
      if (!report) {
        this.view.showError("Data laporan tidak ditemukan");
        return;
      }

      const confirmMessage = `Apakah Anda yakin ingin menghapus laporan No. ${report.nomor} tanggal ${report.tanggal}?`;
      if (confirm(confirmMessage)) {
        const result = this.model.delete(id);

        if (result.success) {
          this.view.showSuccess("Laporan berhasil dihapus");

          // Refresh rekap
          document.dispatchEvent(new CustomEvent("refreshRekap"));
        } else {
          this.view.showError(result.error);
        }
      }
    } catch (error) {
      console.error("Error deleting lipat report:", error);
      this.view.showError("Terjadi kesalahan saat menghapus laporan");
    }
  }

  // Get reports for rekap by date range
  getReportsByDateRange(startDate, endDate) {
    try {
      return this.model.getByDateRange(startDate, endDate);
    } catch (error) {
      console.error("Error getting lipat reports by date range:", error);
      return [];
    }
  }

  // Get all reports for rekap
  getAllReports() {
    try {
      return this.model.getAll();
    } catch (error) {
      console.error("Error getting all lipat reports:", error);
      return [];
    }
  }

  // Export data
  exportData() {
    try {
      return this.model.export();
    } catch (error) {
      console.error("Error exporting lipat reports:", error);
      this.view.showError("Terjadi kesalahan saat export data");
      return null;
    }
  }

  // Import data
  importData(jsonData) {
    try {
      const result = this.model.import(jsonData);

      if (result.success) {
        this.view.showSuccess("Data berhasil diimport");
        // Refresh rekap if showing lipat reports
        const rekapTipe = document.getElementById("rekap-tipe");
        if (rekapTipe && rekapTipe.value === "lipat-report") {
          document.dispatchEvent(new CustomEvent("refreshRekap"));
        }
      } else {
        this.view.showError(`Gagal import data: ${result.error}`);
      }

      return result;
    } catch (error) {
      console.error("Error importing lipat reports:", error);
      this.view.showError("Terjadi kesalahan saat import data");
      return { success: false, error: error.message };
    }
  }

  // Clear all data
  clearAllData() {
    try {
      const confirmMessage =
        "Apakah Anda yakin ingin menghapus SEMUA data laporan mesin lipat? Tindakan ini tidak dapat dibatalkan.";
      if (confirm(confirmMessage)) {
        const result = this.model.clearAll();

        if (result.success) {
          this.view.showSuccess("Semua data berhasil dihapus");
          this.view.clearForm();

          // Refresh rekap if showing lipat reports
          const rekapTipe = document.getElementById("rekap-tipe");
          if (rekapTipe && rekapTipe.value === "lipat-report") {
            document.dispatchEvent(new CustomEvent("refreshRekap"));
          }
        }

        return result;
      }

      return { success: false, error: "Dibatalkan oleh user" };
    } catch (error) {
      console.error("Error clearing lipat reports:", error);
      this.view.showError("Terjadi kesalahan saat menghapus data");
      return { success: false, error: error.message };
    }
  }

  // Validate time format
  validateTimeFormat(timeString) {
    const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timePattern.test(timeString);
  }

  // Calculate duration between start and finish time
  calculateDuration(timeStart, timeFinish) {
    try {
      const start = new Date(`2000-01-01T${timeStart}`);
      const finish = new Date(`2000-01-01T${timeFinish}`);

      let diffMs = finish - start;

      // Handle overnight work (finish time next day)
      if (diffMs < 0) {
        diffMs += 24 * 60 * 60 * 1000; // Add 24 hours
      }

      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      return `${diffHours}h ${diffMinutes}m`;
    } catch (error) {
      return "-";
    }
  }

  // Get statistics for a date range
  getStatistics(startDate, endDate) {
    try {
      const reports = this.getReportsByDateRange(startDate, endDate);

      const stats = {
        totalReports: reports.length,
        totalQtyOk: reports.reduce((sum, r) => sum + (r.qtyOk || 0), 0),
        totalQtyNg: reports.reduce((sum, r) => sum + (r.qtyNg || 0), 0),
        totalQtyAll: 0,
        operators: new Set(),
        products: new Set(),
        workTypes: new Set(),
      };

      stats.totalQtyAll = stats.totalQtyOk + stats.totalQtyNg;

      reports.forEach((report) => {
        if (report.operator) stats.operators.add(report.operator);
        if (report.produk) stats.products.add(report.produk);
        if (report.jenisPekerjaan) stats.workTypes.add(report.jenisPekerjaan);
      });

      stats.uniqueOperators = stats.operators.size;
      stats.uniqueProducts = stats.products.size;
      stats.uniqueWorkTypes = stats.workTypes.size;

      return stats;
    } catch (error) {
      console.error("Error calculating lipat statistics:", error);
      return {
        totalReports: 0,
        totalQtyOk: 0,
        totalQtyNg: 0,
        totalQtyAll: 0,
        uniqueOperators: 0,
        uniqueProducts: 0,
        uniqueWorkTypes: 0,
      };
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
      this.view.showSuccess("Lipat Report berhasil disimpan!");
    } catch (error) {
      console.error("❌ Lipat: Error saving report:", error);
      this.view.showError("Gagal menyimpan laporan: " + error.message);
    }
  }
}

export { LipatReportPresenter };
