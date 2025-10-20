export class BahanBakuPresenter {
  constructor(model, view) {
    console.log("=== Initializing BahanBakuPresenter ===");
    this.model = model;
    this.view = view;

    console.log("Presenter created with model:", !!model, "view:", !!view);

    // Initialize auto numbering setelah DOM ready
    setTimeout(async () => {
      try {
        await this.view.initializeAutoNumbers();
        console.log("✅ Auto numbers initialized successfully");
      } catch (error) {
        console.error("Error initializing auto numbers:", error);
      }
    }, 500);

    // Listen for refresh events
    document.addEventListener("refresh-stock", async (event) => {
      const { category } = event.detail;
      console.log(`Handling refresh request for ${category}`);
      try {
        if (category === "banner-in") {
          await this.loadBannerInStockData();
        } else if (category === "banner-out") {
          await this.loadBannerOutStockData();
        }
      } catch (error) {
        console.error("Error refreshing data:", error);
        this.view.showError("Gagal memperbarui data");
      }
    });

    // Listen for section activation events
    document.addEventListener("section-activated", async (event) => {
      const { sectionId } = event.detail;
      console.log(`Section activated: ${sectionId}`);

      try {
        if (sectionId === "stock-banner-in") {
          console.log("Loading data for stock-banner-in section...");
          await this.loadBannerInStockData();
        } else if (sectionId === "stock-banner-out") {
          console.log("Loading data for stock-banner-out section...");
          await this.loadBannerOutStockData();
        } else if (sectionId === "stock-banner-section-out") {
          console.log(
            "Loading data for stock-banner-section-out (full section)..."
          );
          await this.loadBannerOutStockData();
        }
      } catch (error) {
        console.error("Error loading section data:", error);
        this.view.showError("Gagal memuat data section");
      }
    });

    // Also listen for when navigation shows stock-banner sections
    document.addEventListener("navigation-changed", async (event) => {
      const { sectionId } = event.detail;
      console.log(`Navigation changed to: ${sectionId}`);

      if (sectionId === "stock-banner") {
        console.log(
          "Stock banner sections activated, loading both IN and OUT data..."
        );
        setTimeout(async () => {
          await this.loadBannerInStockData();
          await this.loadBannerOutStockData();
        }, 100);
      } else if (sectionId === "stock-digital") {
        console.log(
          "Stock digital sections activated, loading both IN and OUT data..."
        );
        setTimeout(async () => {
          await this.loadDigitalInStockData();
          await this.loadDigitalOutStockData();
        }, 100);
      } else if (sectionId === "stock-produksi") {
        console.log(
          "Stock produksi sections activated, loading both IN and OUT data..."
        );
        setTimeout(async () => {
          await this.loadProduksiInStockData();
          await this.loadProduksiOutStockData();
        }, 100);
      }
    });

    // Listen for debug database check
    document.addEventListener("debug-db-check", async (event) => {
      const { category } = event.detail;
      console.log(`🔍 Debug DB check requested for: ${category}`);

      try {
        const allRecords = await this.model.getAllRecords();
        console.log("🗄️ All IndexedDB Records:");
        console.log("📊 Stock records:", allRecords.stock);
        console.log("📋 Transaction records:", allRecords.transactions);
        console.log("📈 Stats:", {
          totalStock: allRecords.stockCount,
          totalTransactions: allRecords.transactionCount,
          bannerStocks: allRecords.stock.filter((s) => s.category === "banner")
            .length,
        });

        // Debug transaction data specifically for numbering
        console.log("🔍 Debugging transaction numbering...");
        await this.model.debugTransactionData();

        // Also try to force reload the banner data
        console.log("🔄 Force reloading banner data...");
        await this.loadBannerInStockData();
      } catch (error) {
        console.error("🚨 Debug check error:", error);
      }
    });

    // Listen for force load Banner Out events
    document.addEventListener("force-load-banner-out", async (event) => {
      console.log("🐛 Force load Banner Out event received:", event.detail);
      try {
        console.log("🔄 Force loading Banner Out stock data...");
        await this.loadBannerOutStockData();
        console.log("✅ Force load Banner Out completed");
      } catch (error) {
        console.error("❌ Force load Banner Out failed:", error);
        this.view.showError("Gagal memuat data Banner Out: " + error.message);
      }
    });

    // Listen for get-next-number events
    document.addEventListener("get-next-number", async (event) => {
      const { sectionId, category, type, date } = event.detail;
      console.log(`Handling get-next-number request for ${sectionId}`);
      try {
        let nextNumber = 1; // Default

        // Use the new specific methods instead of the old getNextNumber
        if (category === "banner" && type === "in") {
          nextNumber = await this.model.getNextBannerInNumber(date);
        } else if (category === "banner" && type === "out") {
          nextNumber = await this.model.getNextBannerOutNumber(date);
        } else if (category === "digital" && type === "in") {
          nextNumber = await this.model.getNextDigitalInNumber(date);
        } else if (category === "digital" && type === "out") {
          nextNumber = await this.model.getNextDigitalOutNumber(date);
        } else if (category === "produksi" && type === "in") {
          nextNumber = await this.model.getNextProduksiInNumber(date);
        } else if (category === "produksi" && type === "out") {
          nextNumber = await this.model.getNextProduksiOutNumber(date);
        } else {
          console.warn(
            `Unknown category/type combination: ${category}/${type}`
          );
          nextNumber = 1;
        }

        console.log(`Next number for ${sectionId}: ${nextNumber}`);
        await this.view.updateAutoNumber(sectionId, nextNumber);
      } catch (error) {
        console.error("Error getting next number:", error);
        await this.view.updateAutoNumber(sectionId, 1); // Default to 1 on error
      }
    });

    // Listen for update auto numbers events
    document.addEventListener("update-auto-numbers", async (event) => {
      const { sectionId } = event.detail;
      console.log(`🔢 Update auto numbers requested for: ${sectionId}`);

      try {
        // Parse category and type from sectionId
        const [type, category] = sectionId.split("-");
        const currentDate = new Date().toISOString().split("T")[0];

        let nextNumber = 1; // Default

        // Use the new specific methods instead of the old getNextNumber
        if (category === "banner" && type === "in") {
          nextNumber = await this.model.getNextBannerInNumber(currentDate);
        } else if (category === "banner" && type === "out") {
          nextNumber = await this.model.getNextBannerOutNumber(currentDate);
        } else if (category === "digital" && type === "in") {
          nextNumber = await this.model.getNextDigitalInNumber(currentDate);
        } else if (category === "digital" && type === "out") {
          nextNumber = await this.model.getNextDigitalOutNumber(currentDate);
        } else if (category === "produksi" && type === "in") {
          nextNumber = await this.model.getNextProduksiInNumber(currentDate);
        } else if (category === "produksi" && type === "out") {
          nextNumber = await this.model.getNextProduksiOutNumber(currentDate);
        } else {
          console.warn(
            `Unknown category/type combination: ${category}/${type}`
          );
        }

        await this.view.updateAutoNumber(sectionId, nextNumber);

        console.log(`✅ Auto number updated for ${sectionId}: ${nextNumber}`);
      } catch (error) {
        console.error(`❌ Error updating auto number for ${sectionId}:`, error);
      }
    });

    // Listen for debug hidden records
    document.addEventListener("debug-hidden-records", async (event) => {
      const { category, type, date } = event.detail;
      console.log(`🕵️ Debug hidden records requested for: ${category}-${type}`);

      try {
        const result = await this.model.debugHiddenRecords(
          category,
          type,
          date
        );
        console.log("🔍 Hidden records debug result:", result);

        // Show alert with summary
        alert(`Debug Results for ${category}-${type}:
        
Total Transactions: ${result.totalTransactions}
Category Records: ${result.categoryRecords}  
Matching Records: ${result.matchingRecords}

Check console for detailed information.`);
      } catch (error) {
        console.error("Error debugging hidden records:", error);
        alert("Error debugging records: " + error.message);
      }
    });

    // Listen for clear category records
    document.addEventListener("clear-category-records", async (event) => {
      const { category } = event.detail;
      console.log(`🗑️ Clear category records requested for: ${category}`);

      if (
        confirm(
          `Are you sure you want to clear ALL records for category "${category}"? This cannot be undone!`
        )
      ) {
        try {
          await this.model.clearCategoryRecords(category);
          alert(`All records for category "${category}" have been cleared.`);

          // Refresh displays
          if (category === "produksi") {
            await this.loadProduksiInStockData();
            await this.loadProduksiOutStockData();
          } else if (category === "banner") {
            await this.loadBannerInStockData();
            await this.loadBannerOutStockData();
          } else if (category === "digital") {
            await this.loadDigitalInStockData();
            await this.loadDigitalOutStockData();
          }
        } catch (error) {
          console.error("Error clearing category records:", error);
          alert("Error clearing records: " + error.message);
        }
      }
    });

    console.log("Handlers bound successfully");

    // Setup reset numbering handler
    this.setupResetNumberingHandler();

    // Initial setup with delay to ensure DOM is ready
    setTimeout(async () => {
      console.log("Setting up handlers and loading initial data...");

      // Bind stock form handlers
      this.bindStockHandlers();

      // Bind in/out form handlers
      this.bindInOutHandlers();

      // Bind stock action handlers
      this.bindStockActionHandlers();

      // Initialize auto numbers for all forms
      await this.view.initializeAutoNumbers();

      // Load initial stock data (including banner sections)
      console.log("🚀 Loading initial stock data...");
      this.loadBannerInStockData();
      this.loadBannerOutStockData();
      this.loadDigitalInStockData();
      this.loadDigitalOutStockData();
      this.loadProduksiInStockData();
      this.loadProduksiOutStockData();
    }, 500);
  }

  async loadBannerInStockData() {
    try {
      console.log("=== Loading Banner In Stock Data (Simplified) ===");
      const stockData = await this.model.getCurrentBannerStock();
      console.log("📊 Banner stock data received:", stockData);
      console.log(
        "📈 Data count:",
        Array.isArray(stockData) ? stockData.length : "Not an array"
      );

      this.view.updateStockBannerInDisplay(stockData);
      console.log("✅ Banner In view update complete");
    } catch (error) {
      console.error("Error loading banner in stock:", error);
      this.view.showError(error.message);
    }
  }

  async loadBannerOutStockData() {
    try {
      console.log("=== Loading Banner Out Stock Data (From Transactions) ===");
      const stockData = await this.model.getCurrentBannerOutStock();
      console.log("📊 Banner out stock data received:", stockData);

      this.view.updateStockBannerOutDisplay(stockData);
      console.log("✅ Banner Out view update complete");
    } catch (error) {
      console.error("Error loading banner out stock:", error);
      this.view.showError(error.message);
    }
  }

  async loadDigitalInStockData() {
    try {
      console.log("=== Loading Digital In Stock Data ===");
      const stockData = await this.model.getCurrentDigitalStock();
      console.log("📊 Digital In stock data received:", stockData);
      console.log(
        "📈 Data count:",
        Array.isArray(stockData) ? stockData.length : "Not an array"
      );

      this.view.updateStockDigitalInDisplay(stockData);
      console.log("✅ Digital In view update complete");
    } catch (error) {
      console.error("Error loading digital in stock:", error);
      this.view.showError(error.message);
    }
  }

  async loadDigitalOutStockData() {
    try {
      console.log("=== Loading Digital Out Stock Data ===");
      const stockData = await this.model.getCurrentDigitalOutStock();
      console.log("📊 Digital Out stock data received:", stockData);

      this.view.updateStockDigitalOutDisplay(stockData);
      console.log("✅ Digital Out view update complete");
    } catch (error) {
      console.error("Error loading digital out stock:", error);
      this.view.showError(error.message);
    }
  }

  async loadProduksiInStockData() {
    try {
      console.log("=== Loading Produksi In Stock Data ===");
      const stockData = await this.model.getCurrentProduksiStock();
      console.log("📊 Produksi In stock data received:", stockData);

      this.view.updateStockProduksiInDisplay(stockData);
      console.log("✅ Produksi In view update complete");
    } catch (error) {
      console.error("Error loading produksi in stock:", error);
      this.view.showError(error.message);
    }
  }

  async loadProduksiOutStockData() {
    try {
      console.log("=== Loading Produksi Out Stock Data ===");
      const stockData = await this.model.getCurrentProduksiOutStock();
      console.log("📊 Produksi Out stock data received:", stockData);

      this.view.updateStockProduksiOutDisplay(stockData);
      console.log("✅ Produksi Out view update complete");
    } catch (error) {
      console.error("Error loading produksi out stock:", error);
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
    this.view.bindInOutSubmit(async (data) => {
      try {
        if (data.type.startsWith("in-")) {
          await this.handleInSubmit(data.category, data);

          // Refresh the appropriate stock display
          if (data.category === "banner") {
            await this.loadBannerInStockData();
            await this.loadBannerOutStockData();
          } else if (data.category === "digital") {
            await this.loadDigitalInStockData();
            await this.loadDigitalOutStockData();
          } else if (data.category === "produksi") {
            await this.loadProduksiInStockData();
            await this.loadProduksiOutStockData();
          }

          return true;
        } else if (data.type.startsWith("out-")) {
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
      // Validasi data sebelum menyimpan
      if (!formData || !formData.data) {
        console.error("Invalid form data:", formData);
        throw new Error("Data tidak valid");
      }

      // Special handling untuk semua kategori - save ke Supabase
      if (category === "banner") {
        console.log("💾 Saving Banner In to Supabase...");

        // Get next number khusus untuk Banner In dari Supabase (sama seperti DailyReport)
        const bannerInNumber = await this.model.getNextBannerInNumber(
          formData.data.tanggal
        );
        formData.data.nomor = bannerInNumber;

        // Save to Supabase banner_in_stock table
        const result = await this.model.saveBannerInStockToSupabase(
          formData.data
        );
        console.log("✅ Banner In saved to Supabase:", result);

        // Refresh display langsung dari Supabase
        await this.loadBannerInStockData();

        // Reset form dan tampilkan pesan sukses
        this.view.resetForm(category, "in");
        await this.view.initializeAutoNumbers();

        this.view.showSuccess(
          `Banner In berhasil disimpan dengan nomor ${bannerInNumber}!`
        );

        return true;
      } else if (category === "digital") {
        console.log("💾 Saving Digital In to Supabase...");

        // Get next number khusus untuk Digital In dari Supabase (sama seperti DailyReport)
        const digitalInNumber = await this.model.getNextDigitalInNumber(
          formData.data.tanggal
        );
        formData.data.nomor = digitalInNumber;

        // Save to Supabase digital_in_stock table
        const result = await this.model.saveDigitalInStockToSupabase(
          formData.data
        );
        console.log("✅ Digital In saved to Supabase:", result);

        // Refresh display langsung dari Supabase
        await this.loadDigitalInStockData();

        // Reset form dan tampilkan pesan sukses
        this.view.resetForm(category, "in");
        await this.view.initializeAutoNumbers();

        this.view.showSuccess(
          `Digital In berhasil disimpan dengan nomor ${digitalInNumber}!`
        );

        return true;
      } else if (category === "produksi") {
        console.log("💾 Saving Produksi In to Supabase...");

        // Get next number khusus untuk Produksi In dari Supabase (sama seperti DailyReport)
        const produksiInNumber = await this.model.getNextProduksiInNumber(
          formData.data.tanggal
        );
        formData.data.nomor = produksiInNumber;

        // Save to Supabase produksi_in_stock table
        const result = await this.model.saveProduksiInStockToSupabase(
          formData.data
        );
        console.log("✅ Produksi In saved to Supabase:", result);

        // Refresh display langsung dari Supabase
        await this.loadProduksiInStockData();

        // Reset form dan tampilkan pesan sukses
        this.view.resetForm(category, "in");
        await this.view.initializeAutoNumbers();

        this.view.showSuccess(
          `Produksi In berhasil disimpan dengan nomor ${produksiInNumber}!`
        );

        return true;
      }

      // Fallback untuk kategori lain (tidak seharusnya tercapai)
      throw new Error(`Kategori ${category} tidak didukung untuk In Submit`);
    } catch (error) {
      console.error("Error in handleInSubmit:", error);
      this.view.showError(`Gagal menyimpan data: ${error.message}`);
      throw error;
    }
  }

  async _refreshStockDisplay(category) {
    try {
      if (category === "banner") {
        await this.loadBannerInStockData();
        await this.loadBannerOutStockData();
      } else if (category === "digital") {
        await this.loadDigitalInStockData();
        await this.loadDigitalOutStockData();
      } else if (category === "produksi") {
        await this.loadProduksiInStockData();
        await this.loadProduksiOutStockData();
      }
    } catch (error) {
      console.error(`Error refreshing ${category} display:`, error);
      throw error;
    }
  }

  async handleOutSubmit(category, formData) {
    try {
      // Special handling untuk semua kategori Out - save ke Supabase
      if (category === "banner") {
        console.log("💾 Saving Banner Out to Supabase...");

        // Get next number khusus untuk Banner Out dari Supabase (sama seperti DailyReport)
        const bannerOutNumber = await this.model.getNextBannerOutNumber(
          formData.data.tanggal
        );
        formData.data.nomor = bannerOutNumber;

        // Save to Supabase banner_out_stock table
        const result = await this.model.saveBannerOutStockToSupabase(
          formData.data
        );
        console.log("✅ Banner Out saved to Supabase:", result);

        // Refresh display langsung dari Supabase
        await this.loadBannerOutStockData();

        // Reset form dan tampilkan pesan sukses
        this.view.resetForm(category, "out");
        await this.view.initializeAutoNumbers();

        this.view.showSuccess(
          `Banner Out berhasil disimpan dengan nomor ${bannerOutNumber}!`
        );

        return true;
      } else if (category === "digital") {
        console.log("💾 Saving Digital Out to Supabase...");

        // Get next number khusus untuk Digital Out dari Supabase (sama seperti DailyReport)
        const digitalOutNumber = await this.model.getNextDigitalOutNumber(
          formData.data.tanggal
        );
        formData.data.nomor = digitalOutNumber;

        // Save to Supabase digital_out_stock table
        const result = await this.model.saveDigitalOutStockToSupabase(
          formData.data
        );
        console.log("✅ Digital Out saved to Supabase:", result);

        // Refresh display langsung dari Supabase
        await this.loadDigitalOutStockData();

        // Reset form dan tampilkan pesan sukses
        this.view.resetForm(category, "out");
        await this.view.initializeAutoNumbers();

        this.view.showSuccess(
          `Digital Out berhasil disimpan dengan nomor ${digitalOutNumber}!`
        );

        return true;
      } else if (category === "produksi") {
        console.log("💾 Saving Produksi Out to Supabase...");

        // Get next number khusus untuk Produksi Out dari Supabase (sama seperti DailyReport)
        const produksiOutNumber = await this.model.getNextProduksiOutNumber(
          formData.data.tanggal
        );
        formData.data.nomor = produksiOutNumber;

        // Save to Supabase produksi_out_stock table
        const result = await this.model.saveProduksiOutStockToSupabase(
          formData.data
        );
        console.log("✅ Produksi Out saved to Supabase:", result);

        // Refresh display langsung dari Supabase
        await this.loadProduksiOutStockData();

        // Reset form dan tampilkan pesan sukses
        this.view.resetForm(category, "out");
        await this.view.initializeAutoNumbers();

        this.view.showSuccess(
          `Produksi Out berhasil disimpan dengan nomor ${produksiOutNumber}!`
        );

        return true;
      }

      // Fallback untuk kategori lain (tidak seharusnya tercapai)
      throw new Error(`Kategori ${category} tidak didukung untuk Out Submit`);
    } catch (error) {
      console.error("Error in handleOutSubmit:", error);
      this.view.showError(error.message);
      throw error;
    }
  }

  // Bind stock action handlers for edit and delete
  bindStockActionHandlers() {
    console.log("Binding stock action handlers...");

    // Bind edit handlers
    this.view.bindStockEditHandler(
      "banner-in",
      this.handleBannerInEdit.bind(this)
    );
    this.view.bindStockEditHandler(
      "banner-out",
      this.handleBannerOutEdit.bind(this)
    );
    this.view.bindStockEditHandler(
      "digital-in",
      this.handleDigitalInEdit.bind(this)
    );
    this.view.bindStockEditHandler(
      "digital-out",
      this.handleDigitalOutEdit.bind(this)
    );
    this.view.bindStockEditHandler(
      "produksi-in",
      this.handleProduksiInEdit.bind(this)
    );
    this.view.bindStockEditHandler(
      "produksi-out",
      this.handleProduksiOutEdit.bind(this)
    );

    // Bind save edit handlers
    this.view.bindStockSaveHandler(this.handleSaveInlineEdit.bind(this));

    // Bind cancel edit handlers
    this.view.bindStockCancelHandler(this.handleCancelInlineEdit.bind(this));

    // Bind delete handlers
    this.view.bindStockDeleteHandler(
      "banner-in",
      this.handleBannerInDelete.bind(this)
    );
    this.view.bindStockDeleteHandler(
      "banner-out",
      this.handleBannerOutDelete.bind(this)
    );
    this.view.bindStockDeleteHandler(
      "digital-in",
      this.handleDigitalInDelete.bind(this)
    );
    this.view.bindStockDeleteHandler(
      "digital-out",
      this.handleDigitalOutDelete.bind(this)
    );
    this.view.bindStockDeleteHandler(
      "produksi-in",
      this.handleProduksiInDelete.bind(this)
    );
    this.view.bindStockDeleteHandler(
      "produksi-out",
      this.handleProduksiOutDelete.bind(this)
    );

    console.log("Stock action handlers bound successfully");
  }

  // Handler untuk edit Banner In - simplified like RekapPresenter
  async handleBannerInEdit(id, type) {
    try {
      const row = document.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (!row) {
        this.view.showError("Row tidak ditemukan!");
        return;
      }

      this.view.toggleEditMode(row, true);
    } catch (error) {
      this.view.showError("Gagal masuk mode edit: " + error.message);
    }
  }

  // Handler untuk edit Banner Out - simplified like RekapPresenter
  async handleBannerOutEdit(id, type) {
    try {
      const row = document.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (!row) {
        this.view.showError("Row tidak ditemukan!");
        return;
      }

      this.view.toggleEditMode(row, true);
    } catch (error) {
      this.view.showError("Gagal masuk mode edit: " + error.message);
    }
  }

  // Handler untuk save inline edit - like RekapPresenter
  async handleSaveInlineEdit(id, type) {
    try {
      const row = document.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (!row) {
        this.view.showError("Row tidak ditemukan!");
        return;
      }

      const data = {};
      const inputs = row.querySelectorAll(".editable input, .editable select");

      inputs.forEach((input) => {
        const field = input.getAttribute("data-field");
        data[field] = input.value;
      });

      // Update data in appropriate store based on type
      if (type === "banner-in") {
        // Banner In - update di Supabase
        await this.model.updateBannerInStockInSupabase(id, data);
        console.log("✅ Banner In updated in Supabase");
      } else if (type === "banner-out") {
        // Banner Out - update di Supabase
        await this.model.updateBannerOutStockInSupabase(id, data);
        console.log("✅ Banner Out updated in Supabase");
      } else if (type === "digital-in") {
        // Digital In - update di Supabase
        await this.model.updateDigitalInStockInSupabase(id, data);
        console.log("✅ Digital In updated in Supabase");
      } else if (type === "digital-out") {
        // Digital Out - update di Supabase
        await this.model.updateDigitalOutStockInSupabase(id, data);
        console.log("✅ Digital Out updated in Supabase");
      } else if (type === "produksi-in") {
        // Produksi In - update di Supabase
        await this.model.updateProduksiInStockInSupabase(id, data);
        console.log("✅ Produksi In updated in Supabase");
      } else if (type === "produksi-out") {
        // Produksi Out - update di Supabase
        await this.model.updateProduksiOutStockInSupabase(id, data);
        console.log("✅ Produksi Out updated in Supabase");
      } else if (
        false || // Disable old logic
        type === "digital-out" ||
        type === "produksi-in" ||
        type === "produksi-out"
      ) {
        // Banner Out, Digital Out, Produksi In, and Produksi Out use transactions store
        await this.model.updateTransactionRecord(id, data);
      }

      // Exit edit mode first before refreshing (like RekapPresenter)
      this.view.toggleEditMode(row, false);

      this.view.showSuccess("Data berhasil diperbarui!");

      // Refresh the appropriate table after exiting edit mode
      if (type === "banner-in") {
        await this.loadBannerInStockData();
      } else if (type === "banner-out") {
        await this.loadBannerOutStockData();
      } else if (type === "digital-in") {
        await this.loadDigitalInStockData();
      } else if (type === "digital-out") {
        await this.loadDigitalOutStockData();
      } else if (type === "produksi-in") {
        await this.loadProduksiInStockData();
      } else if (type === "produksi-out") {
        await this.loadProduksiOutStockData();
      }
    } catch (error) {
      this.view.showError("Gagal menyimpan perubahan: " + error.message);
    }
  }

  // Handler untuk cancel inline edit
  handleCancelInlineEdit(id, type) {
    const row = document.querySelector(
      `tr[data-id="${id}"][data-type="${type}"]`
    );
    if (row) {
      this.view.toggleEditMode(row, false);
    }
  }

  // Handler untuk delete Banner In - simplified like RekapPresenter
  async handleBannerInDelete(id) {
    try {
      console.log("🗑️ Deleting Banner In:", id);

      // Delete from Supabase banner_in_stock table
      await this.model.deleteBannerInStockFromSupabase(id);
      this.view.showSuccess("Data Banner In berhasil dihapus!");
      await this.loadBannerInStockData();
      console.log("✅ Banner In deleted from Supabase and display refreshed");
    } catch (error) {
      console.error("❌ Error deleting Banner In:", error);
      this.view.showError("Gagal menghapus data Banner In");
    }
  }

  // Handler untuk delete Banner Out - updated untuk Supabase
  async handleBannerOutDelete(id) {
    try {
      console.log("🗑️ Deleting Banner Out:", id);

      // Delete from Supabase banner_out_stock table
      await this.model.deleteBannerOutStockFromSupabase(id);
      this.view.showSuccess("Data Banner Out berhasil dihapus!");
      await this.loadBannerOutStockData();
      console.log("✅ Banner Out deleted from Supabase and display refreshed");
    } catch (error) {
      console.error("❌ Error deleting Banner Out:", error);
      this.view.showError("Gagal menghapus data Banner Out");
    }
  }

  // Handler untuk edit Digital In
  async handleDigitalInEdit(id, type) {
    try {
      const row = document.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (row) {
        this.view.toggleEditMode(row, true);
      }
    } catch (error) {
      console.error("Error editing digital in:", error);
    }
  }

  // Handler untuk edit Digital Out
  async handleDigitalOutEdit(id, type) {
    try {
      const row = document.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (row) {
        this.view.toggleEditMode(row, true);
      }
    } catch (error) {
      console.error("Error editing digital out:", error);
    }
  }

  // Handler untuk delete Digital In - updated untuk Supabase
  async handleDigitalInDelete(id) {
    try {
      console.log("🗑️ Deleting Digital In:", id);

      // Delete from Supabase digital_in_stock table
      await this.model.deleteDigitalInStockFromSupabase(id);
      this.view.showSuccess("Data Digital In berhasil dihapus!");
      await this.loadDigitalInStockData();
      console.log("✅ Digital In deleted from Supabase and display refreshed");
    } catch (error) {
      console.error("❌ Error deleting Digital In:", error);
      this.view.showError("Gagal menghapus data Digital In");
    }
  }

  // Handler untuk delete Digital Out - updated untuk Supabase
  async handleDigitalOutDelete(id) {
    try {
      console.log("🗑️ Deleting Digital Out:", id);

      // Delete from Supabase digital_out_stock table
      await this.model.deleteDigitalOutStockFromSupabase(id);
      this.view.showSuccess("Data Digital Out berhasil dihapus!");
      await this.loadDigitalOutStockData();
      console.log("✅ Digital Out deleted from Supabase and display refreshed");
    } catch (error) {
      console.error("❌ Error deleting Digital Out:", error);
      this.view.showError("Gagal menghapus data Digital Out");
    }
  }

  // Handler untuk delete Produksi In - tambahan baru
  async handleProduksiInDelete(id) {
    try {
      console.log("🗑️ Deleting Produksi In:", id);

      // Delete from Supabase produksi_in_stock table
      await this.model.deleteProduksiInStockFromSupabase(id);
      this.view.showSuccess("Data Produksi In berhasil dihapus!");
      await this.loadProduksiInStockData();
      console.log("✅ Produksi In deleted from Supabase and display refreshed");
    } catch (error) {
      console.error("❌ Error deleting Produksi In:", error);
      this.view.showError("Gagal menghapus data Produksi In");
    }
  }

  // Handler untuk delete Produksi Out - tambahan baru
  async handleProduksiOutDelete(id) {
    try {
      console.log("🗑️ Deleting Produksi Out:", id);

      // Delete from Supabase produksi_out_stock table
      await this.model.deleteProduksiOutStockFromSupabase(id);
      this.view.showSuccess("Data Produksi Out berhasil dihapus!");
      await this.loadProduksiOutStockData();
      console.log(
        "✅ Produksi Out deleted from Supabase and display refreshed"
      );
    } catch (error) {
      console.error("❌ Error deleting Produksi Out:", error);
      this.view.showError("Gagal menghapus data Produksi Out");
    }
  }

  // Setup reset numbering handler for troubleshooting
  setupResetNumberingHandler() {
    document.addEventListener("reset-numbering", async () => {
      console.log("🔄 Resetting numbering sequences...");

      try {
        // Reset In Banner to start from 1
        await this.model.resetNumbering("banner", "in", 1);
        console.log("✅ In Banner numbering reset to start from 1");

        // Reset Out Banner to start from 1
        await this.model.resetNumbering("banner", "out", 1);
        console.log("✅ Out Banner numbering reset to start from 1");

        console.log("🎉 All numbering sequences reset completed!");

        // Reload data to reflect changes
        await this.loadBannerInStockData();
        await this.loadBannerOutStockData();
      } catch (error) {
        console.error("🚨 Error resetting numbering:", error);
      }
    });
  }

  // Handler untuk edit Produksi In
  async handleProduksiInEdit(id, type) {
    try {
      const row = document.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (row) {
        this.view.toggleEditMode(row, true);
      }
    } catch (error) {
      console.error("Error editing produksi in:", error);
    }
  }

  // Handler untuk edit Produksi Out
  async handleProduksiOutEdit(id, type) {
    try {
      const row = document.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (row) {
        this.view.toggleEditMode(row, true);
      }
    } catch (error) {
      console.error("Error editing produksi out:", error);
    }
  }

  // Handler untuk delete Produksi In
  async handleProduksiInDelete(id) {
    try {
      console.log("🗑️ Deleting Produksi In:", id);

      // Produksi In uses transactions store like Digital In
      await this.model.deleteTransactionRecord(id);
      this.view.showSuccess("Data Produksi In berhasil dihapus!");
      await this.loadProduksiInStockData();
      console.log("✅ Produksi In deleted and display refreshed");
    } catch (error) {
      console.error("❌ Error deleting Produksi In:", error);
      this.view.showError("Gagal menghapus data Produksi In");
    }
  }

  // Handler untuk delete Produksi Out
  async handleProduksiOutDelete(id) {
    try {
      console.log("🗑️ Deleting Produksi Out:", id);

      // Produksi Out uses transactions store like Digital Out
      await this.model.deleteTransactionRecord(id);
      this.view.showSuccess("Data Produksi Out berhasil dihapus!");
      await this.loadProduksiOutStockData();
      console.log("✅ Produksi Out deleted and display refreshed");
    } catch (error) {
      console.error("❌ Error deleting Produksi Out:", error);
      this.view.showError("Gagal menghapus data Produksi Out");
    }
  }
}
