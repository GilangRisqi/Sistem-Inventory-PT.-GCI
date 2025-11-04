// Import jsPDF for PDF generation
import jsPDF from "jspdf";
import "jspdf-autotable";
import { AccessControl } from "../utils/AccessControl.js";
import { sweetAlert } from "../utils/SweetAlertUtil.js";

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
    if (
      !this.currentData ||
      (this.currentType !== "daily-report" &&
        this.currentType !== "strapless-report" &&
        this.currentType !== "lipat-report")
    ) {
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

          // Handle different report types for totals calculation
          if (this.currentType === "daily-report") {
            totalQtyCetakOk += Number(originalItem.qtyCetakOk) || 0;
            totalQtyCetakNg += Number(originalItem.qtyCetakNg) || 0;
            totalQtyCetakAll += Number(originalItem.totalQtyCetakAll) || 0;
          } else if (
            this.currentType === "strapless-report" ||
            this.currentType === "lipat-report"
          ) {
            totalQtyCetakOk += Number(originalItem.qtyOk) || 0;
            totalQtyCetakNg += Number(originalItem.qtyNg) || 0;
            totalQtyCetakAll += Number(originalItem.totalQty) || 0;
          }
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

      if (strongElements.length >= 3) {
        // Approach 1: Use the strong elements directly (assuming they're in order)
        const qtyCetakOkStrong = strongElements[0];
        const qtyCetakNgStrong = strongElements[1];
        const totalQtyStrong = strongElements[2];

        if (qtyCetakOkStrong) {
          const formattedOk = this.formatNumber(totalQtyCetakOk);
          qtyCetakOkStrong.textContent = formattedOk;
        }
        if (qtyCetakNgStrong) {
          const formattedNg = this.formatNumber(totalQtyCetakNg);
          qtyCetakNgStrong.textContent = formattedNg;
        }
        if (totalQtyStrong) {
          const formattedAll = this.formatNumber(totalQtyCetakAll);
          totalQtyStrong.textContent = formattedAll;
        }
      } else {
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

      if (avgStrongElements.length >= 3) {
        const avgQtyCetakOkStrong = avgStrongElements[0];
        const avgQtyCetakNgStrong = avgStrongElements[1];
        const avgTotalQtyStrong = avgStrongElements[2];

        if (avgQtyCetakOkStrong) {
          const formattedAvgOk = this.formatNumber(Math.round(avgQtyCetakOk));
          avgQtyCetakOkStrong.textContent = formattedAvgOk;
        }
        if (avgQtyCetakNgStrong) {
          const formattedAvgNg = this.formatNumber(Math.round(avgQtyCetakNg));
          avgQtyCetakNgStrong.textContent = formattedAvgNg;
        }
        if (avgTotalQtyStrong) {
          const formattedAvgAll = this.formatNumber(Math.round(avgQtyCetakAll));
          avgTotalQtyStrong.textContent = formattedAvgAll;
        }
      } else {
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
      const startDate = new Date(year, month - 1, 1); // First day of selected month
      const endDate = new Date(year, month, 0); // Last day of selected month

      // Set time untuk memastikan perbandingan yang tepat
      startDate.setHours(0, 0, 0, 0); // Start of day
      endDate.setHours(23, 59, 59, 999); // End of day

      console.log(`📅 User selected periode: ${periode}`);
      console.log(`📅 Calculated startDate: ${startDate.toISOString()}`);
      console.log(`📅 Calculated endDate: ${endDate.toISOString()}`);

      handler({
        tipe: this.tipeSelect.value,
        startDate: startDate,
        endDate: endDate,
      });
    });
  }

  generateBahanBakuTable(data) {
    // Sort data by tanggal (date) in ascending order
    const sortedData = [...data].sort((a, b) => {
      return new Date(a.tanggal) - new Date(b.tanggal);
    });

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
                    ${sortedData
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
      // Sort data by nomor (number) in ascending order
      const sortedData = [...data].sort((a, b) => {
        const nomorA = parseInt(a.nomor) || 0;
        const nomorB = parseInt(b.nomor) || 0;
        return nomorA - nomorB;
      });

      // Get unique clients from sorted data
      const uniqueClients = [
        ...new Set(
          sortedData
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
            ${sortedData
              .map(
                (item) => `
              <tr data-id="${
                item.id
              }" data-type="daily-report" class="table-row">
                <td class="editable" data-field="nomor" data-type="number" data-value="${
                  item.nomor || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: center; max-width: 50px;">${
                  item.nomor !== undefined &&
                  item.nomor !== null &&
                  item.nomor !== ""
                    ? item.nomor
                    : "-"
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

  generateStraplessReportTable(data) {
    try {
      // Sort data by nomor (number) in ascending order
      const sortedData = [...data].sort((a, b) => {
        const nomorA = parseInt(a.nomor) || 0;
        const nomorB = parseInt(b.nomor) || 0;
        return nomorA - nomorB;
      });

      // Get unique clients from sorted data
      const uniqueClients = [
        ...new Set(
          sortedData
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
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 60px;">No.</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 100px;">Tanggal</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Operator</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 150px;">Jenis Pekerjaan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Client</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 100px;">Time Start</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 100px;">Time Finish</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">QTY OK</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">QTY NG</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Total QTY</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Satuan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Proses Selanjutnya</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 150px;">Keterangan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${sortedData
              .map(
                (item) => `
              <tr data-id="${
                item.id
              }" data-type="strapless-report" class="table-row">
                <td class="editable" data-field="nomor" data-type="number" data-value="${
                  item.nomor || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: center;">${
                  item.nomor || "-"
                }</td>
                <td class="editable" data-field="tanggal" data-type="date" data-value="${this.formatDateForInput(
                  item.tanggal
                )}" style="padding: 6px 4px; font-size: 12px; text-align: left;">${new Date(
                  item.tanggal
                ).toLocaleDateString("id-ID")}</td>
                <td class="editable" data-field="operator" data-type="text" data-value="${
                  item.operator || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.operator || "-"
                }</td>
                <td class="editable" data-field="jenisPekerjaan" data-type="text" data-value="${
                  item.jenisPekerjaan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.jenisPekerjaan || "-"
                }</td>
                <td class="editable" data-field="client" data-type="text" data-value="${
                  item.client || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.client || "-"
                }</td>
                <td class="editable" data-field="timeStart" data-type="time" data-value="${
                  item.timeStart || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.timeStart || "-"
                }</td>
                <td class="editable" data-field="timeFinish" data-type="time" data-value="${
                  item.timeFinish || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.timeFinish || "-"
                }</td>
                <td class="editable" data-field="qtyOk" data-type="number" data-value="${
                  item.qtyOk || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: right;">${this.formatNumber(
                  item.qtyOk || 0
                )}</td>
                <td class="editable" data-field="qtyNg" data-type="number" data-value="${
                  item.qtyNg || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: right;">${this.formatNumber(
                  item.qtyNg || 0
                )}</td>
                <td class="non-editable" style="padding: 6px 4px; font-size: 12px; text-align: right;"><strong>${this.formatNumber(
                  item.totalQty || 0
                )}</strong></td>
                <td class="editable" data-field="satuan" data-type="select" data-value="${
                  item.satuan || "PCS"
                }" data-options="PCS,LEMBAR,METER,ROLL,SET" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.satuan || "PCS"
                }</td>
                <td class="editable" data-field="prosesSelanjutnya" data-type="text" data-value="${
                  item.prosesSelanjutnya || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.prosesSelanjutnya || "-"
                }</td>
                <td class="editable" data-field="keterangan" data-type="text" data-value="${
                  item.keterangan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.keterangan || "-"
                }</td>
                <td style="padding: 6px 4px; font-size: 12px; text-align: center;">
                  <button class="btn btn-sm btn-primary edit-btn" data-id="${
                    item.id
                  }" data-type="strapless-report">Edit</button>
                  <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                    item.id
                  }" data-type="strapless-report" style="display: none;">Simpan</button>
                  <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                    item.id
                  }" data-type="strapless-report" style="display: none;">Batal</button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${
                    item.id
                  }" data-type="strapless-report">Hapus</button>
                </td>
              </tr>
            `
              )
              .join("")}
            
            <!-- Baris Total Akumulasi -->
            <tr class="table-warning" style="background-color: #fff3cd; font-weight: bold; border: 2px solid #ffc107;">
              <td colspan="6" style="padding: 10px 6px; font-size: 13px; text-align: right; font-weight: bold; background-color: #fff3cd;">
                <strong>TOTAL AKUMULASI:</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #28a745;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.qtyOk) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #dc3545;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.qtyNg) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #007bff;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.totalQty) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td colspan="4" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #fff3cd;">
                -
              </td>
            </tr>
            
            <!-- Baris Rata-rata -->
            <tr class="table-info" style="background-color: #d1ecf1; font-weight: bold; border: 2px solid #17a2b8;">
              <td colspan="6" style="padding: 10px 6px; font-size: 13px; text-align: right; font-weight: bold; background-color: #d1ecf1;">
                <strong>RATA-RATA:</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #d1ecf1; color: #28a745;">
                <strong>${this.formatNumber(
                  Math.round(
                    data.length > 0
                      ? data.reduce(
                          (total, item) => total + (Number(item.qtyOk) || 0),
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
                          (total, item) => total + (Number(item.qtyNg) || 0),
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
                          (total, item) => total + (Number(item.totalQty) || 0),
                          0
                        ) / data.length
                      : 0
                  )
                )}</strong>
              </td>
              <td colspan="4" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #d1ecf1;">
                -
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      `;

      return tableHtml;
    } catch (error) {
      console.error("❌ Error generating strapless report table:", error);
      return "<p>Error generating table</p>";
    }
  }

  generateLipatReportTable(data) {
    try {
      // Sort data by nomor (number) in ascending order
      const sortedData = [...data].sort((a, b) => {
        const nomorA = parseInt(a.nomor) || 0;
        const nomorB = parseInt(b.nomor) || 0;
        return nomorA - nomorB;
      });

      // Get unique clients from sorted data
      const uniqueClients = [
        ...new Set(
          sortedData
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
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 60px;">No.</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 100px;">Tanggal</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Operator</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 150px;">Jenis Pekerjaan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Client</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Produk</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Terima Dari</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 100px;">Time Start</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 100px;">Time Finish</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">QTY OK</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">QTY NG</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Total QTY</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Satuan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Proses Selanjutnya</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 150px;">Keterangan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${sortedData
              .map(
                (item) => `
              <tr data-id="${
                item.id
              }" data-type="lipat-report" class="table-row">
                <td class="editable" data-field="nomor" data-type="number" data-value="${
                  item.nomor || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: center;">${
                  item.nomor || "-"
                }</td>
                <td class="editable" data-field="tanggal" data-type="date" data-value="${this.formatDateForInput(
                  item.tanggal
                )}" style="padding: 6px 4px; font-size: 12px; text-align: left;">${new Date(
                  item.tanggal
                ).toLocaleDateString("id-ID")}</td>
                <td class="editable" data-field="operator" data-type="text" data-value="${
                  item.operator || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.operator || "-"
                }</td>
                <td class="editable" data-field="jenisPekerjaan" data-type="text" data-value="${
                  item.jenisPekerjaan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.jenisPekerjaan || "-"
                }</td>
                <td class="editable" data-field="client" data-type="text" data-value="${
                  item.client || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.client || "-"
                }</td>
                <td class="editable" data-field="produk" data-type="text" data-value="${
                  item.produk || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.produk || "-"
                }</td>
                <td class="editable" data-field="terimaDari" data-type="text" data-value="${
                  item.terimaDari || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.terimaDari || "-"
                }</td>
                <td class="editable" data-field="timeStart" data-type="time" data-value="${
                  item.timeStart || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: center;">${
                  item.timeStart || "-"
                }</td>
                <td class="editable" data-field="timeFinish" data-type="time" data-value="${
                  item.timeFinish || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: center;">${
                  item.timeFinish || "-"
                }</td>
                <td class="editable" data-field="qtyOk" data-type="number" data-value="${
                  item.qtyOk || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: right; color: #28a745; font-weight: 600;">${this.formatNumber(
                  item.qtyOk || 0
                )}</td>
                <td class="editable" data-field="qtyNg" data-type="number" data-value="${
                  item.qtyNg || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: right; color: #dc3545; font-weight: 600;">${this.formatNumber(
                  item.qtyNg || 0
                )}</td>
                <td style="padding: 6px 4px; font-size: 12px; text-align: right; color: #007bff; font-weight: 700;">${this.formatNumber(
                  (item.qtyOk || 0) + (item.qtyNg || 0)
                )}</td>
                <td class="editable" data-field="satuan" data-type="select" data-options="PCS,LEMBAR,METER,ROLL,SET" data-value="${
                  item.satuan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: center;">${
                  item.satuan || "-"
                }</td>
                <td class="editable" data-field="prosesSelanjutnya" data-type="text" data-value="${
                  item.prosesSelanjutnya || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.prosesSelanjutnya || "-"
                }</td>
                <td class="editable" data-field="keterangan" data-type="textarea" data-value="${
                  item.keterangan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 200px; word-wrap: break-word;">${
                  item.keterangan || "-"
                }</td>
                <td style="padding: 6px 4px; font-size: 12px; text-align: center;">
                  <button class="btn btn-sm btn-warning edit-btn" data-id="${
                    item.id
                  }" data-type="lipat-report">Edit</button>
                  <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                    item.id
                  }" data-type="lipat-report" style="display: none;">Simpan</button>
                  <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                    item.id
                  }" data-type="lipat-report" style="display: none;">Batal</button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${
                    item.id
                  }" data-type="lipat-report">Hapus</button>
                </td>
              </tr>
            `
              )
              .join("")}
            
            <!-- Baris Total Akumulasi -->
            <tr class="table-warning" style="background-color: #fff3cd; font-weight: bold; border: 2px solid #ffc107;">
              <td colspan="8" style="padding: 10px 6px; font-size: 13px; text-align: right; font-weight: bold; background-color: #fff3cd;">
                <strong>TOTAL AKUMULASI:</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #28a745;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.qtyOk) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #dc3545;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.qtyNg) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #007bff;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.totalQty) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td colspan="4" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #fff3cd;">
                -
              </td>
            </tr>
            
            <!-- Baris Rata-rata -->
            <tr class="table-info" style="background-color: #d1ecf1; font-weight: bold; border: 2px solid #17a2b8;">
              <td colspan="8" style="padding: 10px 6px; font-size: 13px; text-align: right; font-weight: bold; background-color: #d1ecf1;">
                <strong>RATA-RATA:</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #d1ecf1; color: #28a745;">
                <strong>${this.formatNumber(
                  Math.round(
                    data.length > 0
                      ? data.reduce(
                          (total, item) => total + (Number(item.qtyOk) || 0),
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
                          (total, item) => total + (Number(item.qtyNg) || 0),
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
                          (total, item) => total + (Number(item.totalQty) || 0),
                          0
                        ) / data.length
                      : 0
                  )
                )}</strong>
              </td>
              <td colspan="4" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #d1ecf1;">
                -
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      `;

      return tableHtml;
    } catch (error) {
      console.error("❌ Error generating lipat report table:", error);
      return "<p>Error generating table</p>";
    }
  }

  generateLemPackingReportTable(data) {
    try {
      // Sort data by nomor (number) in ascending order
      const sortedData = [...data].sort((a, b) => {
        const nomorA = parseInt(a.nomor) || 0;
        const nomorB = parseInt(b.nomor) || 0;
        return nomorA - nomorB;
      });

      const tableHtml = `
        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover" style="width: 100%; max-width: 100%; border-collapse: collapse; table-layout: auto; font-size: 14px;">
            <thead class="table-dark">
            <tr>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 60px;">No.</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 100px;">Tanggal</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Operator</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 150px;">Jenis Pekerjaan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 100px;">Time Start</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 100px;">Time Finish</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">QTY OK</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">QTY NG</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 80px;">Total QTY</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">No. SPK</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 150px;">Keterangan</th>
              <th style="padding: 8px 6px; font-size: 12px; text-align: center; white-space: nowrap; min-width: 120px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${sortedData
              .map(
                (item) => `
              <tr data-id="${
                item.id
              }" data-type="lem-packing-report" class="table-row">
                <td class="editable" data-field="nomor" data-type="number" data-value="${
                  item.nomor || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: center;">${
                  item.nomor || "-"
                }</td>
                <td class="editable" data-field="tanggal" data-type="date" data-value="${this.formatDateForInput(
                  item.tanggal
                )}" style="padding: 6px 4px; font-size: 12px; text-align: left;">${new Date(
                  item.tanggal
                ).toLocaleDateString("id-ID")}</td>
                <td class="editable" data-field="operator" data-type="text" data-value="${
                  item.operator || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.operator || "-"
                }</td>
                <td class="editable" data-field="jenisPekerjaan" data-type="text" data-value="${
                  item.jenisPekerjaan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.jenisPekerjaan || "-"
                }</td>
                <td class="editable" data-field="timeStart" data-type="time" data-value="${
                  item.timeStart || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: center;">${
                  item.timeStart || "-"
                }</td>
                <td class="editable" data-field="timeFinish" data-type="time" data-value="${
                  item.timeFinish || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: center;">${
                  item.timeFinish || "-"
                }</td>
                <td class="editable" data-field="qtyOk" data-type="number" data-value="${
                  item.qtyOk || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: right; color: #28a745; font-weight: 600;">${this.formatNumber(
                  item.qtyOk || 0
                )}</td>
                <td class="editable" data-field="qtyNg" data-type="number" data-value="${
                  item.qtyNg || 0
                }" style="padding: 6px 4px; font-size: 12px; text-align: right; color: #dc3545; font-weight: 600;">${this.formatNumber(
                  item.qtyNg || 0
                )}</td>
                <td style="padding: 6px 4px; font-size: 12px; text-align: right; color: #007bff; font-weight: 700;">${this.formatNumber(
                  (item.qtyOk || 0) + (item.qtyNg || 0)
                )}</td>
                <td class="editable" data-field="noSpk" data-type="text" data-value="${
                  item.noSpk || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left;">${
                  item.noSpk || "-"
                }</td>
                <td class="editable" data-field="keterangan" data-type="textarea" data-value="${
                  item.keterangan || ""
                }" style="padding: 6px 4px; font-size: 12px; text-align: left; max-width: 200px; word-wrap: break-word;">${
                  item.keterangan || "-"
                }</td>
                <td style="padding: 6px 4px; font-size: 12px; text-align: center;">
                  <button class="btn btn-sm btn-warning edit-btn" data-id="${
                    item.id
                  }" data-type="lem-packing-report">Edit</button>
                  <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                    item.id
                  }" data-type="lem-packing-report" style="display: none;">Simpan</button>
                  <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                    item.id
                  }" data-type="lem-packing-report" style="display: none;">Batal</button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${
                    item.id
                  }" data-type="lem-packing-report">Hapus</button>
                </td>
              </tr>
            `
              )
              .join("")}
            
            <!-- Baris Total Akumulasi -->
            <tr class="table-warning" style="background-color: #fff3cd; font-weight: bold; border: 2px solid #ffc107;">
              <td colspan="6" style="padding: 10px 6px; font-size: 13px; text-align: right; font-weight: bold; background-color: #fff3cd;">
                <strong>TOTAL AKUMULASI:</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #28a745;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.qtyOk) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #dc3545;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.qtyNg) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #007bff;">
                <strong>${this.formatNumber(
                  data.reduce(
                    (total, item) => total + (Number(item.totalQty) || 0),
                    0
                  )
                )}</strong>
              </td>
              <td colspan="3" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #fff3cd;">
                -
              </td>
            </tr>
            
            <!-- Baris Rata-rata -->
            <tr class="table-info" style="background-color: #d1ecf1; font-weight: bold; border: 2px solid #17a2b8;">
              <td colspan="6" style="padding: 10px 6px; font-size: 13px; text-align: right; font-weight: bold; background-color: #d1ecf1;">
                <strong>RATA-RATA:</strong>
              </td>
              <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #d1ecf1; color: #28a745;">
                <strong>${this.formatNumber(
                  Math.round(
                    data.length > 0
                      ? data.reduce(
                          (total, item) => total + (Number(item.qtyOk) || 0),
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
                          (total, item) => total + (Number(item.qtyNg) || 0),
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
                          (total, item) => total + (Number(item.totalQty) || 0),
                          0
                        ) / data.length
                      : 0
                  )
                )}</strong>
              </td>
              <td colspan="3" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #d1ecf1;">
                -
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      `;

      return tableHtml;
    } catch (error) {
      console.error("❌ Error generating lem packing report table:", error);
      return "<p>Error generating table</p>";
    }
  }

  generateIridesseReportTable(data) {
    // Sort data dari terlama ke terbaru berdasarkan tanggal
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.tanggal);
      const dateB = new Date(b.tanggal);
      return dateA - dateB; // Ascending order (terlama ke terbaru)
    });

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
                    ${sortedData
                      .map((item) => {
                        const totalCetak =
                          (Number(item.jumlahCetak) || 0) +
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
                  
                  <!-- Baris Total Akumulasi -->
                  <tr class="table-warning" style="background-color: #fff3cd; font-weight: bold; border: 2px solid #ffc107;">
                    <td colspan="7" style="padding: 10px 6px; font-size: 13px; text-align: right; font-weight: bold; background-color: #fff3cd;">
                      <strong>TOTAL AKUMULASI:</strong>
                    </td>
                    <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #28a745;">
                      <strong>${this.formatNumber(
                        sortedData.reduce(
                          (total, item) =>
                            total + (Number(item.jumlahCetak) || 0),
                          0
                        )
                      )}</strong>
                    </td>
                    <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #dc3545;">
                      <strong>${this.formatNumber(
                        sortedData.reduce(
                          (total, item) => total + (Number(item.ng) || 0),
                          0
                        )
                      )}</strong>
                    </td>
                    <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #fff3cd; color: #007bff;">
                      <strong>${this.formatNumber(
                        sortedData.reduce(
                          (total, item) =>
                            total +
                            ((Number(item.jumlahCetak) || 0) +
                              (Number(item.ng) || 0)),
                          0
                        )
                      )}</strong>
                    </td>
                    <td colspan="8" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #fff3cd;">
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
                          sortedData.length > 0
                            ? sortedData.reduce(
                                (total, item) =>
                                  total + (Number(item.jumlahCetak) || 0),
                                0
                              ) / sortedData.length
                            : 0
                        )
                      )}</strong>
                    </td>
                    <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #d1ecf1; color: #dc3545;">
                      <strong>${this.formatNumber(
                        Math.round(
                          sortedData.length > 0
                            ? sortedData.reduce(
                                (total, item) => total + (Number(item.ng) || 0),
                                0
                              ) / sortedData.length
                            : 0
                        )
                      )}</strong>
                    </td>
                    <td style="padding: 10px 6px; font-size: 13px; text-align: center; font-weight: bold; background-color: #d1ecf1; color: #007bff;">
                      <strong>${this.formatNumber(
                        Math.round(
                          sortedData.length > 0
                            ? sortedData.reduce(
                                (total, item) =>
                                  total +
                                  ((Number(item.jumlahCetak) || 0) +
                                    (Number(item.ng) || 0)),
                                0
                              ) / sortedData.length
                            : 0
                        )
                      )}</strong>
                    </td>
                    <td colspan="8" style="padding: 10px 6px; font-size: 13px; text-align: center; background-color: #d1ecf1;">
                      -
                    </td>
                  </tr>
                  
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
    } else if (tipe === "strapless-report") {
      html = this.generateStraplessReportTable(data);
    } else if (tipe === "lipat-report") {
      html = this.generateLipatReportTable(data);
    } else if (tipe === "lem-packing-report") {
      html = this.generateLemPackingReportTable(data);
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

    // Apply access control to hide edit/delete buttons for operators
    setTimeout(() => {
      AccessControl.applyTableAccessControl(this.tableContainer);
    }, 100);
  }

  createDownloadButton(tipe) {
    let typeLabel = "Daily Report Mesin Offset";
    if (tipe === "bahan-baku") {
      typeLabel = "Bahan Baku";
    } else if (tipe === "iridesse-report") {
      typeLabel = "Iridesse";
    } else if (tipe === "strapless-report") {
      typeLabel = "Daily Report Mesin Strapless";
    } else if (tipe === "lipat-report") {
      typeLabel = "Daily Report Mesin Lipat";
    } else if (tipe === "lem-packing-report") {
      typeLabel = "Daily Report Mesin Lem Packing Case";
    }

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
      // Check access control first
      if (!AccessControl.preventOperatorActions(e)) {
        return;
      }

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

        sweetAlert
          .confirm(
            "Data yang dihapus tidak dapat dikembalikan lagi.",
            "Apakah Anda yakin ingin menghapus data ini?",
            {
              confirmButtonText: "Ya, Hapus!",
              cancelButtonText: "Batal",
            }
          )
          .then((result) => {
            if (result.isConfirmed && this.deleteHandler) {
              this.deleteHandler(id, type);
            }
          });
      }
    };

    this.tableContainer.addEventListener("click", this.handleTableClick);
  }

  startEdit(id, type) {
    let row; // Declare row variable outside try block

    try {
      // Find the row being edited
      row = this.tableContainer.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (!row) {
        console.error(`Row not found for id: ${id}, type: ${type}`);
        sweetAlert.error(
          `Baris tidak ditemukan untuk ID: ${id}`,
          "Data Tidak Ditemukan"
        );
        return;
      }

      // Show save/cancel buttons, hide edit button for this row
      const editBtn = row.querySelector(".edit-btn");
      const saveBtn = row.querySelector(".save-btn");
      const cancelBtn = row.querySelector(".cancel-btn");

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
      if (
        type === "iridesse-report" ||
        type === "daily-report" ||
        type === "strapless-report" ||
        type === "lipat-report" ||
        type === "lem-packing-report"
      ) {
        const editableCells = row.querySelectorAll(".editable");
        editableCells.forEach((cell, index) => {
          const value = cell.dataset.value || cell.textContent.trim();
          const field = cell.dataset.field;
          const dataType = cell.dataset.type;

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

          cell.innerHTML = "";
          cell.appendChild(input);
        });
      }
    } catch (error) {
      console.error("Error in startEdit:", error);
      sweetAlert.error(`Gagal masuk mode edit: ${error.message}`, "Error Edit");
      return;
    }
  }

  saveEdit(id, type) {
    if (
      type === "iridesse-report" ||
      type === "daily-report" ||
      type === "strapless-report" ||
      type === "lipat-report" ||
      type === "lem-packing-report"
    ) {
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
    if (
      type === "iridesse-report" ||
      type === "daily-report" ||
      type === "strapless-report" ||
      type === "lipat-report" ||
      type === "lem-packing-report"
    ) {
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
            field === "qtyOk" ||
            field === "qtyNg" ||
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
      let dataForPDF = this.filteredData || this.currentData;

      if (!dataForPDF || dataForPDF.length === 0) {
        sweetAlert.warning("Tidak ada data untuk dicetak", "Data Kosong");
        return;
      }

      // Sort data by nomor (ascending) untuk semua tipe report
      dataForPDF = [...dataForPDF].sort((a, b) => {
        const nomA = parseInt(a.nomor) || 0;
        const nomB = parseInt(b.nomor) || 0;
        return nomA - nomB;
      });

      console.log(
        `📄 PDF: Sorted ${dataForPDF.length} records by nomor (ascending)`
      );
      console.log(
        `📄 PDF: First record nomor: ${
          dataForPDF[0]?.nomor
        }, Last record nomor: ${dataForPDF[dataForPDF.length - 1]?.nomor}`
      );

      // Create PDF
      const doc = new window.jspdf.jsPDF({ orientation: "landscape" });

      // Add company header
      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      doc.text("PT. GCI (Garasi Creasindo Indonesia)", 20, 20);

      // Add report title
      let title = "Laporan Daily Report Mesin Offset";
      if (this.currentType === "iridesse-report") {
        title = "Laporan Iridesse Report";
      } else if (this.currentType === "strapless-report") {
        title = "Laporan Daily Report Mesin Strapless";
      } else if (this.currentType === "lipat-report") {
        title = "Laporan Daily Report Mesin Lipat";
      } else if (this.currentType === "lem-packing-report") {
        title = "Laporan Daily Report Mesin Lem Packing Case";
      }
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
      } else if (this.currentType === "strapless-report") {
        this.generateStraplessReportPDF(doc, dataForPDF);
      } else if (this.currentType === "lipat-report") {
        this.generateLipatReportPDF(doc, dataForPDF);
      } else if (this.currentType === "lem-packing-report") {
        this.generateLemPackingReportPDF(doc, dataForPDF);
      } else {
        this.generateDailyReportPDF(doc, dataForPDF);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      sweetAlert.error("Gagal membuat PDF: " + error.message, "Error PDF");
    }
  }

  generateIridessePDF(doc, data = null) {
    const originalData = data || this.currentData;
    // Sort data dari terlama ke terbaru berdasarkan tanggal
    const pdfData = [...originalData].sort((a, b) => {
      const dateA = new Date(a.tanggal);
      const dateB = new Date(b.tanggal);
      return dateA - dateB; // Ascending order (terlama ke terbaru)
    });

    const headers = [
      "Tanggal",
      "No SPK",
      "Nama Client",
      "Nama Pekerjaan",
      "Jenis Kertas",
      "Ukuran Kertas",
      "Jenis Print",
      "Jumlah Cetak OK",
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
        (Number(item.jumlahCetak) || 0) + (Number(item.ng) || 0);

      return [
        new Date(item.tanggal).toLocaleDateString("id-ID"),
        item.noSpk || "-",
        item.namaClient || "-",
        item.namaPekerjaan || "-",
        item.jenisKertas || "-",
        item.ukuranKertas || "-",
        item.jenisPrint || "-",
        this.formatNumber(item.jumlahCetak || 0), // Jumlah Cetak OK
        this.formatNumber(item.ng || 0),
        this.formatNumber(totalCetak),
        item.timeStart || "-",
        item.timeFinish || "-",
        this.formatNumber(item.startBilling || 0),
        this.formatNumber(item.finishBilling || 0),
        this.formatNumber(item.billing || 0), // Menggunakan nilai billing dari database
        this.formatNumber(item.gap || 0), // Menggunakan nilai gap dari database
        item.status || "-",
      ];
    });

    // Add total records info
    doc.text(`Total Record: ${tableData.length} item`, 20, 64);

    // Calculate totals for summary rows
    const totalJumlahCetak = pdfData.reduce(
      (total, item) => total + (Number(item.jumlahCetak) || 0),
      0
    );
    const totalNg = pdfData.reduce(
      (total, item) => total + (Number(item.ng) || 0),
      0
    );
    const totalAllCetak = pdfData.reduce(
      (total, item) =>
        total + ((Number(item.jumlahCetak) || 0) + (Number(item.ng) || 0)),
      0
    );

    // Add total summary row
    const totalRow = [
      "",
      "",
      "",
      "",
      "",
      "",
      "TOTAL AKUMULASI:",
      this.formatNumber(totalJumlahCetak), // Jumlah Cetak OK
      this.formatNumber(totalNg), // Jumlah NG
      this.formatNumber(totalAllCetak), // Total Cetak
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    // Add average summary row
    const avgRow = [
      "",
      "",
      "",
      "",
      "",
      "",
      "RATA-RATA:",
      this.formatNumber(
        Math.round(pdfData.length > 0 ? totalJumlahCetak / pdfData.length : 0)
      ), // Jumlah Cetak OK
      this.formatNumber(
        Math.round(pdfData.length > 0 ? totalNg / pdfData.length : 0)
      ), // Jumlah NG
      this.formatNumber(
        Math.round(pdfData.length > 0 ? totalAllCetak / pdfData.length : 0)
      ), // Total Cetak
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    // Add summary rows to table data
    tableData.push(totalRow);
    tableData.push(avgRow);

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
      bodyStyles: {
        fontSize: 7,
      },
      didParseCell: function (data) {
        // Style for total row
        if (data.row.index === tableData.length - 2) {
          data.cell.styles.fillColor = [255, 243, 205]; // Light yellow
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.textColor = [0, 0, 0];
        }
        // Style for average row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = [209, 236, 241]; // Light blue
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.textColor = [0, 0, 0];
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
    const filename = `Laporan_Iridesse_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(filename);
    sweetAlert.pdfSuccess(filename);
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
    sweetAlert.pdfSuccess(filename);
  }

  generateStraplessReportPDF(doc, data = null) {
    const pdfData = data || this.currentData;
    const headers = [
      "No",
      "Tanggal",
      "Operator",
      "Jenis Pekerjaan",
      "Time Start",
      "Time Finish",
      "QTY OK",
      "QTY NG",
      "Total QTY",
      "Satuan",
      "Proses Selanjutnya",
      "Keterangan",
    ];

    const tableData = pdfData.map((item) => [
      item.nomor || "",
      new Date(item.tanggal).toLocaleDateString("id-ID"),
      item.operator || "-",
      item.jenisPekerjaan || "-",
      item.timeStart || "-",
      item.timeFinish || "-",
      this.formatNumber(item.qtyOk || 0),
      this.formatNumber(item.qtyNg || 0),
      this.formatNumber(item.totalQty || 0),
      item.satuan || "PCS",
      item.prosesSelanjutnya || "-",
      item.keterangan || "-",
    ]);

    // Calculate totals for summary row
    const totalQtyOk = pdfData.reduce(
      (total, item) => total + (Number(item.qtyOk) || 0),
      0
    );
    const totalQtyNg = pdfData.reduce(
      (total, item) => total + (Number(item.qtyNg) || 0),
      0
    );
    const totalQtyAll = pdfData.reduce(
      (total, item) => total + (Number(item.totalQty) || 0),
      0
    );

    // Add total summary row
    tableData.push([
      "",
      "",
      "",
      "",
      "",
      "TOTAL AKUMULASI:",
      this.formatNumber(totalQtyOk),
      this.formatNumber(totalQtyNg),
      this.formatNumber(totalQtyAll),
      "",
      "",
      "",
    ]);

    // Calculate and add average row
    const avgQtyOk = pdfData.length > 0 ? totalQtyOk / pdfData.length : 0;
    const avgQtyNg = pdfData.length > 0 ? totalQtyNg / pdfData.length : 0;
    const avgQtyAll = pdfData.length > 0 ? totalQtyAll / pdfData.length : 0;

    tableData.push([
      "",
      "",
      "",
      "",
      "",
      "RATA-RATA:",
      this.formatNumber(Math.round(avgQtyOk)),
      this.formatNumber(Math.round(avgQtyNg)),
      this.formatNumber(Math.round(avgQtyAll)),
      "",
      "",
      "",
    ]);

    // Add total records info
    doc.text(`Total Record: ${pdfData.length} item`, 20, 64);

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
      // Special styling for total row and average row (last two rows)
      didParseCell: function (data) {
        // Check if this is the total row (second to last row)
        if (data.row.index === tableData.length - 2) {
          data.cell.styles.fillColor = [255, 243, 205]; // Light yellow background
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.fontSize = 8;
          data.cell.styles.textColor = [0, 0, 0];

          // Special colors for total columns
          if (data.column.index === 6) {
            // QTY OK column
            data.cell.styles.textColor = [40, 167, 69]; // Green
          } else if (data.column.index === 7) {
            // QTY NG column
            data.cell.styles.textColor = [220, 53, 69]; // Red
          } else if (data.column.index === 8) {
            // Total QTY column
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
          if (data.column.index === 6) {
            // QTY OK column
            data.cell.styles.textColor = [40, 167, 69]; // Green
          } else if (data.column.index === 7) {
            // QTY NG column
            data.cell.styles.textColor = [220, 53, 69]; // Red
          } else if (data.column.index === 8) {
            // Total QTY column
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
    const filename = `Laporan_Daily_Report_Strapless_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(filename);
    sweetAlert.pdfSuccess(filename);
  }

  generateLipatReportPDF(doc, data = null) {
    const pdfData = data || this.currentData;
    const headers = [
      "No",
      "Tanggal",
      "Operator",
      "Jenis Pekerjaan",
      "Produk",
      "Terima Dari",
      "Time Start",
      "Time Finish",
      "QTY OK",
      "QTY NG",
      "Total QTY",
      "Satuan",
      "Proses Selanjutnya",
      "Keterangan",
    ];

    const tableData = pdfData.map((item) => [
      item.nomor || "",
      new Date(item.tanggal).toLocaleDateString("id-ID"),
      item.operator || "-",
      item.jenisPekerjaan || "-",
      item.produk || "-",
      item.terimaDari || "-",
      item.timeStart || "-",
      item.timeFinish || "-",
      this.formatNumber(item.qtyOk || 0),
      this.formatNumber(item.qtyNg || 0),
      this.formatNumber(item.totalQty || 0),
      item.satuan || "-",
      item.prosesSelanjutnya || "-",
      item.keterangan || "-",
    ]);

    // Calculate totals
    const totalQtyOk = pdfData.reduce(
      (sum, item) => sum + (Number(item.qtyOk) || 0),
      0
    );
    const totalQtyNg = pdfData.reduce(
      (sum, item) => sum + (Number(item.qtyNg) || 0),
      0
    );
    const totalQtyAll = totalQtyOk + totalQtyNg;

    // Add total summary row
    tableData.push([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "TOTAL AKUMULASI:",
      this.formatNumber(totalQtyOk),
      this.formatNumber(totalQtyNg),
      this.formatNumber(totalQtyAll),
      "",
      "",
      "",
    ]);

    // Calculate and add average row
    const avgQtyOk = pdfData.length > 0 ? totalQtyOk / pdfData.length : 0;
    const avgQtyNg = pdfData.length > 0 ? totalQtyNg / pdfData.length : 0;
    const avgQtyAll = pdfData.length > 0 ? totalQtyAll / pdfData.length : 0;

    tableData.push([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "RATA-RATA:",
      this.formatNumber(Math.round(avgQtyOk)),
      this.formatNumber(Math.round(avgQtyNg)),
      this.formatNumber(Math.round(avgQtyAll)),
      "",
      "",
      "",
    ]);

    // Add total records info
    doc.text(`Total Record: ${pdfData.length} item`, 20, 64);

    // Generate table in PDF
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 66,
      styles: {
        fontSize: 6,
        cellPadding: 1.5,
      },
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 6,
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
          data.cell.styles.fontSize = 7;
          data.cell.styles.textColor = [0, 0, 0];

          // Special colors for total columns
          if (data.column.index === 8) {
            // QTY OK column
            data.cell.styles.textColor = [40, 167, 69]; // Green
          } else if (data.column.index === 9) {
            // QTY NG column
            data.cell.styles.textColor = [220, 53, 69]; // Red
          } else if (data.column.index === 10) {
            // Total QTY column
            data.cell.styles.textColor = [0, 123, 255]; // Blue
          }
        }

        // Check if this is the average row (last row)
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = [209, 236, 241]; // Light blue background
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.fontSize = 7;
          data.cell.styles.textColor = [0, 0, 0];

          // Special colors for average columns
          if (data.column.index === 8) {
            // QTY OK column
            data.cell.styles.textColor = [40, 167, 69]; // Green
          } else if (data.column.index === 9) {
            // QTY NG column
            data.cell.styles.textColor = [220, 53, 69]; // Red
          } else if (data.column.index === 10) {
            // Total QTY column
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
    const filename = `Laporan_Daily_Report_Lipat_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(filename);
    sweetAlert.pdfSuccess(filename);
  }

  generateLemPackingReportPDF(doc, data = null) {
    try {
      if (!data || data.length === 0) {
        console.warn("No data for Lem Packing Report PDF generation");
        return;
      }

      // Note: Header is already added in main exportToPDF method
      // No need to duplicate header here

      // Prepare table data
      let tableData = [];

      // Data rows
      data.forEach((item) => {
        const qtyOk = Number(item.qtyOk) || 0;
        const qtyNg = Number(item.qtyNg) || 0;
        const totalQty = qtyOk + qtyNg;

        tableData.push([
          item.nomor || "-",
          new Date(item.tanggal).toLocaleDateString("id-ID"),
          item.operator || "-",
          item.jenisPekerjaan || "-",
          item.timeStart || "-",
          item.timeFinish || "-",
          this.formatNumber(qtyOk),
          this.formatNumber(qtyNg),
          this.formatNumber(totalQty),
          item.noSpk || "-",
          item.keterangan || "-",
        ]);
      });

      // Calculate totals
      const totalOk = data.reduce(
        (sum, item) => sum + (Number(item.qtyOk) || 0),
        0
      );
      const totalNg = data.reduce(
        (sum, item) => sum + (Number(item.qtyNg) || 0),
        0
      );
      const grandTotal = totalOk + totalNg;

      // Calculate averages
      const avgOk = data.length > 0 ? Math.round(totalOk / data.length) : 0;
      const avgNg = data.length > 0 ? Math.round(totalNg / data.length) : 0;
      const avgTotal =
        data.length > 0 ? Math.round(grandTotal / data.length) : 0;

      // Add total row
      tableData.push([
        "TOTAL:",
        "-",
        "-",
        "-",
        "-",
        "-",
        this.formatNumber(totalOk),
        this.formatNumber(totalNg),
        this.formatNumber(grandTotal),
        "-",
        "-",
      ]);

      // Add average row
      tableData.push([
        "RATA-RATA:",
        "-",
        "-",
        "-",
        "-",
        "-",
        this.formatNumber(avgOk),
        this.formatNumber(avgNg),
        this.formatNumber(avgTotal),
        "-",
        "-",
      ]);

      // AutoTable configuration
      doc.autoTable({
        head: [
          [
            "No.",
            "Tanggal",
            "Operator",
            "Jenis Pekerjaan",
            "Start",
            "Finish",
            "QTY OK",
            "QTY NG",
            "Total",
            "No. SPK",
            "Keterangan",
          ],
        ],
        body: tableData,
        startY: 66,
        styles: {
          fontSize: 6,
          cellPadding: 2,
          halign: "center",
          valign: "middle",
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
        },
        headStyles: {
          fillColor: [52, 58, 64],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 6,
          halign: "center",
        },
        columnStyles: {
          0: { halign: "center", cellWidth: 12 }, // No.
          1: { halign: "center", cellWidth: 18 }, // Tanggal
          2: { halign: "left", cellWidth: 22 }, // Operator
          3: { halign: "left", cellWidth: 28 }, // Jenis Pekerjaan
          4: { halign: "center", cellWidth: 16 }, // Time Start
          5: { halign: "center", cellWidth: 16 }, // Time Finish
          6: { halign: "right", cellWidth: 18 }, // QTY OK
          7: { halign: "right", cellWidth: 18 }, // QTY NG
          8: { halign: "right", cellWidth: 18 }, // Total QTY
          9: { halign: "left", cellWidth: 22 }, // No. SPK
          10: { halign: "left", cellWidth: 25 }, // Keterangan
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250],
        },
        didParseCell: function (data) {
          // Check if this is the total row (second to last row)
          if (data.row.index === tableData.length - 2) {
            data.cell.styles.fillColor = [255, 243, 205]; // Yellow background
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.fontSize = 7;
            data.cell.styles.textColor = [0, 0, 0];

            // Special colors for total columns
            if (data.column.index === 6) {
              // QTY OK column
              data.cell.styles.textColor = [40, 167, 69]; // Green
            } else if (data.column.index === 7) {
              // QTY NG column
              data.cell.styles.textColor = [220, 53, 69]; // Red
            } else if (data.column.index === 8) {
              // Total QTY column
              data.cell.styles.textColor = [0, 123, 255]; // Blue
            }
          }

          // Check if this is the average row (last row)
          if (data.row.index === tableData.length - 1) {
            data.cell.styles.fillColor = [209, 236, 241]; // Light blue background
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.fontSize = 7;
            data.cell.styles.textColor = [0, 0, 0];

            // Special colors for average columns
            if (data.column.index === 6) {
              // QTY OK column
              data.cell.styles.textColor = [40, 167, 69]; // Green
            } else if (data.column.index === 7) {
              // QTY NG column
              data.cell.styles.textColor = [220, 53, 69]; // Red
            } else if (data.column.index === 8) {
              // Total QTY column
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
      const filename = `Laporan_Daily_Report_Lem_Packing_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(filename);
      sweetAlert.pdfSuccess(filename);
    } catch (error) {
      console.error("❌ Error generating Lem Packing Report PDF:", error);
      sweetAlert.error(
        "Terjadi kesalahan saat membuat PDF: " + error.message,
        "Error PDF"
      );
    }
  }

  showSuccess(message) {
    sweetAlert.success(message || "Operasi berhasil!", "Berhasil!");
  }

  showError(message) {
    sweetAlert.error(message, "Error");
  }
}
