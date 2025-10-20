class LipatReportView {
  constructor() {
    this.form = document.getElementById("lipat-report-form");
    this.section = document.getElementById("lipat-report-section");

    console.log("🚀 LipatReportView constructor - form found:", !!this.form);

    if (this.form) {
      this.initializeEventListeners();

      // Auto-generate nomor when form loads (like banner forms)
      this.initializeAutoNumber();
    } else {
      console.warn("⚠️ LipatReportView: Form not found during construction");
    }

    // Listen for section activation to refresh auto numbering
    document.addEventListener("section-activated", (event) => {
      if (event.detail.sectionId === "lipat-report") {
        console.log(
          "🎯 LipatReportView: Section activated, refreshing auto number"
        );
        setTimeout(() => {
          this.initializeAutoNumber();
        }, 100);
      }
    });
  }

  initializeEventListeners() {
    if (this.form) {
      // Form submission
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });

      // Real-time total calculation
      const qtyOkInput = document.getElementById("lipat-qty-ok");
      const qtyNgInput = document.getElementById("lipat-qty-ng");

      if (qtyOkInput && qtyNgInput) {
        qtyOkInput.addEventListener("input", () => this.updateTotals());
        qtyNgInput.addEventListener("input", () => this.updateTotals());
      }
    }
  }

  // Handle form submission
  handleFormSubmit() {
    const formData = this.getFormData();

    if (this.validateForm(formData)) {
      // Call the save handler if available (like DailyReportView pattern)
      if (this.saveHandler) {
        this.saveHandler(formData);
      }

      // Reset form setelah submit
      this.form.reset();
      this.updateTotals(); // This will reset the totals

      // Auto-generate nomor untuk entri berikutnya
      this.initializeAutoNumber();
    }
  }

  // Get form data
  getFormData() {
    const formData = new FormData(this.form);
    const data = {
      nomor: Number(formData.get("nomor")),
      tanggal: formData.get("tanggal"),
      operator: formData.get("operator"),
      jenisPekerjaan: formData.get("jenisPekerjaan"),
      client: formData.get("client"),
      produk: formData.get("produk"),
      terimaDari: formData.get("terimaDari"),
      timeStart: formData.get("timeStart"),
      timeFinish: formData.get("timeFinish"),
      qtyOk: Number(formData.get("qtyOk")),
      qtyNg: Number(formData.get("qtyNg")),
      satuan: formData.get("satuan"),
      prosesSelanjutnya: formData.get("prosesSelanjutnya"),
      keterangan: formData.get("keterangan"),
    };

    return data;
  }

  // Validate form data
  validateForm(data) {
    const requiredFields = [
      { key: "nomor", label: "No." },
      { key: "tanggal", label: "Hari/Tanggal" },
      { key: "operator", label: "Operator" },
      { key: "jenisPekerjaan", label: "Jenis Pekerjaan" },
      { key: "client", label: "Client" },
      { key: "produk", label: "Produk" },
      { key: "terimaDari", label: "Terima Dari" },
      { key: "timeStart", label: "Time Start" },
      { key: "timeFinish", label: "Time Finish" },
      { key: "qtyOk", label: "QTY OK" },
      { key: "qtyNg", label: "QTY NG" },
      { key: "satuan", label: "Satuan" },
      { key: "prosesSelanjutnya", label: "Proses Selanjutnya" },
    ];

    for (let field of requiredFields) {
      if (!data[field.key] && data[field.key] !== "0") {
        this.showToast(`${field.label} harus diisi`, "error");
        return false;
      }
    }

    // Validate time range
    if (data.timeStart && data.timeFinish) {
      const startTime = new Date(`2000-01-01T${data.timeStart}`);
      const finishTime = new Date(`2000-01-01T${data.timeFinish}`);

      if (finishTime <= startTime) {
        this.showToast(
          "Time Finish harus lebih besar dari Time Start",
          "error"
        );
        return false;
      }
    }

    // Validate quantities
    const qtyOk = parseInt(data.qtyOk) || 0;
    const qtyNg = parseInt(data.qtyNg) || 0;

    if (qtyOk < 0 || qtyNg < 0) {
      this.showToast("QTY tidak boleh negatif", "error");
      return false;
    }

    return true;
  }

  // Update real-time totals
  updateTotals() {
    const qtyOk = parseInt(document.getElementById("lipat-qty-ok").value) || 0;
    const qtyNg = parseInt(document.getElementById("lipat-qty-ng").value) || 0;
    const total = qtyOk + qtyNg;

    document.getElementById("lipat-total-qty-ok").textContent = qtyOk;
    document.getElementById("lipat-total-qty-ng").textContent = qtyNg;
    document.getElementById("lipat-total-qty-all").textContent = total;
  }

  // Initialize auto number on form load (like banner forms)
  async initializeAutoNumber() {
    console.log("🔢 Lipat: Initializing auto nomor...");

    // Set current date as default
    const tanggalInput = document.getElementById("lipat-tanggal");
    if (tanggalInput && !tanggalInput.value) {
      const today = new Date().toISOString().split("T")[0];
      tanggalInput.value = today;
      console.log("📅 Lipat: Set default date:", today);
    }

    // Generate auto number with a small delay to ensure database is ready
    setTimeout(async () => {
      await this.autoGenerateNomor();
    }, 100);
  }

  // Auto-generate nomor based on current month (like banner logic)
  async autoGenerateNomor() {
    console.log("🔄 Lipat: Auto-generating nomor...");
    try {
      const nextNomor = await this.getNextNomor();
      console.log("✅ Lipat: Got next nomor from database:", nextNomor);
      this.setAutoNomor(nextNomor);
    } catch (error) {
      console.error("❌ Lipat: Error generating auto nomor:", error);
      this.setAutoNomor(1);
    }
  }

  // Get next nomor from model
  async getNextNomor() {
    // Dispatch event to get next nomor from presenter
    return new Promise((resolve) => {
      const event = new CustomEvent("lipatReportGetNextNomor", {
        detail: {
          callback: resolve,
        },
      });
      document.dispatchEvent(event);
    });
  }

  // Set auto-generated nomor
  setAutoNomor(nomor) {
    console.log("🎯 Lipat: Setting auto nomor to:", nomor);
    const nomorInput = document.getElementById("lipat-nomor");
    if (nomorInput) {
      nomorInput.value = nomor;
      console.log("✅ Lipat: Nomor input updated to:", nomorInput.value);
    } else {
      console.error("❌ Lipat: Nomor input element not found!");
    }
  }

  // Clear form
  clearForm() {
    this.form.reset();
    this.updateTotals();
  }

  // Populate form for editing
  populateForm(data) {
    Object.keys(data).forEach((key) => {
      const input = document.getElementById(
        `lipat-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
      );
      if (input) {
        if (input.type === "number") {
          input.value = data[key] || 0;
        } else {
          input.value = data[key] || "";
        }
      }
    });

    // Update totals after populating
    this.updateTotals();

    // Store edit ID for update
    this.editId = data.id;
  }

  // Show toast notification
  showToast(message, type = "info") {
    // Remove existing toast if any
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
      existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Style the toast
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: opacity 0.3s ease;
    `;

    // Set background color based on type
    switch (type) {
      case "success":
        toast.style.backgroundColor = "#10b981";
        break;
      case "error":
        toast.style.backgroundColor = "#ef4444";
        break;
      case "warning":
        toast.style.backgroundColor = "#f59e0b";
        break;
      default:
        toast.style.backgroundColor = "#3b82f6";
    }

    document.body.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  // Show success message
  showSuccess(message) {
    this.showToast(message, "success");
  }

  // Show error message
  showError(message) {
    this.showToast(message, "error");
  }

  // Show/hide section
  show() {
    if (this.section) {
      this.section.style.display = "block";
    }
  }

  hide() {
    if (this.section) {
      this.section.style.display = "none";
    }
  }

  // Get current edit ID
  getEditId() {
    return this.editId;
  }

  // Clear edit ID
  clearEditId() {
    this.editId = null;
  }

  // Format date for display
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Format time for display
  formatTime(timeString) {
    return timeString;
  }

  // Bind save report handler
  bindSaveReport(handler) {
    this.saveHandler = handler;
  }

  // Show success message
  showSuccess(message) {
    alert(message || "Data berhasil disimpan!");
  }

  // Show error message
  showError(message) {
    alert("Error: " + message);
  }

  // Public method to trigger auto numbering from outside
  refreshAutoNumber() {
    console.log("🔄 LipatReportView: Manual refresh auto number triggered");
    this.initializeAutoNumber();
  }
}

export { LipatReportView };
