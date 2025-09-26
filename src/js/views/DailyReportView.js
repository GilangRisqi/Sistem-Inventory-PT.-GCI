export class DailyReportView {
  constructor() {
    this.form = document.getElementById("daily-report-form");
    this.tanggal = document.getElementById("tanggal");
    this.shift = document.getElementById("shift");
    this.jamJalan = document.getElementById("jam-jalan");
    this.jamBerhenti = document.getElementById("jam-berhenti");
    this.hasilProduksi = document.getElementById("hasil-produksi");
    this.catatan = document.getElementById("catatan");
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
