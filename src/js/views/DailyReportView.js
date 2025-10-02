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

      // Disini bisa ditambahkan kode untuk menyimpan data ke server
      console.log("Form submitted:", data);

      // Reset form setelah submit
      this.form.reset();
      updateTotals();
    });
  }

  bindSubmit(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({
        tanggal: this.tanggal.value,
        shift: this.shift.value,
        jamJalan: Number(this.jamJalan.value),
        jamBerhenti: Number(this.jamBerhenti.value),
        hasilProduksi: Number(this.hasilProduksi.value),
        catatan: this.catatan.value,
      });
    });
  }

  reset() {
    this.form.reset();
  }

  showSuccess(message) {
    alert(message);
  }

  showError(message) {
    alert(message);
  }
}
