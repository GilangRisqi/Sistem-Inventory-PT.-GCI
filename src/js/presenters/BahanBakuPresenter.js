export class BahanBakuPresenter {
  constructor(model, view) {
    console.log("=== Initializing BahanBakuPresenter ===");
    this.model = model;
    this.view = view;

    console.log("Presenter created with model:", !!model, "view:", !!view);

    // Listen for refresh events
    document.addEventListener("refresh-stock", async (event) => {
      const { category } = event.detail;
      console.log(`Handling refresh request for ${category}`);
      try {
        if (category === "banner") {
          await this.loadBannerStockData();
        }
      } catch (error) {
        console.error("Error refreshing data:", error);
        this.view.showError("Gagal memperbarui data");
      }
    });

    // Listen for get-next-number events
    document.addEventListener("get-next-number", async (event) => {
      const { sectionId, category, type, date } = event.detail;
      console.log(`Handling get-next-number request for ${sectionId}`);
      try {
        const nextNumber = await this.model.getNextNumber(category, type, date);
        console.log(`Next number for ${sectionId}: ${nextNumber}`);
        await this.view.updateAutoNumber(sectionId, nextNumber);
      } catch (error) {
        console.error("Error getting next number:", error);
        await this.view.updateAutoNumber(sectionId, 1); // Default to 1 on error
      }
    });

    console.log("Handlers bound successfully");

    // Initial setup with delay to ensure DOM is ready
    setTimeout(async () => {
      console.log("Setting up handlers and loading initial data...");

      // Bind stock form handlers
      this.bindStockHandlers();

      // Bind in/out form handlers
      this.bindInOutHandlers();

      // Initialize auto numbers for all forms
      await this.view.initializeAutoNumbers();

      // Load initial stock data
      this.loadBannerStockData();
      this.loadDigitalStockData();
      this.loadProduksiStockData();
    }, 500);
  }

  async loadBannerStockData() {
    try {
      console.log("=== Loading Banner Stock Data ===");
      console.log("1. Requesting data from model...");
      const stockData = await this.model.getCurrentBannerStock();
      console.log("2. Data received from model:", stockData);
      console.log("3. Updating view with data...");

      // Pastikan view stock form sudah ter-initialize
      if (!this.view.stockForms.banner) {
        console.log("Stock banner form not initialized, initializing now...");
        this.view.stockForms.banner =
          this.view._initializeStockForm("stock-banner");
      }

      this.view.updateStockBannerDisplay(stockData);
      console.log("4. View update complete");
    } catch (error) {
      console.error("Error loading banner stock:", error);
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
    console.log("Binding in/out handlers in presenter");

    this.view.bindInOutSubmit(async (data) => {
      console.log(`=== Handler called for ${data.type} with data: ===`, data);
      try {
        if (data.type.startsWith("in-")) {
          console.log("Processing IN submission...");
          await this.handleInSubmit(data.category, data);

          // Refresh the appropriate stock display
          if (data.category === "banner") {
            console.log("Refreshing banner stock display...");
            await this.loadBannerStockData();
          } else if (data.category === "digital") {
            await this.loadDigitalStockData();
          } else if (data.category === "produksi") {
            await this.loadProduksiStockData();
          }

          return true;
        } else if (data.type.startsWith("out-")) {
          console.log("Processing OUT submission...");
          return await this.handleOutSubmit(data.category, data);
        }
      } catch (error) {
        console.error("Error in form submission handler:", error);
        this.view.showError(error.message);
        throw error;
      }
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
      console.log("=== Handle In Submit (Presenter) ===>");
      console.log("Category:", category);
      console.log("Form Data:", JSON.stringify(formData, null, 2));

      // Validasi data sebelum menyimpan
      if (!formData || !formData.data) {
        console.error("Invalid form data:", formData);
        throw new Error("Data tidak valid");
      }

      console.log("Data validation passed, proceeding to save...");

      // Get next auto number before saving
      const nextNumber = await this.model.getNextNumber(
        category,
        "in",
        formData.data.tanggal
      );
      console.log(`Auto-generated number: ${nextNumber}`);

      // Override nomor with auto-generated number
      formData.data.nomor = nextNumber;

      // Tambahkan timestamp
      formData.data.timestamp = new Date().toISOString();

      console.log("Validation passed, saving data with auto number...");
      console.log(
        "Final data to save:",
        JSON.stringify(formData.data, null, 2)
      );

      // Simpan data
      const savedId = await this.model.addStock(category, formData);
      console.log(`Data saved successfully with ID: ${savedId}`);

      // Berikan delay untuk memastikan data tersimpan di IndexedDB
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Refresh stock display terlebih dahulu
      console.log(`Refreshing ${category} stock display immediately...`);
      await this._refreshStockDisplay(category);

      // Reset form dan tampilkan pesan sukses setelah refresh selesai
      console.log("Resetting form and showing success message...");
      this.view.resetForm(category, "in");

      // Re-initialize auto numbers after reset
      await this.view.initializeAutoNumbers();

      this.view.showSuccess(
        `Input ${category} berhasil disimpan dengan nomor ${nextNumber}!`
      );
      console.log("Form reset and success message displayed");

      // Schedule additional refresh untuk memastikan data ter-update
      setTimeout(async () => {
        console.log(`Executing delayed refresh for ${category}...`);
        await this._refreshStockDisplay(category);
      }, 1000);

      return true; // Menandakan bahwa penyimpanan berhasil
    } catch (error) {
      console.error("Error in handleInSubmit:", error);
      this.view.showError(`Gagal menyimpan data: ${error.message}`);
      throw error;
    }
  }

  async _refreshStockDisplay(category) {
    try {
      console.log(`=== Refreshing ${category} display ===`);
      if (category === "banner") {
        await this.loadBannerStockData();
      } else if (category === "digital") {
        await this.loadDigitalStockData();
      } else if (category === "produksi") {
        await this.loadProduksiStockData();
      }
      console.log(`${category} stock display refreshed successfully`);
    } catch (error) {
      console.error(`Error refreshing ${category} display:`, error);
      throw error;
    }
  }

  async handleOutSubmit(category, formData) {
    try {
      console.log("handleOutSubmit called with:", { category, formData });

      // Get next auto number before saving
      const nextNumber = await this.model.getNextNumber(
        category,
        "out",
        formData.data.tanggal
      );
      console.log(`Auto-generated number for OUT: ${nextNumber}`);

      // Override nomor with auto-generated number
      formData.data.nomor = nextNumber;

      console.log(
        "Final OUT data to save:",
        JSON.stringify(formData.data, null, 2)
      );

      // Simpan data
      await this.model.reduceStock(category, formData);
      console.log("Stock reduced successfully");

      // Reset form dan tampilkan pesan sukses
      this.view.resetForm(category, "out");

      // Re-initialize auto numbers after reset
      await this.view.initializeAutoNumbers();

      this.view.showSuccess(
        `Output ${category} berhasil disimpan dengan nomor ${nextNumber}!`
      );

      // Refresh stock display dengan delay kecil
      console.log(`Refreshing ${category} stock display...`);
      setTimeout(async () => {
        try {
          if (category === "banner") {
            await this.loadBannerStockData();
          } else if (category === "digital") {
            await this.loadDigitalStockData();
          } else if (category === "produksi") {
            await this.loadProduksiStockData();
          }
          console.log(`${category} stock display refreshed successfully`);
        } catch (error) {
          console.error(`Error refreshing ${category} display:`, error);
        }
      }, 500); // Increased delay to ensure data is stored

      return true; // Menandakan bahwa penyimpanan berhasil
    } catch (error) {
      console.error("Error in handleOutSubmit:", error);
      this.view.showError(error.message);
      throw error;
    }
  }
}
