import { sweetAlert } from "../utils/SweetAlertUtil.js";

export class DailyReportView {
  constructor() {
    this.form = document.getElementById("daily-report-form");
    this.totalQtyOk = document.getElementById("total-qty-ok");
    this.totalQtyNg = document.getElementById("total-qty-ng");
    this.totalQtyAll = document.getElementById("total-qty-all");

    if (this.form) {
      this.initializeEventListeners();

      // Auto-generate nomor when form loads (like banner forms)
      this.initializeAutoNumber();
    }
  }

  // Helper function untuk format angka yang konsisten dengan format Indonesia (titik sebagai pemisah ribuan)
  formatNumber(number) {
    const num = Number(number) || 0;
    return num.toLocaleString("id-ID"); // Menggunakan format Indonesia yang konsisten
  }

  // Helper function untuk parse angka dari text yang sudah diformat
  parseFormattedNumber(formattedText) {
    if (!formattedText) return 0;
    // Handle both comma and dot as thousand separator
    const cleanText = String(formattedText).replace(/[.,]/g, "");
    return Number(cleanText) || 0;
  }

  bindSaveReport(handler) {
    this.saveHandler = handler;
  }

  initializeEventListeners() {
    const qtyOkInput = this.form.querySelector("#qty-cetak-ok");
    const qtyNgInput = this.form.querySelector("#qty-cetak-ng");

    const updateTotals = () => {
      const qtyOk = Number(qtyOkInput.value) || 0;
      const qtyNg = Number(qtyNgInput.value) || 0;
      const total = qtyOk + qtyNg;

      this.totalQtyOk.textContent = this.formatNumber(qtyOk);
      this.totalQtyNg.textContent = this.formatNumber(qtyNg);
      this.totalQtyAll.textContent = this.formatNumber(total);

      // Store raw numbers in data attributes for easy access
      this.totalQtyOk.setAttribute("data-value", qtyOk);
      this.totalQtyNg.setAttribute("data-value", qtyNg);
      this.totalQtyAll.setAttribute("data-value", total);
    };

    qtyOkInput.addEventListener("input", updateTotals);
    qtyNgInput.addEventListener("input", updateTotals);

    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(this.form);
      const data = {
        nomor: Number(formData.get("nomor")),
        tanggal: formData.get("tanggal"),
        qtyPo: Number(formData.get("qty-po")),
        satuan: formData.get("satuan"),
        jenisBahan: formData.get("jenis-bahan"),
        jenisPrint: formData.get("jenis-print"),
        jenisPekerjaan: formData.get("jenis-pekerjaan"),
        client: formData.get("client"),
        spesifikasi: formData.get("spesifikasi"),
        qtyCetakOk: Number(formData.get("qty-cetak-ok")),
        qtyCetakNg: Number(formData.get("qty-cetak-ng")),
        satuanCetak: formData.get("satuan-cetak"),
        waktuStart: formData.get("waktu-start"),
        waktuFinish: formData.get("waktu-finish"),
        noSpk: formData.get("no-spk"),
        keterangan: formData.get("keterangan"),
        totalQtyCetakOk:
          Number(this.totalQtyOk.getAttribute("data-value")) || 0,
        totalQtyCetakNg:
          Number(this.totalQtyNg.getAttribute("data-value")) || 0,
        totalQtyCetakAll:
          Number(this.totalQtyAll.getAttribute("data-value")) || 0,
      };

      // Call the save handler if available
      if (this.saveHandler) {
        this.saveHandler(data);
      }

      // Reset form setelah submit
      this.form.reset();
      updateTotals(); // This will reset the totals and data-attributes

      // Auto-generate nomor untuk entri berikutnya
      await this.initializeAutoNumber();
    });
  }

  // Initialize auto number on form load (like banner forms)
  async initializeAutoNumber() {
    console.log("🔢 Initializing auto number...");

    // Set current date as default
    const tanggalInput = document.getElementById("tanggal");
    if (tanggalInput && !tanggalInput.value) {
      const today = new Date().toISOString().split("T")[0];
      tanggalInput.value = today;
      console.log("📅 Set default date:", today);
    }

    // Generate auto number with a small delay to ensure database is ready
    setTimeout(async () => {
      await this.autoGenerateNomor();
    }, 100);
  }

  // Auto-generate nomor based on current month (like banner logic)
  async autoGenerateNomor() {
    console.log("🔄 Auto-generating nomor...");
    try {
      const nextNomor = await this.getNextNomor();
      console.log("✅ Got next nomor from database:", nextNomor);
      this.setAutoNomor(nextNomor);
    } catch (error) {
      console.error("❌ Error generating auto nomor:", error);
      this.setAutoNomor(1);
    }
  }

  // Get next nomor from model
  async getNextNomor() {
    // Dispatch event to get next nomor from presenter
    return new Promise((resolve) => {
      const event = new CustomEvent("dailyReportGetNextNomor", {
        detail: {
          callback: resolve,
        },
      });
      document.dispatchEvent(event);
    });
  }

  // Set auto-generated nomor
  setAutoNomor(nomor) {
    console.log("🎯 Setting auto nomor to:", nomor);
    const nomorInput = document.getElementById("nomor");
    if (nomorInput) {
      nomorInput.value = nomor;
      console.log("✅ Nomor input updated to:", nomorInput.value);
    } else {
      console.error("❌ Nomor input element not found!");
    }
  }

  showSuccess(message) {
    sweetAlert.dataSuccess("save", message || "Data berhasil disimpan!");
  }

  showError(message) {
    sweetAlert.error("Error: " + message, "Error");
  }
}
