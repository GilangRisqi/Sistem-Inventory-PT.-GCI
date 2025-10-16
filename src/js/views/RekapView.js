// Import jsPDF for PDF generation
import jsPDF from "jspdf";
import "jspdf-autotable";

export class RekapView {
  constructor() {
    this.generateBtn = document.getElementById("generate-rekap");
    this.tipeSelect = document.getElementById("rekap-tipe");
    this.periodeInput = document.getElementById("rekap-periode");

    // Cari table-container yang spesifik di dalam rekap-section
    const rekapSection = document.getElementById("rekap-section");
    this.tableContainer = rekapSection
      ? rekapSection.querySelector(".table-container")
      : null;

    // Fallback jika tidak ditemukan di rekap-section
    if (!this.tableContainer) {
      this.tableContainer = document.querySelector(".table-container");
    }

    this.currentData = []; // Store current table data for PDF generation
    this.currentType = ""; // Store current table type
    this.filteredData = null; // Store filtered data for PDF generation
  }

  // Helper function untuk format angka yang konsisten dengan format Indonesia (titik sebagai pemisah ribuan)
  formatNumber(number) {
    const num = Number(number) || 0;
    return num.toLocaleString("id-ID"); // Menggunakan format Indonesia yang konsisten
  }

  // Filter data berdasarkan client
  filterByClient(selectedClient) {
    if (!this.currentData || this.currentType !== "daily-report") {
      return;
    }

    const table = this.tableContainer.querySelector("table tbody");
    if (!table) return;

    const rows = table.querySelectorAll("tr");
    let visibleRowCount = 0;
    let filteredData = [];

    // Initialize totals
    let totalQtyCetakOk = 0;
    let totalQtyCetakNg = 0;
    let totalQtyCetakAll = 0;

    // Show/hide rows and calculate totals based on filter
    rows.forEach((row, index) => {
      // Skip the total row and average row
      if (
        row.classList.contains("table-warning") ||
        row.classList.contains("table-info")
      )
        return;

      const clientCell = row.querySelector('td[data-field="client"]');
      if (!clientCell) return;

      const clientValue =
        clientCell.dataset.value || clientCell.textContent.trim();

      if (!selectedClient || clientValue === selectedClient) {
        row.style.display = "";
        visibleRowCount++;

        // Get the row ID to find the correct item in currentData
        const rowId = row.dataset.id;
        const originalItem = this.currentData.find((item) => item.id == rowId);
        if (originalItem) {
          filteredData.push(originalItem);
          totalQtyCetakOk += Number(originalItem.qtyCetakOk) || 0;
          totalQtyCetakNg += Number(originalItem.qtyCetakNg) || 0;
          totalQtyCetakAll += Number(originalItem.totalQtyCetakAll) || 0;
        }
      } else {
        row.style.display = "none";
      }
    });

    // Calculate averages
    const avgQtyCetakOk =
      visibleRowCount > 0 ? totalQtyCetakOk / visibleRowCount : 0;
    const avgQtyCetakNg =
      visibleRowCount > 0 ? totalQtyCetakNg / visibleRowCount : 0;
    const avgQtyCetakAll =
      visibleRowCount > 0 ? totalQtyCetakAll / visibleRowCount : 0;

    // Update total row with calculated totals using more robust selector
    const totalRow = table.querySelector("tr.table-warning");
    if (totalRow) {
      // Try different approaches to find the strong elements
      const strongElements = totalRow.querySelectorAll("strong");
      console.log(
        `Found total row with ${strongElements.length} strong elements`
      );

      if (strongElements.length >= 3) {
        // Approach 1: Use the strong elements directly (assuming they're in order)
        const qtyCetakOkStrong = strongElements[0];
        const qtyCetakNgStrong = strongElements[1];
        const totalQtyStrong = strongElements[2];

        if (qtyCetakOkStrong) {
          const formattedOk = this.formatNumber(totalQtyCetakOk);
          qtyCetakOkStrong.textContent = formattedOk;
          console.log(`Updated OK strong to: ${formattedOk}`);
        }
        if (qtyCetakNgStrong) {
          const formattedNg = this.formatNumber(totalQtyCetakNg);
          qtyCetakNgStrong.textContent = formattedNg;
          console.log(`Updated NG strong to: ${formattedNg}`);
        }
        if (totalQtyStrong) {
          const formattedAll = this.formatNumber(totalQtyCetakAll);
          totalQtyStrong.textContent = formattedAll;
          console.log(`Updated Total strong to: ${formattedAll}`);
        }
      } else {
        console.log(
          `Not enough strong elements found: ${strongElements.length}`
        );
        // Fallback to original approach
        const allTdElements = totalRow.querySelectorAll("td");
        if (allTdElements.length >= 10) {
          const qtyCetakOkCell = allTdElements[7].querySelector("strong");
          const qtyCetakNgCell = allTdElements[8].querySelector("strong");
          const totalQtyCell = allTdElements[9].querySelector("strong");

          if (qtyCetakOkCell)
            qtyCetakOkCell.textContent = this.formatNumber(totalQtyCetakOk);
          if (qtyCetakNgCell)
            qtyCetakNgCell.textContent = this.formatNumber(totalQtyCetakNg);
          if (totalQtyCell)
            totalQtyCell.textContent = this.formatNumber(totalQtyCetakAll);
        }
      }
    } else {
      console.log("Total row not found");
    }

    // Update average row with calculated averages
    const averageRow = table.querySelector("tr.table-info");
    if (averageRow) {
      const avgStrongElements = averageRow.querySelectorAll("strong");
      console.log(
        `Found average row with ${avgStrongElements.length} strong elements`
      );

      if (avgStrongElements.length >= 3) {
        const avgQtyCetakOkStrong = avgStrongElements[0];
        const avgQtyCetakNgStrong = avgStrongElements[1];
        const avgTotalQtyStrong = avgStrongElements[2];

        if (avgQtyCetakOkStrong) {
          const formattedAvgOk = this.formatNumber(Math.round(avgQtyCetakOk));
          avgQtyCetakOkStrong.textContent = formattedAvgOk;
          console.log(`Updated Average OK strong to: ${formattedAvgOk}`);
        }
        if (avgQtyCetakNgStrong) {
          const formattedAvgNg = this.formatNumber(Math.round(avgQtyCetakNg));
          avgQtyCetakNgStrong.textContent = formattedAvgNg;
          console.log(`Updated Average NG strong to: ${formattedAvgNg}`);
        }
        if (avgTotalQtyStrong) {
          const formattedAvgAll = this.formatNumber(Math.round(avgQtyCetakAll));
          avgTotalQtyStrong.textContent = formattedAvgAll;
          console.log(`Updated Average Total strong to: ${formattedAvgAll}`);
        }
      } else {
        console.log(
          `Not enough strong elements found in average row: ${avgStrongElements.length}`
        );
        // Fallback to td-based approach
        const avgTdElements = averageRow.querySelectorAll("td");
        if (avgTdElements.length >= 10) {
          const avgQtyCetakOkCell = avgTdElements[7].querySelector("strong");
          const avgQtyCetakNgCell = avgTdElements[8].querySelector("strong");
          const avgTotalQtyCell = avgTdElements[9].querySelector("strong");

          if (avgQtyCetakOkCell)
            avgQtyCetakOkCell.textContent = this.formatNumber(
              Math.round(avgQtyCetakOk)
            );
          if (avgQtyCetakNgCell)
            avgQtyCetakNgCell.textContent = this.formatNumber(
              Math.round(avgQtyCetakNg)
            );
          if (avgTotalQtyCell)
            avgTotalQtyCell.textContent = this.formatNumber(
              Math.round(avgQtyCetakAll)
            );
        }
      }
    } else {
      console.log("Average row not found");
    }

    // Update filtered data for PDF generation
    this.filteredData = selectedClient ? filteredData : this.currentData;

    console.log(
      `Filter applied: ${
        selectedClient || "Semua Client"
      }, Showing ${visibleRowCount} rows, Total OK: ${this.formatNumber(
        totalQtyCetakOk
      )}, Total NG: ${this.formatNumber(
        totalQtyCetakNg
      )}, Total All: ${this.formatNumber(
        totalQtyCetakAll
      )}, Average OK: ${this.formatNumber(
        Math.round(avgQtyCetakOk)
      )}, Average NG: ${this.formatNumber(
        Math.round(avgQtyCetakNg)
      )}, Average All: ${this.formatNumber(Math.round(avgQtyCetakAll))}`
    );
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
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-hover">
                  <thead class="table-dark">
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
            </div>
        `;
  }

  generateDailyReportTable(data) {
    try {
      // Get unique clients from data
      const uniqueClients = [
        ...new Set(
          data
            .map((item) => item.client)
            .filter((client) => client && client.trim() !== "")
        ),
      ];

      // Create filter dropdown
      const filterHtml = `
        <div class="mb-3">
          <div class="row">
            <div class="col-md-4">
              <label for="client-filter" class="form-label"><strong>Filter berdasarkan Client:</strong></label>
              <select id="client-filter" class="form-select">
                <option value="">Semua Client</option>
                ${uniqueClients
                  .map(
                    (client) => `<option value="${client}">${client}</option>`
                  )
                  .join("")}
              </select>
            </div>
          </div>
        </div>
      `;

      const tableHtml = `
        ${filterHtml}
        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover" style="width: 100%; max-width: 100%; border-collapse: collapse; table-layout: auto; font-size: 14px;">
            <thead class="table-dark">
            <tr>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">No.</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Tanggal</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Qty PO</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Jenis Bahan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Jenis Pekerjaan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Client</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Spesifikasi</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Qty Cetak OK</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Qty Cetak NG</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Total Qty</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Satuan Cetak</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Waktu Start</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Waktu Finish</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">No. SPK</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Keterangan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (item) => `
              <tr data-id="${
                item.id
              }" data-type="daily-report" class="table-row">
                <td class="editable" data-field="nomor" data-type="number" data-value="${
                  item.nomor || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: center; max-width: 50px;">${
                  item.nomor || "-"
                }</td>
                <td class="editable" data-field="tanggal" data-type="date" data-value="${this.formatDateForInput(
                  item.tanggal
                )}" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 100px;">${new Date(
                  item.tanggal
                ).toLocaleDateString("id-ID")}</td>
                <td class="editable" data-field="qtyPo" data-type="number" data-value="${
                  item.qtyPo || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: right; max-width: 100px;">${this.formatNumber(
                  item.qtyPo || 0
                )}</td>
                <td class="editable" data-field="jenisBahan" data-type="text" data-value="${
                  item.jenisBahan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 150px;">${
                  item.jenisBahan || "-"
                }</td>
                <td class="editable" data-field="jenisPekerjaan" data-type="text" data-value="${
                  item.jenisPekerjaan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 150px;">${
                  item.jenisPekerjaan || "-"
                }</td>
                <td class="editable" data-field="client" data-type="text" data-value="${
                  item.client || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 150px;">${
                  item.client || "-"
                }</td>
                <td class="editable" data-field="spesifikasi" data-type="text" data-value="${
                  item.spesifikasi || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 150px;">${
                  item.spesifikasi || "-"
                }</td>
                <td class="editable" data-field="qtyCetakOk" data-type="number" data-value="${
                  item.qtyCetakOk || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: right; max-width: 100px;">${this.formatNumber(
                  item.qtyCetakOk || 0
                )}</td>
                <td class="editable" data-field="qtyCetakNg" data-type="number" data-value="${
                  item.qtyCetakNg || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: right; max-width: 100px;">${this.formatNumber(
                  item.qtyCetakNg || 0
                )}</td>
                <td class="non-editable" style="padding: 6px 4px; font-size: 12px; text-align: right; max-width: 100px;"><strong>${this.formatNumber(
                  item.totalQtyCetakAll || 0
                )}</strong></td>
                <td class="editable" data-field="satuanCetak" data-type="select" data-value="${
                  item.satuanCetak || "LEMBAR PLANO"
                }" data-options="LEMBAR PLANO,METER,ROLL,PCS,SET" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 150px;">${
                  item.satuanCetak || "LEMBAR PLANO"
                }</td>
                <td class="editable" data-field="waktuStart" data-type="time" data-value="${
                  item.waktuStart || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 150px;">${
                  item.waktuStart || "-"
                }</td>
                <td class="editable" data-field="waktuFinish" data-type="time" data-value="${
                  item.waktuFinish || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 150px;">${
                  item.waktuFinish || "-"
                }</td>
                <td class="editable" data-field="noSpk" data-type="text" data-value="${
                  item.noSpk || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 150px;">${
                  item.noSpk || "-"
                }</td>
                <td class="editable" data-field="keterangan" data-type="text" data-value="${
                  item.keterangan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 150px;">${
                  item.keterangan || "-"
                }</td>
                <td style="padding: 6px 4px; font-size: 12px; text-align: center; max-width: 120px;">
                  <button class="btn btn-sm btn-primary edit-btn" data-id="${
                    item.id
                  }" data-type="daily-report">Edit</button>
                  <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                    item.id
                  }" data-type="daily-report" style="display: none;">Simpan</button>
                  <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                    item.id
                  }" data-type="daily-report" style="display: none;">Batal</button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${
                    item.id
                  }" data-type="daily-report">Hapus</button>
                </td>
              </tr>
            `
              )
              .join("")}
            
            <!-- Baris Total Akumulasi -->
            <tr class="table-warning" style="background-color: #fff3cd; font-weight: bold; border: 2px solid #ffc107;">
              <td colspan="7" style="padding: 10px 6px; font-size: 13px; text-align: right; font-weight: bold; background-color: #fff3cd;">
                <strong>TOTAL AKUMULASI:</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #28a745;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.qtyCetakOk) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #dc3545;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.qtyCetakNg) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #007bff;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) =>
                      total + (Number(item.totalQtyCetakAll) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td colspan="6" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #fff3cd;">
                -
              </td>
            </tr>
            
            <!-- Baris Rata-rata -->
            <tr class="table-info" style="background-color: #d1ecf1; font-weight: bold; border: 2px solid #17a2b8;">
              <td colspan="7" style="padding: 10px 6px; font-size: 13px; text-align: right; font-weight: bold; background-color: #d1ecf1;">
                <strong>RATA-RATA:</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #d1ecf1; color: #28a745;">
                <strong>${this.formatNumber(
                  Math.round(
                    data.length > 0
                      ? data.reduce(
                          (total, item) =>
                            total + (Number(item.qtyCetakOk) || 0),
                          0
                        ) / data.length
                      : 0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #d1ecf1; color: #dc3545;">
                <strong>${this.formatNumber(
                  Math.round(
                    data.length > 0
                      ? data.reduce(
                          (total, item) =>
                            total + (Number(item.qtyCetakNg) || 0),
                          0
                        ) / data.length
                      : 0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #d1ecf1; color: #007bff;">
                <strong>${this.formatNumber(
                  Math.round(
                    data.length > 0
                      ? data.reduce(
                          (total, item) =>
                            total + (Number(item.totalQtyCetakAll) || 0),
                          0
                        ) / data.length
                      : 0
                  )
                )}</strong>
              </td>
              <td colspan="6" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #d1ecf1;">
                -
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      `;

      return tableHtml;
    } catch (error) {
      console.error("❌ Error generating daily report table:", error);
      return "<p>Error generating table</p>";
    }
  }

  generateIridesseReportTable(data) {
    return `
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-hover">
                  <thead class="table-dark">
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
                              }">${this.formatNumber(
                          item.jumlahCetak || 0
                        )}</td>
                              <td class="editable" data-field="ng" data-type="number" data-value="${
                                item.ng || 0
                              }">${this.formatNumber(item.ng || 0)}</td>
                              <td class="non-editable"><strong>${this.formatNumber(
                                totalCetak
                              )}</strong></td>
                              <td class="editable" data-field="timeStart" data-type="time" data-value="${
                                item.timeStart || ""
                              }">${item.timeStart || "-"}</td>
                              <td class="editable" data-field="timeFinish" data-type="time" data-value="${
                                item.timeFinish || ""
                              }">${item.timeFinish || "-"}</td>
                              <td class="editable" data-field="startBilling" data-type="number" data-value="${
                                item.startBilling || 0
                              }">${this.formatNumber(
                          item.startBilling || 0
                        )}</td>
                              <td class="editable" data-field="finishBilling" data-type="number" data-value="${
                                item.finishBilling || 0
                              }">${this.formatNumber(
                          item.finishBilling || 0
                        )}</td>
                              <td class="editable" data-field="billing" data-type="number" data-value="${
                                item.billing || 0
                              }">${this.formatNumber(item.billing || 0)}</td>
                              <td class="editable ${
                                gap < 0
                                  ? "text-danger"
                                  : gap > 0
                                  ? "text-success"
                                  : ""
                              }" data-field="gap" data-type="number" data-value="${
                          item.gap || 0
                        }">${this.formatNumber(item.gap || 0)}</td>
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
            </div>
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
    if (!this.tableContainer) {
      console.error("❌ Table container not found!");
      return;
    }

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
    const finalHtml = downloadBtn + html;

    // Clear any existing content first and force visibility
    this.tableContainer.innerHTML = "";
    this.tableContainer.style.display = "block";
    this.tableContainer.style.visibility = "visible";
    this.tableContainer.style.height = "auto";
    this.tableContainer.style.overflow = "auto";
    this.tableContainer.style.overflowX = "auto";
    this.tableContainer.style.minHeight = "200px";
    this.tableContainer.style.maxWidth = "100%";

    // Set the HTML content
    this.tableContainer.innerHTML = finalHtml;

    // No additional JavaScript styling needed - all styling is inline to prevent flicker

    // Attach event listeners after table is rendered
    this.attachEventListeners();
  }

  createDownloadButton(tipe) {
    const typeLabel =
      tipe === "iridesse-report" ? "Iridesse" : "Daily Report Mesin Offset";
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

    // Add client filter listener
    const clientFilter = this.tableContainer.querySelector("#client-filter");
    if (clientFilter) {
      clientFilter.addEventListener("change", (e) =>
        this.filterByClient(e.target.value)
      );
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

  startEdit(id, type) {
    let row; // Declare row variable outside try block

    try {
      console.log(`Starting edit for ${type} with id: ${id}`);
      console.log(
        "Available rows in table:",
        this.tableContainer.querySelectorAll("tr[data-id]").length
      );

      // Find the row being edited
      row = this.tableContainer.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      console.log("Found row:", !!row);
      if (!row) {
        console.error(`Row not found for id: ${id}, type: ${type}`);
        console.log(
          "All rows with data-id:",
          Array.from(this.tableContainer.querySelectorAll("tr[data-id]")).map(
            (r) => ({
              id: r.getAttribute("data-id"),
              type: r.getAttribute("data-type"),
            })
          )
        );
        alert(`Baris tidak ditemukan untuk ID: ${id}`);
        return;
      }

      // Show save/cancel buttons, hide edit button for this row
      const editBtn = row.querySelector(".edit-btn");
      const saveBtn = row.querySelector(".save-btn");
      const cancelBtn = row.querySelector(".cancel-btn");

      console.log("Buttons found:", {
        editBtn: !!editBtn,
        saveBtn: !!saveBtn,
        cancelBtn: !!cancelBtn,
      });

      if (editBtn) {
        editBtn.style.display = "none";
      }

      if (saveBtn) {
        saveBtn.style.display = "inline-block";
        saveBtn.classList.remove("d-none");
      } else {
        console.warn("Save button not found for row:", id);
      }

      if (cancelBtn) {
        cancelBtn.style.display = "inline-block";
        cancelBtn.classList.remove("d-none");
      } else {
        console.warn("Cancel button not found for row:", id);
      }

      // Make editable cells into input fields
      if (type === "iridesse-report" || type === "daily-report") {
        const editableCells = row.querySelectorAll(".editable");
        console.log("Found editable cells:", editableCells.length);
        editableCells.forEach((cell, index) => {
          console.log(`Processing cell ${index}:`, {
            element: cell,
            dataset: cell.dataset,
            textContent: cell.textContent.trim(),
            hasEditableClass: cell.classList.contains("editable"),
          });

          const value = cell.dataset.value || cell.textContent.trim();
          const field = cell.dataset.field;
          const dataType = cell.dataset.type;

          console.log(`Cell ${index} data:`, { value, field, dataType });

          let input;
          if (dataType === "select") {
            const options = cell.dataset.options
              ? cell.dataset.options.split(",")
              : [];
            input = document.createElement("select");
            input.className = "form-control form-control-sm";
            options.forEach((option) => {
              const opt = document.createElement("option");
              opt.value = option;
              opt.textContent = option;
              if (option === value) opt.selected = true;
              input.appendChild(opt);
            });
          } else if (dataType === "date") {
            input = document.createElement("input");
            input.type = "date";
            input.value = value;
            input.className = "form-control form-control-sm";
          } else if (dataType === "time") {
            input = document.createElement("input");
            input.type = "time";
            input.value = value;
            input.className = "form-control form-control-sm";
          } else if (dataType === "number") {
            input = document.createElement("input");
            input.type = "number";
            input.value = value;
            input.className = "form-control form-control-sm";
          } else {
            input = document.createElement("input");
            input.type = "text";
            input.value = value;
            input.className = "form-control form-control-sm";
          }

          input.dataset.originalValue = value;
          input.dataset.field = field;
          console.log(`Created input for field ${field}:`, input);

          cell.innerHTML = "";
          cell.appendChild(input);
          console.log(`Cell ${field} after input added:`, cell.innerHTML);
        });
      }
    } catch (error) {
      console.error("Error in startEdit:", error);
      alert(`Gagal masuk mode edit: ${error.message}`);
      return;
    }
  }

  saveEdit(id, type) {
    console.log(`Saving edit for ${type} with id: ${id}`);

    if (type === "iridesse-report" || type === "daily-report") {
      const row = this.tableContainer.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (!row) return;

      // Collect changed data
      const updatedData = { id };
      const inputs = row.querySelectorAll(".editable input, .editable select");

      inputs.forEach((input) => {
        const field = input.dataset.field;
        const newValue = input.value;
        const originalValue = input.dataset.originalValue;

        if (newValue !== originalValue) {
          updatedData[field] = newValue;
        }
      });

      // Call the save handler if exists
      if (this.saveHandler && Object.keys(updatedData).length > 1) {
        this.saveHandler(id, type, updatedData);
      }
    }

    // Reset to view mode
    this.cancelEdit(id, type);
  }

  cancelEdit(id, type) {
    console.log(`Cancelling edit for ${type} with id: ${id}`);

    // Find the row being edited
    const row = this.tableContainer.querySelector(
      `tr[data-id="${id}"][data-type="${type}"]`
    );
    if (!row) return;

    // Show edit button, hide save/cancel buttons
    const editBtn = row.querySelector(".edit-btn");
    const saveBtn = row.querySelector(".save-btn");
    const cancelBtn = row.querySelector(".cancel-btn");

    if (editBtn) editBtn.style.display = "inline-block";
    if (saveBtn) {
      saveBtn.style.display = "none";
      saveBtn.classList.add("d-none");
    }
    if (cancelBtn) {
      cancelBtn.style.display = "none";
      cancelBtn.classList.add("d-none");
    }

    // Restore original cell content
    if (type === "iridesse-report" || type === "daily-report") {
      const editableCells = row.querySelectorAll(".editable");
      editableCells.forEach((cell) => {
        const input = cell.querySelector("input, select");
        if (input) {
          const originalValue = input.dataset.originalValue || "";
          const field = input.dataset.field;

          // Restore original display value
          if (type === "iridesse-report" && field === "status") {
            const statusClass =
              originalValue === "SELESAI"
                ? "bg-success"
                : originalValue === "PENDING"
                ? "bg-warning"
                : "bg-secondary";
            cell.innerHTML = `<span class="badge ${statusClass}">${
              originalValue || "-"
            }</span>`;
          } else if (field === "tanggal") {
            const date = originalValue ? new Date(originalValue) : null;
            cell.textContent = date ? date.toLocaleDateString("id-ID") : "-";
          } else if (
            field.includes("Billing") ||
            field === "jumlahCetak" ||
            field === "ng" ||
            field === "qtyPo" ||
            field === "qtyCetakOk" ||
            field === "qtyCetakNg" ||
            field === "nomor"
          ) {
            const numValue = Number(originalValue) || 0;
            cell.textContent = this.formatNumber(numValue);
          } else {
            cell.textContent = originalValue || "-";
          }
        }
      });
    }
  }

  downloadPDF() {
    try {
      // Use filtered data if available, otherwise use current data
      const dataForPDF = this.filteredData || this.currentData;

      if (!dataForPDF || dataForPDF.length === 0) {
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
          : "Laporan Daily Report Mesin Offset";
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

      // Add filter info if applied
      let yPos = 48;
      const clientFilter = this.tableContainer.querySelector("#client-filter");
      if (clientFilter && clientFilter.value) {
        doc.text(`Filter Client: ${clientFilter.value}`, 20, yPos);
        yPos += 6;
      }

      // Add date and time
      const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const currentTime = new Date().toLocaleTimeString("id-ID");
      doc.setFontSize(10);
      doc.text(`Tanggal: ${currentDate}`, 20, yPos + 4);
      doc.text(`Waktu: ${currentTime}`, 20, yPos + 10);

      // Generate table based on type
      if (this.currentType === "iridesse-report") {
        this.generateIridessePDF(doc, dataForPDF);
      } else {
        this.generateDailyReportPDF(doc, dataForPDF);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal membuat PDF: " + error.message);
    }
  }

  generateIridessePDF(doc, data = null) {
    const pdfData = data || this.currentData;
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

    const tableData = pdfData.map((item) => {
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
        this.formatNumber(item.jumlahCetak || 0),
        this.formatNumber(item.jumlahOk || 0),
        this.formatNumber(item.ng || 0),
        this.formatNumber(totalCetak),
        item.timeStart || "-",
        item.timeFinish || "-",
        this.formatNumber(item.startBilling || 0),
        this.formatNumber(item.finishBilling || 0),
        this.formatNumber(billing),
        this.formatNumber(gap),
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

  generateDailyReportPDF(doc, data = null) {
    const pdfData = data || this.currentData;
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

    const tableData = pdfData.map((item) => [
      item.nomor || "",
      new Date(item.tanggal).toLocaleDateString("id-ID"),
      this.formatNumber(item.qtyPo || 0),
      item.jenisBahan || "-",
      item.jenisPekerjaan || "-",
      item.client || "-",
      item.spesifikasi || "-",
      this.formatNumber(item.qtyCetakOk || 0),
      this.formatNumber(item.qtyCetakNg || 0),
      this.formatNumber(item.totalQtyCetakAll || 0),
      item.satuanCetak || "LEMBAR PLANO",
      item.waktuStart || "-",
      item.waktuFinish || "-",
      item.noSpk || "-",
      item.keterangan || "-",
    ]);

    // Calculate totals for summary row
    const totalQtyCetakOk = pdfData.reduce(
      (total, item) => total + (Number(item.qtyCetakOk) || 0),
      0
    );
    const totalQtyCetakNg = pdfData.reduce(
      (total, item) => total + (Number(item.qtyCetakNg) || 0),
      0
    );
    const totalQtyCetakAll = pdfData.reduce(
      (total, item) => total + (Number(item.totalQtyCetakAll) || 0),
      0
    );

    // Add total summary row
    tableData.push([
      "",
      "",
      "",
      "",
      "",
      "",
      "TOTAL AKUMULASI:",
      this.formatNumber(totalQtyCetakOk),
      this.formatNumber(totalQtyCetakNg),
      this.formatNumber(totalQtyCetakAll),
      "",
      "",
      "",
      "",
      "",
    ]);

    // Calculate and add average row
    const avgQtyCetakOk =
      pdfData.length > 0 ? totalQtyCetakOk / pdfData.length : 0;
    const avgQtyCetakNg =
      pdfData.length > 0 ? totalQtyCetakNg / pdfData.length : 0;
    const avgQtyCetakAll =
      pdfData.length > 0 ? totalQtyCetakAll / pdfData.length : 0;

    tableData.push([
      "",
      "",
      "",
      "",
      "",
      "",
      "RATA-RATA:",
      this.formatNumber(Math.round(avgQtyCetakOk)),
      this.formatNumber(Math.round(avgQtyCetakNg)),
      this.formatNumber(Math.round(avgQtyCetakAll)),
      "",
      "",
      "",
      "",
      "",
    ]);

    // Add total records info
    const clientFilter = this.tableContainer.querySelector("#client-filter");
    const recordYPos = clientFilter && clientFilter.value ? 70 : 64;
    doc.text(`Total Record: ${pdfData.length} item`, 20, recordYPos);

    // Generate table in PDF
    const tableStartY = clientFilter && clientFilter.value ? 72 : 66;
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: tableStartY,
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
      // Special styling for total row and average row (last two rows)
      didParseCell: function (data) {
        // Check if this is the total row (second to last row)
        if (data.row.index === tableData.length - 2) {
          data.cell.styles.fillColor = [255, 243, 205]; // Light yellow background
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.fontSize = 8;
          data.cell.styles.textColor = [0, 0, 0];

          // Special colors for total columns
          if (data.column.index === 7) {
            // Qty Cetak OK column
            data.cell.styles.textColor = [40, 167, 69]; // Green
          } else if (data.column.index === 8) {
            // Qty Cetak NG column
            data.cell.styles.textColor = [220, 53, 69]; // Red
          } else if (data.column.index === 9) {
            // Total Qty column
            data.cell.styles.textColor = [0, 123, 255]; // Blue
          }
        }

        // Check if this is the average row (last row)
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = [209, 236, 241]; // Light blue background
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.fontSize = 8;
          data.cell.styles.textColor = [0, 0, 0];

          // Special colors for average columns
          if (data.column.index === 7) {
            // Qty Cetak OK column
            data.cell.styles.textColor = [40, 167, 69]; // Green
          } else if (data.column.index === 8) {
            // Qty Cetak NG column
            data.cell.styles.textColor = [220, 53, 69]; // Red
          } else if (data.column.index === 9) {
            // Total Qty column
            data.cell.styles.textColor = [0, 123, 255]; // Blue
          }
        }
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
