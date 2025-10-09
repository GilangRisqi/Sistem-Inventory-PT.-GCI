export class IridesseReportPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind the save handler
    this.view.bindSaveReport(this.handleSaveReport.bind(this));
  }

  async handleSaveReport(data) {
    try {
      // Validate required fields
      if (!data.tanggal || !data.noSpk || !data.namaClient) {
        this.view.showError("Harap lengkapi data yang wajib diisi!");
        return;
      }

      // Save to database
      await this.model.save(data);
      this.view.showSuccess("Laporan Iridesse berhasil disimpan!");
    } catch (error) {
      console.error("Error saving Iridesse report:", error);
      this.view.showError("Gagal menyimpan laporan: " + error.message);
    }
  }

  async loadReports() {
    try {
      const reports = await this.model.getAll();
      return reports;
    } catch (error) {
      console.error("Error loading Iridesse reports:", error);
      this.view.showError("Gagal memuat laporan: " + error.message);
      return [];
    }
  }

  async getReportsByDateRange(startDate, endDate) {
    try {
      const reports = await this.model.getByDateRange(startDate, endDate);
      return reports;
    } catch (error) {
      console.error("Error loading Iridesse reports by date range:", error);
      this.view.showError("Gagal memuat laporan: " + error.message);
      return [];
    }
  }
}
