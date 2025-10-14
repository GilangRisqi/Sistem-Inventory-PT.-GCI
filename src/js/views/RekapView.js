// Import jsPDF for PDF generation
import jsPDF from "jspdf";
import "jspdf-autotable";

export class RekapView {
  constructor() {
    this.generateBtn = document.getElementById("generate-rekap");
    this.tipeSelect = document.getElementById("rekap-tipe");
    this.periodeInput = document.getElementById("rekap-periode");
    this.tableContainer = document.querySelector(".table-container");
    this.currentData = []; // Store current table data for PDF generation
    this.currentType = ""; // Store current table type
  }

  formatDateForInput(dateValue) {
    if (!dateValue) return "";

    let date;
    if (dateValue instanceof Date) {
      date = dateValue;
    } else {
      date = new Date(dateValue);
    }

    if (isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Tanggal</th>
                        <th>Qty PO</th>
                        <th>Jenis Bahan</th>
                        <th>Jenis Pekerjaan</th>
                        <th>Client</th>
                        <th>Spesifikasi</th>
                        <th>Qty Cetak OK</th>
                        <th>Qty Cetak NG</th>
                        <th>Total Qty</th>
                        <th>Satuan Cetak</th>
                        <th>Waktu Start</th>
                        <th>Waktu Finish</th>
                        <th>No. SPK</th>
                        <th>Keterangan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                      .map(
                        (item) => `
                        <tr data-id="${
                          item.id
                        }" data-type="daily-report" class="table-row">
                            <td class="editable" data-field="nomor" data-type="text" data-value="${
                              item.nomor || ""
                            }">${item.nomor || "-"}</td>
                            <td class="editable" data-field="tanggal" data-type="date" data-value="${this.formatDateForInput(
                              item.tanggal
                            )}">${new Date(item.tanggal).toLocaleDateString(
                          "id-ID"
                        )}</td>
                            <td class="editable" data-field="qtyPo" data-type="number" data-value="${
                              item.qtyPo || 0
                            }">${(item.qtyPo || 0).toLocaleString()}</td>
                            <td class="editable" data-field="jenisBahan" data-type="text" data-value="${
                              item.jenisBahan || ""
                            }">${item.jenisBahan || "-"}</td>
                            <td class="editable" data-field="jenisPekerjaan" data-type="text" data-value="${
                              item.jenisPekerjaan || ""
                            }">${item.jenisPekerjaan || "-"}</td>
                            <td class="editable" data-field="client" data-type="text" data-value="${
                              item.client || ""
                            }">${item.client || "-"}</td>
                            <td class="editable" data-field="spesifikasi" data-type="text" data-value="${
                              item.spesifikasi || ""
                            }">${item.spesifikasi || "-"}</td>
                            <td class="editable" data-field="qtyCetakOk" data-type="number" data-value="${
                              item.qtyCetakOk || 0
                            }">${(item.qtyCetakOk || 0).toLocaleString()}</td>
                            <td class="editable" data-field="qtyCetakNg" data-type="number" data-value="${
                              item.qtyCetakNg || 0
                            }">${(item.qtyCetakNg || 0).toLocaleString()}</td>
                            <td class="non-editable"><strong>${(
                              item.totalQtyCetakAll || 0
                            ).toLocaleString()}</strong></td>
                            <td class="editable" data-field="satuanCetak" data-type="text" data-value="${
                              item.satuanCetak || "LEMBAR PLANO"
                            }">${item.satuanCetak || "LEMBAR PLANO"}</td>
                            <td class="editable" data-field="waktuStart" data-type="time" data-value="${
                              item.waktuStart || ""
                            }">${item.waktuStart || "-"}</td>
                            <td class="editable" data-field="waktuFinish" data-type="time" data-value="${
                              item.waktuFinish || ""
                            }">${item.waktuFinish || "-"}</td>
                            <td class="editable" data-field="noSpk" data-type="text" data-value="${
                              item.noSpk || ""
                            }">${item.noSpk || "-"}</td>
                            <td class="editable" data-field="keterangan" data-type="text" data-value="${
                              item.keterangan || ""
                            }">${item.keterangan || "-"}</td>
                            <td class="action-cell">
                                <button class="btn btn-sm btn-primary edit-btn" data-id="${
                                  item.id
                                }" data-type="daily-report" title="Edit">
                                    <i class="bi bi-pencil"></i> Edit
                                </button>
                                <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                                  item.id
                                }" data-type="daily-report" title="Simpan" style="display: none;">
                                    <i class="bi bi-check"></i> Simpan
                                </button>
                                <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                                  item.id
                                }" data-type="daily-report" title="Batal" style="display: none;">
                                    <i class="bi bi-x"></i> Batal
                                </button>
                                <button class="btn btn-sm btn-danger delete-btn" data-id="${
                                  item.id
                                }" data-type="daily-report" title="Hapus">
                                    <i class="bi bi-trash"></i> Hapus
                                </button>
                            </td>
                        </tr>
                        `
                      )
                      .join("")}
                </tbody>
            </table>
        `;
  }

  generateIridesseReportTable(data) {
    return `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>No. SPK</th>
                        <th>Nama Client</th>
                        <th>Nama Pekerjaan</th>
                        <th>Jenis Kertas</th>
                        <th>Ukuran</th>
                        <th>Jenis Print</th>
                        <th>Jumlah Cetak OK</th>
                        <th>Jumlah NG</th>
                        <th>Total Cetak</th>
                        <th>Time Start</th>
                        <th>Time Finish</th>
                        <th>Start Billing</th>
                        <th>Finish Billing</th>
                        <th>Billing</th>
                        <th>Gap</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                      .map((item) => {
                        const totalCetak =
                          (Number(item.jumlahCetak) || 0) -
                          (Number(item.ng) || 0);
                        const billing =
                          (Number(item.finishBilling) || 0) -
                          (Number(item.startBilling) || 0);
                        const gap = totalCetak - billing;

                        return `
                          <tr data-id="${
                            item.id
                          }" data-type="iridesse-report" class="table-row">
                              <td class="editable" data-field="tanggal" data-type="date" data-value="${this.formatDateForInput(
                                item.tanggal
                              )}">${new Date(item.tanggal).toLocaleDateString(
                          "id-ID"
                        )}</td>
                              <td class="editable" data-field="noSpk" data-type="text" data-value="${
                                item.noSpk || ""
                              }">${item.noSpk || "-"}</td>
                              <td class="editable" data-field="namaClient" data-type="text" data-value="${
                                item.namaClient || ""
                              }">${item.namaClient || "-"}</td>
                              <td class="editable" data-field="namaPekerjaan" data-type="text" data-value="${
                                item.namaPekerjaan || ""
                              }">${item.namaPekerjaan || "-"}</td>
                              <td class="editable" data-field="jenisKertas" data-type="text" data-value="${
                                item.jenisKertas || ""
                              }">${item.jenisKertas || "-"}</td>
                              <td class="editable" data-field="ukuranKertas" data-type="text" data-value="${
                                item.ukuranKertas || ""
                              }">${item.ukuranKertas || "-"}</td>
                              <td class="editable" data-field="jenisPrint" data-type="text" data-value="${
                                item.jenisPrint || ""
                              }">${item.jenisPrint || "-"}</td>
                              <td class="editable" data-field="jumlahCetak" data-type="number" data-value="${
                                item.jumlahCetak || 0
                              }">${(
                          item.jumlahCetak || 0
                        ).toLocaleString()}</td>
                              <td class="editable" data-field="ng" data-type="number" data-value="${
                                item.ng || 0
                              }">${(item.ng || 0).toLocaleString()}</td>
                              <td class="non-editable"><strong>${totalCetak.toLocaleString()}</strong></td>
                              <td class="editable" data-field="timeStart" data-type="time" data-value="${
                                item.timeStart || ""
                              }">${item.timeStart || "-"}</td>
                              <td class="editable" data-field="timeFinish" data-type="time" data-value="${
                                item.timeFinish || ""
                              }">${item.timeFinish || "-"}</td>
                              <td class="editable" data-field="startBilling" data-type="number" data-value="${
                                item.startBilling || 0
                              }">${(
                          item.startBilling || 0
                        ).toLocaleString()}</td>
                              <td class="editable" data-field="finishBilling" data-type="number" data-value="${
                                item.finishBilling || 0
                              }">${(
                          item.finishBilling || 0
                        ).toLocaleString()}</td>
                              <td class="editable" data-field="billing" data-type="number" data-value="${
                                item.billing || 0
                              }">${(item.billing || 0).toLocaleString()}</td>
                              <td class="editable ${
                                gap < 0
                                  ? "text-danger"
                                  : gap > 0
                                  ? "text-success"
                                  : ""
                              }" data-field="gap" data-type="number" data-value="${
                          item.gap || 0
                        }">${(item.gap || 0).toLocaleString()}</td>
                              <td class="editable" data-field="status" data-type="select" data-value="${
                                item.status || ""
                              }" data-options="PENDING,PROGRESS,SELESAI"><span class="badge ${
                          item.status === "SELESAI"
                            ? "bg-success"
                            : item.status === "PENDING"
                            ? "bg-warning"
                            : "bg-secondary"
                        }">${item.status || "-"}</span></td>
                              <td class="action-cell">
                                  <button class="btn btn-sm btn-primary edit-btn" data-id="${
                                    item.id
                                  }" data-type="iridesse-report" title="Edit">
                                      <i class="bi bi-pencil"></i> Edit
                                  </button>
                                  <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                                    item.id
                                  }" data-type="iridesse-report" title="Simpan" style="display: none;">
                                      <i class="bi bi-check"></i> Simpan
                                  </button>
                                  <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                                    item.id
                                  }" data-type="iridesse-report" title="Batal" style="display: none;">
                                      <i class="bi bi-x"></i> Batal
                                  </button>
                                  <button class="btn btn-sm btn-danger delete-btn" data-id="${
                                    item.id
                                  }" data-type="iridesse-report" title="Hapus">
                                      <i class="bi bi-trash"></i> Hapus
                                  </button>
                              </td>
                          </tr>
                          `;
                      })
                      .join("")}
                </tbody>
            </table>
        `;
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

  displayTable(data, tipe) {
    let html = "";

    // Store data for PDF generation
    this.currentData = data;
    this.currentType = tipe;

    if (tipe === "bahan-baku") {
      html = this.generateBahanBakuTable(data);
    } else if (tipe === "iridesse-report") {
      html = this.generateIridesseReportTable(data);
    } else {
      html = this.generateDailyReportTable(data);
    }

    // Add download PDF button
    const downloadBtn = this.createDownloadButton(tipe);
    this.tableContainer.innerHTML = downloadBtn + html;

    // Attach event listeners after table is rendered
    this.attachEventListeners();
  }

  createDownloadButton(tipe) {
    const typeLabel =
      tipe === "iridesse-report" ? "Iridesse" : "Daily Report Mesin";
    return `
      <div style="margin-bottom: 15px;">
        <button id="download-pdf-btn" class="btn btn-success" style="margin-right: 10px;">
          <i class="bi bi-file-earmark-pdf"></i> Download PDF - ${typeLabel}
        </button>
      </div>
    `;
  }

  attachEventListeners() {
    // Remove existing listeners to avoid duplicates
    this.tableContainer.removeEventListener("click", this.handleTableClick);

    // Add download PDF button listener
    const downloadBtn = this.tableContainer.querySelector("#download-pdf-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => this.downloadPDF());
    }

    // Add event listener for edit, save, cancel and delete buttons
    this.handleTableClick = (e) => {
      if (e.target.closest(".edit-btn")) {
        const btn = e.target.closest(".edit-btn");
        const id = btn.dataset.id;
        const type = btn.dataset.type;
        this.startEdit(id, type);
        if (this.editHandler) this.editHandler(id, type);
      } else if (e.target.closest(".save-btn")) {
        const btn = e.target.closest(".save-btn");
        const id = btn.dataset.id;
        const type = btn.dataset.type;
        this.saveEdit(id, type);
      } else if (e.target.closest(".cancel-btn")) {
        const btn = e.target.closest(".cancel-btn");
        const id = btn.dataset.id;
        const type = btn.dataset.type;
        this.cancelEdit(id, type);
        if (this.cancelHandler) this.cancelHandler(id, type);
      } else if (e.target.closest(".delete-btn")) {
        const btn = e.target.closest(".delete-btn");
        const id = btn.dataset.id;
        const type = btn.dataset.type;
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
          if (this.deleteHandler) this.deleteHandler(id, type);
        }
      }
    };

    this.tableContainer.addEventListener("click", this.handleTableClick);
  }

  downloadPDF() {
    try {
      if (!this.currentData || this.currentData.length === 0) {
        alert("Tidak ada data untuk dicetak");
        return;
      }

      // Create PDF
      const doc = new window.jspdf.jsPDF({ orientation: "landscape" });

      // Add company header
      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      doc.text("PT. GCI (Garasi Creasindo Indonesia)", 20, 20);

      // Add report title
      const title =
        this.currentType === "iridesse-report"
          ? "Laporan Iridesse Report"
          : "Laporan Daily Report Mesin";
      doc.setFontSize(14);
      doc.setFont(undefined, "normal");
      doc.text(title, 20, 32);

      // Add period info
      const periode = this.periodeInput.value;
      if (periode) {
        const [year, month] = periode.split("-");
        const monthNames = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];
        doc.text(`Periode: ${monthNames[parseInt(month) - 1]} ${year}`, 20, 44);
      }

      // Add date and time
      const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const currentTime = new Date().toLocaleTimeString("id-ID");
      doc.setFontSize(10);
      doc.text(`Tanggal: ${currentDate}`, 20, 52);
      doc.text(`Waktu: ${currentTime}`, 20, 58);

      // Generate table based on type
      if (this.currentType === "iridesse-report") {
        this.generateIridessePDF(doc);
      } else {
        this.generateDailyReportPDF(doc);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal membuat PDF: " + error.message);
    }
  }

  generateIridessePDF(doc) {
    const headers = [
      "Tanggal",
      "No SPK",
      "Nama Client",
      "Nama Pekerjaan",
      "Jenis Kertas",
      "Ukuran Kertas",
      "Jenis Print",
      "Jumlah Cetak",
      "Jumlah OK",
      "Jumlah NG",
      "Total Cetak",
      "Time Start",
      "Time Finish",
      "Start Billing",
      "Finish Billing",
      "Billing",
      "Gap",
      "Status",
    ];

    const tableData = this.currentData.map((item) => {
      const totalCetak =
        (Number(item.jumlahCetak) || 0) - (Number(item.ng) || 0);
      const billing =
        (Number(item.finishBilling) || 0) - (Number(item.startBilling) || 0);
      const gap = totalCetak - billing;

      return [
        new Date(item.tanggal).toLocaleDateString("id-ID"),
        item.noSpk || "-",
        item.namaClient || "-",
        item.namaPekerjaan || "-",
        item.jenisKertas || "-",
        item.ukuranKertas || "-",
        item.jenisPrint || "-",
        (item.jumlahCetak || 0).toLocaleString(),
        (item.jumlahOk || 0).toLocaleString(),
        (item.ng || 0).toLocaleString(),
        totalCetak.toLocaleString(),
        item.timeStart || "-",
        item.timeFinish || "-",
        (item.startBilling || 0).toLocaleString(),
        (item.finishBilling || 0).toLocaleString(),
        billing.toLocaleString(),
        gap.toLocaleString(),
        item.status || "-",
      ];
    });

    // Add total records info
    doc.text(`Total Record: ${tableData.length} item`, 20, 64);

    // Generate table in PDF
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 66,
      styles: {
        fontSize: 7,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 7,
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250],
      },
      margin: { top: 66, left: 10, right: 10 },
      didDrawPage: function (data) {
        const pageCount = doc.internal.getNumberOfPages();
        const pageSize = doc.internal.pageSize;
        doc.setFontSize(8);
        doc.text(
          `Halaman ${data.pageNumber} dari ${pageCount}`,
          pageSize.width - 40,
          pageSize.height - 10
        );
      },
    });

    // Save PDF
    const filename = `Laporan_Iridesse_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(filename);
    alert(`PDF berhasil dibuat: ${filename}`);
  }

  generateDailyReportPDF(doc) {
    const headers = [
      "No",
      "Tanggal",
      "Qty PO",
      "Jenis Bahan",
      "Jenis Pekerjaan",
      "Client",
      "Spesifikasi",
      "Qty Cetak OK",
      "Qty Cetak NG",
      "Total Qty Cetak",
      "Satuan Cetak",
      "Waktu Start",
      "Waktu Finish",
      "No SPK",
      "Keterangan",
    ];

    const tableData = this.currentData.map((item) => [
      item.nomor || "",
      new Date(item.tanggal).toLocaleDateString("id-ID"),
      (item.qtyPo || 0).toLocaleString(),
      item.jenisBahan || "-",
      item.jenisPekerjaan || "-",
      item.client || "-",
      item.spesifikasi || "-",
      (item.qtyCetakOk || 0).toLocaleString(),
      (item.qtyCetakNg || 0).toLocaleString(),
      (item.totalQtyCetakAll || 0).toLocaleString(),
      item.satuanCetak || "LEMBAR PLANO",
      item.waktuStart || "-",
      item.waktuFinish || "-",
      item.noSpk || "-",
      item.keterangan || "-",
    ]);

    // Add total records info
    doc.text(`Total Record: ${tableData.length} item`, 20, 64);

    // Generate table in PDF
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 66,
      styles: {
        fontSize: 7,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 7,
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250],
      },
      margin: { top: 66, left: 10, right: 10 },
      didDrawPage: function (data) {
        const pageCount = doc.internal.getNumberOfPages();
        const pageSize = doc.internal.pageSize;
        doc.setFontSize(8);
        doc.text(
          `Halaman ${data.pageNumber} dari ${pageCount}`,
          pageSize.width - 40,
          pageSize.height - 10
        );
      },
    });

    // Save PDF
    const filename = `Laporan_Daily_Report_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(filename);
    alert(`PDF berhasil dibuat: ${filename}`);
  }

  showSuccess(message) {
    alert(message || "Operasi berhasil!");
  }

  showError(message) {
    alert(message);
  }
}
