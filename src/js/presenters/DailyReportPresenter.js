export class DailyReportPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind the save handler
    this.view.bindSaveReport(this.handleSaveReport.bind(this));

    // Add event listener for auto-nomor
    document.addEventListener("dailyReportGetNextNomor", (event) => {
      this.handleGetNextNomor(event.detail);
    });
  }

  async handleSaveReport(data) {
    try {
      // Validate required fields
      if (!data.tanggal || !data.noSpk || !data.client) {
        this.view.showError("Harap lengkapi data yang wajib diisi!");
        return;
      }

      // Save to database
      await this.model.save(data);
      this.view.showSuccess("Daily Report berhasil disimpan!");
    } catch (error) {
      console.error("Error saving daily report:", error);
      this.view.showError("Gagal menyimpan laporan: " + error.message);
    }
  }

  // Handle get next nomor request
  async handleGetNextNomor(detail) {
    try {
      console.log("🔄 Presenter: Getting next nomor from model...");
      const nextNomor = await this.model.getNextNomor();
      console.log(
        `📞 Presenter: Got nomor ${nextNomor}, detail has callback:`,
        !!detail.callback
      );

      if (detail.callback) {
        // New callback pattern (like banner)
        console.log("📤 Presenter: Calling callback with nomor:", nextNomor);
        detail.callback(nextNomor);
      } else {
        // Old pattern for backward compatibility
        console.log("📤 Presenter: Setting auto nomor via view method");
        this.view.setAutoNomor(nextNomor);
      }
    } catch (error) {
      console.error("❌ Presenter: Error getting next nomor:", error);
      const defaultNomor = 1;

      if (detail.callback) {
        detail.callback(defaultNomor);
      } else {
        this.view.setAutoNomor(defaultNomor);
      }
    }
  }

  async loadReports() {
    try {
      const reports = await this.model.getAll();
      return reports;
    } catch (error) {
      console.error("Error loading daily reports:", error);
      this.view.showError("Gagal memuat laporan: " + error.message);
      return [];
    }
  }

  async getReportsByDateRange(startDate, endDate) {
    try {
      const reports = await this.model.getByDateRange(startDate, endDate);
      return reports;
    } catch (error) {
      console.error("Error loading daily reports by date range:", error);
      this.view.showError("Gagal memuat laporan: " + error.message);
      return [];
    }
  }
}
