class IridesseReportView {
  constructor() {
    this.form = document.getElementById("iridesse-form");
    this.totalCetakDisplay = document.getElementById("total-cetak");
    this.billingDisplay = document.getElementById("billing");
    this.gapDisplay = document.getElementById("gap");

    if (this.form) {
      this.initializeEventListeners();
    }
  }

  initializeEventListeners() {
    const jumlahCetakInput = this.form.querySelector("#jumlah-cetak");
    const ngInput = this.form.querySelector("#ng");
    const startBillingInput = this.form.querySelector("#start-billing");
    const finishBillingInput = this.form.querySelector("#finish-billing");

    const updateTotals = () => {
      const jumlahCetak = Number(jumlahCetakInput.value) || 0;
      const ng = Number(ngInput.value) || 0;
      const startBilling = Number(startBillingInput.value) || 0;
      const finishBilling = Number(finishBillingInput.value) || 0;

      // Hitung total cetak (jumlah cetak - NG)
      const totalCetak = Math.max(0, jumlahCetak - ng);
      this.totalCetakDisplay.textContent = totalCetak.toLocaleString();

      // Hitung billing (finish billing - start billing)
      const billing = Math.max(0, finishBilling - startBilling);
      this.billingDisplay.textContent = billing.toLocaleString();

      // Hitung gap (total cetak - billing)
      const gap = totalCetak - billing;
      this.gapDisplay.textContent = gap.toLocaleString();

      // Tambahkan class untuk menunjukkan gap positif atau negatif
      this.gapDisplay.className =
        "total-display " + (gap < 0 ? "negative" : gap > 0 ? "positive" : "");
    };

    // Add event listeners untuk setiap input yang mempengaruhi perhitungan
    jumlahCetakInput.addEventListener("input", updateTotals);
    ngInput.addEventListener("input", updateTotals);
    startBillingInput.addEventListener("input", updateTotals);
    finishBillingInput.addEventListener("input", updateTotals);

    // Handle form submission
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(this.form);
      const data = {
        tanggal: formData.get("tanggal"),
        startBilling: formData.get("startBilling"),
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
        totalCetak: Number(
          this.totalCetakDisplay.textContent.replace(/,/g, "")
        ),
        billing: Number(this.billingDisplay.textContent.replace(/,/g, "")),
        gap: Number(this.gapDisplay.textContent.replace(/,/g, "")),
        status: formData.get("status"),
      };

      // Disini bisa ditambahkan kode untuk menyimpan data ke server
      console.log("Form submitted:", data);

      // Reset form setelah submit
      this.form.reset();
      updateTotals();
    });
  }
}

// Initialize the view
document.addEventListener("DOMContentLoaded", () => {
  new IridesseReportView();
});
