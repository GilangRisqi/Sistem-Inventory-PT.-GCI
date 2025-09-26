export class RekapView {
  constructor() {
    this.generateBtn = document.getElementById("generate-rekap");
    this.tipeSelect = document.getElementById("rekap-tipe");
    this.periodeInput = document.getElementById("rekap-periode");
    this.tableContainer = document.querySelector(".table-container");
  }

  bindGenerateRekap(handler) {
    this.generateBtn.addEventListener("click", () => {
      const periode = this.periodeInput.value;
      if (!periode) {
        this.showError("Pilih periode terlebih dahulu!");
        return;
      }

      const [year, month] = periode.split("-");
      handler({
        tipe: this.tipeSelect.value,
        startDate: new Date(year, month - 1, 1),
        endDate: new Date(year, month, 0),
      });
    });
  }

  displayTable(data, tipe) {
    let html = "";

    if (tipe === "bahan-baku") {
      html = this.generateBahanBakuTable(data);
    } else {
      html = this.generateDailyReportTable(data);
    }

    this.tableContainer.innerHTML = html;
  }

  generateBahanBakuTable(data) {
    return `
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Jenis Bahan</th>
                        <th>Stok Masuk</th>
                        <th>Pemakaian</th>
                        <th>Sisa</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                      .map(
                        (item) => `
                        <tr>
                            <td>${new Date(item.tanggal).toLocaleDateString(
                              "id-ID"
                            )}</td>
                            <td>${item.jenisBahan}</td>
                            <td>${item.stokMasuk}</td>
                            <td>${item.pemakaian}</td>
                            <td>${item.sisa}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        `;
  }

  generateDailyReportTable(data) {
    return `
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Shift</th>
                        <th>Jam Jalan</th>
                        <th>Jam Berhenti</th>
                        <th>Hasil Produksi</th>
                        <th>Catatan</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                      .map(
                        (item) => `
                        <tr>
                            <td>${new Date(item.tanggal).toLocaleDateString(
                              "id-ID"
                            )}</td>
                            <td>${item.shift}</td>
                            <td>${item.jamJalan}</td>
                            <td>${item.jamBerhenti}</td>
                            <td>${item.hasilProduksi}</td>
                            <td>${item.catatan || "-"}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        `;
  }

  showError(message) {
    alert(message);
  }
}
