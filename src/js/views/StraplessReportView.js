export class StraplessReportView {
  constructor() {
    this.form = document.getElementById("strapless-report-form");
    this.section = document.getElementById("strapless-report-section");

    // Form elements
    this.nomorInput = document.getElementById("strapless-nomor");
    this.tanggalInput = document.getElementById("strapless-tanggal");
    this.operatorInput = document.getElementById("strapless-operator");
    this.jenisPekerjaanInput = document.getElementById(
      "strapless-jenis-pekerjaan"
    );
    this.timeStartInput = document.getElementById("strapless-time-start");
    this.timeFinishInput = document.getElementById("strapless-time-finish");
    this.qtyOkInput = document.getElementById("strapless-qty-ok");
    this.qtyNgInput = document.getElementById("strapless-qty-ng");
    this.satuanSelect = document.getElementById("strapless-satuan");
    this.prosesSelanjutnyaInput = document.getElementById(
      "strapless-proses-selanjutnya"
    );
    this.keteranganInput = document.getElementById("strapless-keterangan");

    // Total displays
    this.totalQtyOkDisplay = document.getElementById("strapless-total-qty-ok");
    this.totalQtyNgDisplay = document.getElementById("strapless-total-qty-ng");
    this.totalQtyAllDisplay = document.getElementById(
      "strapless-total-qty-all"
    );

    this.init();
  }

  init() {
    if (!this.form) {
      console.error("❌ Strapless report form not found!");
      return;
    }

    // Set default date to today
    if (this.tanggalInput) {
      this.tanggalInput.value = new Date().toISOString().split("T")[0];
    }

    // Add event listeners
    this.attachEventListeners();
    this.updateTotals();

    console.log("✅ StraplessReportView initialized");
  }

  attachEventListeners() {
    // Form submission
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }

    // Real-time total calculation
    if (this.qtyOkInput) {
      this.qtyOkInput.addEventListener("input", () => this.updateTotals());
    }
    if (this.qtyNgInput) {
      this.qtyNgInput.addEventListener("input", () => this.updateTotals());
    }

    // Auto-increment nomor when date changes
    if (this.tanggalInput) {
      this.tanggalInput.addEventListener("change", () => this.generateNomor());
    }
  }

  handleFormSubmit() {
    try {
      const formData = this.getFormData();

      if (this.addStraplessReportHandler) {
        this.addStraplessReportHandler(formData);
      }
    } catch (error) {
      console.error("❌ Error handling form submit:", error);
      this.showError("Terjadi kesalahan saat menyimpan data");
    }
  }

  getFormData() {
    return {
      nomor: this.nomorInput?.value || 0,
      tanggal: this.tanggalInput?.value,
      operator: this.operatorInput?.value?.trim(),
      jenisPekerjaan: this.jenisPekerjaanInput?.value?.trim(),
      timeStart: this.timeStartInput?.value,
      timeFinish: this.timeFinishInput?.value,
      qtyOk: parseInt(this.qtyOkInput?.value) || 0,
      qtyNg: parseInt(this.qtyNgInput?.value) || 0,
      satuan: this.satuanSelect?.value,
      prosesSelanjutnya: this.prosesSelanjutnyaInput?.value?.trim(),
      keterangan: this.keteranganInput?.value?.trim(),
    };
  }

  updateTotals() {
    const qtyOk = parseInt(this.qtyOkInput?.value) || 0;
    const qtyNg = parseInt(this.qtyNgInput?.value) || 0;
    const totalAll = qtyOk + qtyNg;

    if (this.totalQtyOkDisplay) {
      this.totalQtyOkDisplay.textContent = this.formatNumber(qtyOk);
    }
    if (this.totalQtyNgDisplay) {
      this.totalQtyNgDisplay.textContent = this.formatNumber(qtyNg);
    }
    if (this.totalQtyAllDisplay) {
      this.totalQtyAllDisplay.textContent = this.formatNumber(totalAll);
    }
  }

  generateNomor() {
    // Simple auto-increment based on current date
    const today = new Date().toISOString().split("T")[0];
    const selectedDate = this.tanggalInput?.value;

    if (selectedDate === today && this.nomorInput) {
      // You could implement more sophisticated numbering here
      const randomNomor = Math.floor(Math.random() * 1000) + 1;
      this.nomorInput.value = randomNomor;
    }
  }

  // Format number with Indonesian locale
  formatNumber(number) {
    const num = Number(number) || 0;
    return num.toLocaleString("id-ID");
  }

  clearForm() {
    if (!this.form) return;

    // Reset all form fields
    this.form.reset();

    // Set default values
    if (this.tanggalInput) {
      this.tanggalInput.value = new Date().toISOString().split("T")[0];
    }
    if (this.satuanSelect) {
      this.satuanSelect.selectedIndex = 0;
    }

    // Update totals
    this.updateTotals();

    // Generate new nomor
    this.generateNomor();

    console.log("✅ Strapless report form cleared");
  }

  // Bind handlers
  bindAddStraplessReport(handler) {
    this.addStraplessReportHandler = handler;
  }

  bindEditRecord(handler) {
    this.editHandler = handler;
  }

  bindSaveRecord(handler) {
    this.saveHandler = handler;
  }

  bindCancelEdit(handler) {
    this.cancelHandler = handler;
  }

  bindDeleteRecord(handler) {
    this.deleteHandler = handler;
  }

  // Show success message
  showSuccess(message) {
    // Create a simple toast notification
    const toast = document.createElement("div");
    toast.className = "alert alert-success position-fixed";
    toast.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    toast.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="bi bi-check-circle-fill me-2"></i>
        <div>${message}</div>
        <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = "1";
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = "0";
        setTimeout(() => {
          if (toast.parentElement) {
            toast.remove();
          }
        }, 300);
      }
    }, 5000);

    console.log("✅ Success:", message);
  }

  // Show error message
  showError(message) {
    // Create a simple toast notification
    const toast = document.createElement("div");
    toast.className = "alert alert-danger position-fixed";
    toast.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    toast.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <div>${message}</div>
        <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = "1";
    }, 100);

    // Auto remove after 7 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = "0";
        setTimeout(() => {
          if (toast.parentElement) {
            toast.remove();
          }
        }, 300);
      }
    }, 7000);

    console.error("❌ Error:", message);
  }

  // Populate form with data (for editing)
  populateForm(data) {
    if (!data) return;

    try {
      if (this.nomorInput) this.nomorInput.value = data.nomor || "";
      if (this.tanggalInput) this.tanggalInput.value = data.tanggal || "";
      if (this.operatorInput) this.operatorInput.value = data.operator || "";
      if (this.jenisPekerjaanInput)
        this.jenisPekerjaanInput.value = data.jenisPekerjaan || "";
      if (this.timeStartInput) this.timeStartInput.value = data.timeStart || "";
      if (this.timeFinishInput)
        this.timeFinishInput.value = data.timeFinish || "";
      if (this.qtyOkInput) this.qtyOkInput.value = data.qtyOk || 0;
      if (this.qtyNgInput) this.qtyNgInput.value = data.qtyNg || 0;
      if (this.satuanSelect) this.satuanSelect.value = data.satuan || "PCS";
      if (this.prosesSelanjutnyaInput)
        this.prosesSelanjutnyaInput.value = data.prosesSelanjutnya || "";
      if (this.keteranganInput)
        this.keteranganInput.value = data.keterangan || "";

      this.updateTotals();

      console.log("✅ Form populated with data:", data);
    } catch (error) {
      console.error("❌ Error populating form:", error);
      this.showError("Gagal mengisi form dengan data");
    }
  }

  // Validate form data
  validateForm() {
    const data = this.getFormData();
    const errors = [];

    if (!data.nomor) errors.push("Nomor harus diisi");
    if (!data.tanggal) errors.push("Tanggal harus diisi");
    if (!data.operator?.trim()) errors.push("Operator harus diisi");
    if (!data.jenisPekerjaan?.trim())
      errors.push("Jenis Pekerjaan harus diisi");
    if (!data.timeStart) errors.push("Time Start harus diisi");
    if (!data.timeFinish) errors.push("Time Finish harus diisi");
    if (data.qtyOk < 0) errors.push("QTY OK tidak boleh negatif");
    if (data.qtyNg < 0) errors.push("QTY NG tidak boleh negatif");
    if (!data.satuan) errors.push("Satuan harus dipilih");

    // Validate time format
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (data.timeStart && !timeRegex.test(data.timeStart)) {
      errors.push("Format Time Start tidak valid");
    }
    if (data.timeFinish && !timeRegex.test(data.timeFinish)) {
      errors.push("Format Time Finish tidak valid");
    }

    // Validate date
    if (data.tanggal) {
      const date = new Date(data.tanggal);
      if (isNaN(date.getTime())) {
        errors.push("Format tanggal tidak valid");
      }
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  // Show section
  show() {
    if (this.section) {
      this.section.style.display = "block";
    }
  }

  // Hide section
  hide() {
    if (this.section) {
      this.section.style.display = "none";
    }
  }
}
