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

      this.totalQtyOk.textContent = qtyOk.toLocaleString();
      this.totalQtyNg.textContent = qtyNg.toLocaleString();
      this.totalQtyAll.textContent = total.toLocaleString();
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
        totalQtyCetakOk: Number(this.totalQtyOk.textContent.replace(/,/g, "")),
        totalQtyCetakNg: Number(this.totalQtyNg.textContent.replace(/,/g, "")),
        totalQtyCetakAll: Number(
          this.totalQtyAll.textContent.replace(/,/g, "")
        ),
      };

      // Call the save handler if available
      if (this.saveHandler) {
        this.saveHandler(data);
      }

      // Reset form setelah submit
      this.form.reset();
      updateTotals();
    });
  }

  showSuccess(message) {
    alert(message || "Data berhasil disimpan!");
  }

  showError(message) {
    alert("Error: " + message);
  }
}
