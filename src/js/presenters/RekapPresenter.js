export class RekapPresenter {
  constructor(bahanBakuModel, dailyReportModel, view) {
    this.bahanBakuModel = bahanBakuModel;
    this.dailyReportModel = dailyReportModel;
    this.view = view;
    this.view.bindGenerateRekap(this.handleGenerateRekap.bind(this));
  }

  async handleGenerateRekap({ tipe, startDate, endDate }) {
    try {
      const model =
        tipe === "bahan-baku" ? this.bahanBakuModel : this.dailyReportModel;
      const data = await model.getByDateRange(startDate, endDate);
      this.view.displayTable(data, tipe);
    } catch (error) {
      this.view.showError(error.message);
    }
  }
}
