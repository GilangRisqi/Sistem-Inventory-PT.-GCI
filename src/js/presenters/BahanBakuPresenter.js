export class BahanBakuPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind stock form handlers
    this.bindStockHandlers();

    // Bind in/out form handlers
    this.bindInOutHandlers();
  }

  bindStockHandlers() {
    ["banner", "digital", "produksi"].forEach((category) => {
      this.view.bindStockSubmit(category, (data) =>
        this.handleStockSubmit(category, data)
      );
    });
  }

  bindInOutHandlers() {
    ["banner", "digital", "produksi"].forEach((category) => {
      this.view.bindInOutSubmit(category, "in", (data) =>
        this.handleInSubmit(category, data)
      );
      this.view.bindInOutSubmit(category, "out", (data) =>
        this.handleOutSubmit(category, data)
      );
    });
  }

  async handleStockSubmit(category, formData) {
    try {
      await this.model.updateStock(category, formData);
      this.view.resetForm(category);
      this.view.showSuccess(`Stock ${category} berhasil diperbarui!`);
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  async handleInSubmit(category, formData) {
    try {
      await this.model.addStock(category, formData);
      this.view.resetForm(category, "in");
      this.view.showSuccess(`Input ${category} berhasil disimpan!`);
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  async handleOutSubmit(category, formData) {
    try {
      await this.model.reduceStock(category, formData);
      this.view.resetForm(category, "out");
      this.view.showSuccess(`Output ${category} berhasil disimpan!`);
    } catch (error) {
      this.view.showError(error.message);
    }
  }
}
