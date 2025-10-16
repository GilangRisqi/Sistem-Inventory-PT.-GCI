export class DailyReportView {
  constructor() {
    this.form = document.getElementById("daily-report-form");
    this.totalQtyOk = document.getElementById("total-qty-ok");
    this.totalQtyNg = document.getElementById("total-qty-ng");
    this.totalQtyAll = document.getElementById("total-qty-all");

    if (this.form) {
      this.initializeEventListeners();
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

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(this.form);
      const data = {
        nomor: Number(formData.get("nomor")),
        tanggal: formData.get("tanggal"),
        qtyPo: Number(formData.get("qty-po")),
        satuan: formData.get("satuan"),
        jenisBahan: formData.get("jenis-bahan"),
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
    });
  }

  showSuccess(message) {
    alert(message || "Data berhasil disimpan!");
  }

  showError(message) {
    alert("Error: " + message);
  }
}
