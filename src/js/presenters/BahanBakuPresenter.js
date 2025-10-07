export class BahanBakuPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind stock form handlers
    this.bindStockHandlers();

    // Bind in/out form handlers
    this.bindInOutHandlers();

    // Initial load of stock data
    this.loadBannerStockData();
    this.loadDigitalStockData();
    this.loadProduksiStockData();
  }

  async loadBannerStockData() {
    try {
      const stockData = await this.model.getCurrentBannerStock();
      this.view.updateStockBannerDisplay(stockData);
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  async loadDigitalStockData() {
    try {
      const stockData = await this.model.getCurrentDigitalStock();
      this.view.updateStockDigitalDisplay(stockData);
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  async loadProduksiStockData() {
    try {
      const stockData = await this.model.getCurrentProduksiStock();
      this.view.updateStockProduksiDisplay(stockData);
    } catch (error) {
      this.view.showError(error.message);
    }
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
      console.log("Saving data:", { category, formData });
      await this.model.addStock(category, formData);

      // Refresh stock display immediately after successful save
      if (category === "banner") {
        await this.loadBannerStockData();
      } else if (category === "digital") {
        await this.loadDigitalStockData();
      } else if (category === "produksi") {
        await this.loadProduksiStockData();
      }

      this.view.resetForm(category, "in");
      this.view.showSuccess(`Input ${category} berhasil disimpan!`);
    } catch (error) {
      console.error("Error in handleInSubmit:", error);
      this.view.showError(`Gagal menyimpan data: ${error.message}`);
    }
  }

  async handleOutSubmit(category, formData) {
    try {
      await this.model.reduceStock(category, formData);
      this.view.resetForm(category, "out");
      this.view.showSuccess(`Output ${category} berhasil disimpan!`);
      if (category === "banner") {
        await this.loadBannerStockData(); // Refresh banner stock display
      } else if (category === "digital") {
        await this.loadDigitalStockData(); // Refresh digital stock display
      } else if (category === "produksi") {
        await this.loadProduksiStockData(); // Refresh produksi stock display
      }
    } catch (error) {
      this.view.showError(error.message);
    }
  }
}
