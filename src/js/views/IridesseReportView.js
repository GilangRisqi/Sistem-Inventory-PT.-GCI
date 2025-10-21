import { sweetAlert } from "../utils/SweetAlertUtil.js";

export class IridesseReportView {
  constructor() {
    this.form = document.getElementById("iridesse-form");
    this.totalCetakDisplay = document.getElementById("total-cetak");
    this.billingInput = document.getElementById("billing");
    this.gapInput = document.getElementById("gap");

    if (this.form) {
      this.initializeEventListeners();
    }
  }

  bindSaveReport(handler) {
    this.saveHandler = handler;
  }

  initializeEventListeners() {
    const jumlahCetakInput = this.form.querySelector("#jumlah-cetak");
    const ngInput = this.form.querySelector("#ng");

    const updateTotalCetak = () => {
      const jumlahCetak = Number(jumlahCetakInput.value) || 0;
      const ng = Number(ngInput.value) || 0;

      // Hitung total cetak (jumlah cetak - NG) - hanya auto calculate ini saja
      const totalCetak = Math.max(0, jumlahCetak - ng);
      this.totalCetakDisplay.textContent = totalCetak.toLocaleString();
    };

    // Add event listeners hanya untuk total cetak (sisanya manual input)
    jumlahCetakInput.addEventListener("input", updateTotalCetak);
    ngInput.addEventListener("input", updateTotalCetak);

    // Handle form submission
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(this.form);
      const data = {
        tanggal: formData.get("tanggal"),
        startBilling: formData.get("startBilling"),
        noSpk: formData.get("noSpk"),
        namaClient: formData.get("namaClient"),
        namaPekerjaan: formData.get("namaPekerjaan"),
        jenisKertas: formData.get("jenisKertas"),
        ukuranKertas: formData.get("ukuranKertas"),
        jenisPrint: formData.get("jenisPrint"),
        jumlahCetak: Number(formData.get("jumlahCetak")),
        ng: Number(formData.get("ng")),
        timeStart: formData.get("timeStart"),
        timeFinish: formData.get("timeFinish"),
        finishBilling: formData.get("finishBilling"),
        billing: Number(formData.get("billing")), // Ambil dari input manual
        gap: Number(formData.get("gap")), // Ambil dari input manual
        totalCetak: Number(
          this.totalCetakDisplay.textContent.replace(/,/g, "")
        ),
        status: formData.get("status"),
      };

      // Call the save handler if available
      if (this.saveHandler) {
        this.saveHandler(data);
      }

      // Reset form setelah submit
      this.form.reset();
      updateTotalCetak();
    });
  }

  showSuccess(message) {
    sweetAlert.dataSuccess("save", message || "Data berhasil disimpan!");
  }

  showError(message) {
    sweetAlert.error("Error: " + message, "Error");
  }
}
