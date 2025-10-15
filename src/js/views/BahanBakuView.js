// Import jsPDF for PDF generation
import jsPDF from "jspdf";
import "jspdf-autotable";

export class BahanBakuView {
  constructor(model) {
    this.model = model;
    this._handleRefreshStock = this._handleRefreshStock.bind(this);
    this._handlePrintStock = this._handlePrintStock.bind(this);
    this.stockData = {}; // Store current stock data for each category
    this._init();
    // Don't initialize event listeners here - let presenter do it after setup
    // this._initializeEventListeners();
  }

  updateStockDisplay(category, stockData) {
    // Store data for PDF generation
    this.stockData[category] = stockData;

    // Handle special case for banner-in and banner-out sections
    let sectionId;
    if (category === "banner-in") {
      sectionId = "stock-banner-section-in";
    } else if (category === "banner-out") {
      sectionId = "stock-banner-section-out";
    } else {
      sectionId = `stock-${category}-section`;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      console.error(`Section ${sectionId} not found`);
      return;
    }

    // Initialize or get the form references
    const formRefs = this.stockForms[category];
    if (!formRefs) {
      // Use correct form type name for _initializeStockForm
      let formTypeName;
      if (category === "banner-in") {
        formTypeName = "stock-banner-in";
      } else if (category === "banner-out") {
        formTypeName = "stock-banner-out";
      } else {
        formTypeName = `stock-${category}`;
      }
      this.stockForms[category] = this._initializeStockForm(formTypeName);
    }

    // Get the current form references
    const currentForm = this.stockForms[category];
    if (!currentForm || !currentForm.container) {
      console.error("Failed to initialize stock form");
      return;
    }

    // Reset and update table content with inline styles for reliability
    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-family: Arial, sans-serif;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">No.</th>
            <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Jenis Kertas</th>
            <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Ukuran</th>
            <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Qty Last Month</th>
            <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Jumlah Masuk</th>
            <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Total</th>
            <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Tanggal</th>
            ${
              category === "produksi"
                ? '<th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Remark</th>'
                : ""
            }
          </tr>
        </thead>
        <tbody>
    `;

    // Create table content
    let rows = "";
    if (Array.isArray(stockData) && stockData.length > 0) {
      stockData.forEach((item, index) => {
        if (item && typeof item === "object") {
          const formattedDate = item.tanggal
            ? new Date(item.tanggal).toLocaleDateString("id-ID")
            : "";
          const total =
            (Number(item.qtyLastMonth) || 0) + (Number(item.jumlahMasuk) || 0);

          const rowHtml = `
            <tr style="border-bottom: 1px solid #dee2e6; background-color: ${
              index % 2 === 0 ? "#ffffff" : "#f8f9fa"
            };">
              <td style="border: 1px solid #dee2e6; padding: 10px;">${
                item.nomor || ""
              }</td>
              <td style="border: 1px solid #dee2e6; padding: 10px;">${
                item.jenisKertas || ""
              }</td>
              <td style="border: 1px solid #dee2e6; padding: 10px;">${
                item.ukuran || ""
              }</td>
              <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">${
                item.qtyLastMonth || 0
              }</td>
              <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">${
                item.jumlahMasuk || 0
              }</td>
              <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center; font-weight: bold; background-color: #e3f2fd;">${total}</td>
              <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">${formattedDate}</td>
              ${
                category === "produksi"
                  ? `<td style="border: 1px solid #dee2e6; padding: 10px;">${
                      item.remark || "-"
                    }</td>`
                  : ""
              }
            </tr>
          `;

          rows += rowHtml;
        }
      });
    }

    if (!rows) {
      const colCount = category === "produksi" ? "8" : "7";
      rows = `<tr>
        <td colspan="${colCount}" style="border: 1px solid #dee2e6; padding: 20px; text-align: center; color: #6c757d; font-style: italic;">
          Tidak ada data
        </td>
      </tr>`;
    }

    // Find or create table container (separate from buttons)
    let tableContainer =
      currentForm.container.querySelector(".table-container");
    if (!tableContainer) {
      tableContainer = document.createElement("div");
      tableContainer.className = "table-container";
      currentForm.container.appendChild(tableContainer);
    }

    // Update table content
    const fullTableHtml = tableHtml + rows + "</tbody></table>";

    // Add some visual debugging styles to container
    tableContainer.style.border = "3px solid #ff0000"; // Red border untuk debugging
    tableContainer.style.padding = "15px";
    tableContainer.style.margin = "10px 0";
    tableContainer.style.backgroundColor = "#ffffcc"; // Yellow background
    tableContainer.style.minHeight = "200px";
    tableContainer.style.display = "block";
    tableContainer.style.visibility = "visible";

    tableContainer.innerHTML = fullTableHtml;

    // Find or create button container (separate from table)
    let buttonContainer =
      currentForm.container.querySelector(".button-container");
    if (!buttonContainer) {
      buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";
      buttonContainer.style.marginTop = "10px";
      currentForm.container.appendChild(buttonContainer);
    }

    // Clear existing print button and add new one
    const existingPrintBtn = buttonContainer.querySelector(".print-button");
    if (existingPrintBtn) {
      existingPrintBtn.remove();
    }

    const printBtn = document.createElement("button");
    printBtn.innerHTML = '<i class="bi bi-printer"></i> Download PDF';
    printBtn.className = "print-button btn btn-success";
    printBtn.style.cssText =
      "margin-left: 10px; margin-right: 10px; padding: 8px 15px;";
    printBtn.onclick = () => this._handlePrintStock(category);
    buttonContainer.appendChild(printBtn);
  }

  _handleRefreshStock(category) {
    // Clean up any duplicate tables first
    this.cleanupStockDisplay(category);

    // Create and dispatch refresh event
    const refreshEvent = new CustomEvent("refresh-stock", {
      detail: { category },
    });
    document.dispatchEvent(refreshEvent);

    // Show loading state - handle special case for banner sections
    let sectionId;
    if (category === "banner-in") {
      sectionId = "stock-banner-section-in";
    } else if (category === "banner-out") {
      sectionId = "stock-banner-section-out";
    } else {
      sectionId = `stock-${category}-section`;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      const resultsContainer = section.querySelector(".stock-results");
      if (resultsContainer) {
        resultsContainer.innerHTML = "<p>Memperbarui data...</p>";
      }
    }
  }

  _handlePrintStock(category) {
    try {
      // Use stored data instead of DOM parsing
      const stockData = this.stockData[category];

      if (!stockData || !Array.isArray(stockData) || stockData.length === 0) {
        console.warn("No stock data available for PDF generation");
        alert("Tidak ada data untuk dicetak");
        return;
      }

      // Create PDF
      const doc = new window.jspdf.jsPDF();

      // Add company header
      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      doc.text("PT. GCI (Garasi Creasindo Indonesia)", 20, 20);

      // Add report title
      let title = "";
      if (category === "banner-out") {
        title = "Laporan Data Stock Banner Out";
      } else if (category === "banner-in") {
        title = "Laporan Data Stock Banner In";
      } else if (category === "digital-in") {
        title = "Laporan Data Stock Digital In";
      } else if (category === "digital-out") {
        title = "Laporan Data Stock Digital Out";
      } else if (category === "produksi-in") {
        title = "Laporan Data Stock Produksi In";
      } else if (category === "produksi-out") {
        title = "Laporan Data Stock Produksi Out";
      } else {
        title = `Laporan Data Stock ${
          category.charAt(0).toUpperCase() + category.slice(1)
        }`;
      }
      doc.setFontSize(14);
      doc.setFont(undefined, "normal");
      doc.text(title, 20, 32);

      // Add date and time
      const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const currentTime = new Date().toLocaleTimeString("id-ID");
      doc.setFontSize(10);
      doc.text(`Tanggal: ${currentDate}`, 20, 44);
      doc.text(`Waktu: ${currentTime}`, 20, 52);

      // Define table headers based on category
      let headers = [];
      if (
        category === "banner-out" ||
        category === "digital-out" ||
        category === "produksi-out"
      ) {
        headers = [
          "No.",
          "Jenis Kertas",
          "Ukuran",
          "Total Masuk",
          "Keluar (OK)",
          "Keluar (NG)",
          "Total Keluar",
          "Sisa Stock",
          "Tanggal",
        ];
      } else {
        headers = [
          "No.",
          "Jenis Kertas",
          "Ukuran",
          "Qty Last Month",
          "Jumlah Masuk",
          "Total",
          "Tanggal",
        ];
        if (category === "produksi" || category === "produksi-in") {
          headers.push("Remark");
        }
      }

      // Convert stored data to table format
      const tableData = stockData.map((item) => {
        const formattedDate = item.tanggal
          ? new Date(item.tanggal).toLocaleDateString("id-ID")
          : "";

        let row = [];
        if (
          category === "banner-out" ||
          category === "digital-out" ||
          category === "produksi-out"
        ) {
          const totalKeluarOk = Number(item.totalKeluarOk) || 0;
          const totalKeluarNg = Number(item.totalKeluarNg) || 0;
          const totalKeluar = totalKeluarOk + totalKeluarNg;
          const totalMasuk = Number(item.totalMasuk) || 0;
          const sisaStock = totalMasuk - totalKeluar;

          row = [
            item.nomor || "",
            item.jenisKertas || "",
            item.ukuran || "",
            totalMasuk,
            totalKeluarOk,
            totalKeluarNg,
            totalKeluar,
            sisaStock,
            formattedDate,
          ];
        } else {
          const total =
            (Number(item.qtyLastMonth) || 0) + (Number(item.jumlahMasuk) || 0);
          row = [
            item.nomor || "",
            item.jenisKertas || "",
            item.ukuran || "",
            item.qtyLastMonth || 0,
            item.jumlahMasuk || 0,
            total,
            formattedDate,
          ];
          if (category === "produksi" || category === "produksi-in") {
            row.push(item.remark || "-");
          }
        }

        return row;
      });

      // Add total records info
      doc.text(`Total Record: ${tableData.length} item`, 20, 58);

      // Generate table in PDF
      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 60,
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [52, 152, 219],
          textColor: 255,
          fontStyle: "bold",
          fontSize: 9,
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250],
        },
        margin: { top: 60, left: 10, right: 10 },
        didDrawPage: function (data) {
          // Add footer
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
      const filename = `Stock_${category}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(filename);

      console.log(`PDF generated: ${filename}`);
      alert(`PDF berhasil dibuat: ${filename}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal membuat PDF: " + error.message);
    }
  }

  _init() {
    this.stockForms = {
      "banner-in": this._initializeStockForm("stock-banner-in"),
      "banner-out": this._initializeStockForm("stock-banner-out"),
      produksi: this._initializeStockForm("stock-produksi"),
    };

    this.inOutForms = {
      banner: {
        in: this._initializeInOutForm("in-banner"),
        out: this._initializeInOutForm("out-banner"),
      },
      digital: {
        in: this._initializeInOutForm("in-digital"),
        out: this._initializeInOutForm("out-digital"),
      },
      produksi: {
        in: this._initializeInOutForm("in-produksi"),
        out: this._initializeInOutForm("out-produksi"),
      },
    };
  }

  _initializeStockForm(formType) {
    console.log(`=== Initializing Stock Form: ${formType} ===`);
    const section = document.getElementById(formType + "-section");

    if (!section) {
      console.error(`Section not found for ${formType}`);
      return null;
    }
    console.log(`Found section for ${formType}`);

    // Remove any existing stock-results containers
    const existingContainers = section.querySelectorAll(".stock-results");
    existingContainers.forEach((container) => {
      console.log(`Removing existing stock-results container`);
      container.remove();
    });

    // Create container for stock data
    const container = document.createElement("div");
    container.className = "stock-results";

    // Banner stock forms tidak perlu refresh button
    if (formType === "stock-banner-in") {
      // PDF button akan ada di tampilan tabel langsung

      // Add test data button for debugging
      const testBtn = document.createElement("button");
      testBtn.textContent = "🧪 Test Data";
      testBtn.className = "btn btn-warning";
      testBtn.onclick = () => {
        console.log("🧪 Test data button clicked - showing sample data");
        const sampleData = [
          {
            nomor: "001",
            jenisKertas: "Art Paper",
            ukuran: "A4",
            qtyLastMonth: 100,
            jumlahMasuk: 50,
            tanggal: "2024-10-14",
          },
          {
            nomor: "002",
            jenisKertas: "HVS",
            ukuran: "A3",
            qtyLastMonth: 200,
            jumlahMasuk: 75,
            tanggal: "2024-10-14",
          },
        ];

        // Force update display with sample data
        this.updateStockDisplay("banner-in", sampleData);
      };
      buttonContainer.appendChild(testBtn);

      // Add direct HTML injection test button
      const directBtn = document.createElement("button");
      directBtn.textContent = "🎯 Direct HTML";
      directBtn.className = "btn btn-danger";
      directBtn.style.marginLeft = "5px";
      directBtn.onclick = () => {
        console.log("🎯 Direct HTML test - bypassing all logic");
        const tableContainer = container.querySelector(".table-container");
        if (tableContainer) {
          tableContainer.innerHTML = `
            <h3 style="color: green;">✅ DIRECT HTML TEST BERHASIL!</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
              <thead>
                <tr style="background-color: #e7f3ff;">
                  <th style="border: 2px solid #333; padding: 10px;">No.</th>
                  <th style="border: 2px solid #333; padding: 10px;">Jenis</th>
                  <th style="border: 2px solid #333; padding: 10px;">Ukuran</th>
                  <th style="border: 2px solid #333; padding: 10px;">Last Month</th>
                  <th style="border: 2px solid #333; padding: 10px;">Masuk</th>
                  <th style="border: 2px solid #333; padding: 10px;">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 2px solid #333; padding: 10px;">001</td>
                  <td style="border: 2px solid #333; padding: 10px;">Art Paper</td>
                  <td style="border: 2px solid #333; padding: 10px;">A4</td>
                  <td style="border: 2px solid #333; padding: 10px;">100</td>
                  <td style="border: 2px solid #333; padding: 10px;">50</td>
                  <td style="border: 2px solid #333; padding: 10px; font-weight: bold;">150</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="border: 2px solid #333; padding: 10px;">002</td>
                  <td style="border: 2px solid #333; padding: 10px;">HVS</td>
                  <td style="border: 2px solid #333; padding: 10px;">A3</td>
                  <td style="border: 2px solid #333; padding: 10px;">200</td>
                  <td style="border: 2px solid #333; padding: 10px;">75</td>
                  <td style="border: 2px solid #333; padding: 10px; font-weight: bold;">275</td>
                </tr>
              </tbody>
            </table>
            <p style="color: blue; font-weight: bold;">Jika tabel ini tampil, berarti masalah BUKAN di HTML/CSS!</p>
          `;
          console.log("✅ Direct HTML injected successfully");
        } else {
          console.error("❌ Table container not found for direct injection");
        }
      };
      buttonContainer.appendChild(directBtn);

      container.appendChild(buttonContainer);
    } else if (formType === "stock-banner-out") {
      const buttonContainer = document.createElement("div");
      buttonContainer.style.marginBottom = "10px";

      const refreshBtn = document.createElement("button");
      refreshBtn.textContent = "🔄 Refresh Data Out";
      refreshBtn.className = "btn btn-primary refresh-button";
      refreshBtn.onclick = () => this._handleRefreshStock("banner-out");
      buttonContainer.appendChild(refreshBtn);

      container.appendChild(buttonContainer);
    }

    // Create table container placeholder (will be filled by updateStockDisplay)
    const tableContainer = document.createElement("div");
    tableContainer.className = "table-container";
    tableContainer.style.border = "1px dashed #ccc";
    tableContainer.style.padding = "20px";
    tableContainer.style.margin = "10px 0";
    tableContainer.style.textAlign = "center";
    tableContainer.style.backgroundColor = "#f9f9f9";
    tableContainer.innerHTML = `
      <div style="color: #666; font-style: italic;">
        ⏳ Memuat data stock banner in...
      </div>
    `;
    container.appendChild(tableContainer);
    console.log(`✅ Created table container for ${formType}:`, tableContainer);

    // Create button container placeholder (will be filled by updateStockDisplay)
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.style.marginTop = "10px";
    container.appendChild(buttonContainer);

    // Add container to section
    section.appendChild(container);

    return {
      container,
      tbody: null, // Will be created by updateStockDisplay
      resultsBody: null, // Will be created by updateStockDisplay
      form: container, // Alias untuk compatibility
    };
  }

  _initializeInOutForm(sectionId) {
    console.log(`=== Initializing Form: ${sectionId} ===`);
    const section = document.getElementById(sectionId + "-section");
    if (!section) {
      console.error(`Section not found: ${sectionId}-section`);
      return null;
    }
    console.log(`Found section for ${sectionId}`);

    if (!section.querySelector("form")) {
      console.log(`Creating new form for ${sectionId}`);
      const form = document.createElement("form");
      form.id = sectionId + "-form";
      form.className = "inout-form";
      form.setAttribute("method", "post");
      form.setAttribute("action", "javascript:void(0);");

      if (sectionId === "in-banner" || sectionId === "in-digital") {
        form.innerHTML = this._generateInForm(sectionId);
        this._setupInFormCalculations(form, sectionId);
      } else if (sectionId === "in-produksi") {
        form.innerHTML = this._generateInProduksiForm(sectionId);
        this._setupInFormCalculations(form, sectionId);
      } else if (
        sectionId === "out-banner" ||
        sectionId === "out-digital" ||
        sectionId === "out-produksi"
      ) {
        form.innerHTML = this._generateOutForm(sectionId);
        this._setupOutFormCalculations(form, sectionId);
      }

      section.appendChild(form);

      // Initialize auto numbering setelah form dibuat
      setTimeout(async () => {
        await this._setupAutoNumberingForForm(sectionId);
      }, 100);
    }

    return this._getFormElements(section, sectionId);
  }

  _generateInForm(sectionId) {
    return `
      <div class="form-group">
        <label for="${sectionId}-nomor">No. (Otomatis)</label>
        <input type="number" id="${sectionId}-nomor" name="nomor" readonly style="background-color: #f8f9fa; cursor: not-allowed;" />
      </div>
      <div class="form-group">
        <label for="${sectionId}-jenis-kertas">Jenis Kertas</label>
        <input type="text" id="${sectionId}-jenis-kertas" name="jenisKertas" required />
      </div>
      <div class="form-group">
        <label for="${sectionId}-ukuran">Ukuran</label>
        <input type="text" id="${sectionId}-ukuran" name="ukuran" required />
      </div>
      <div class="form-group">
        <label for="${sectionId}-qty-last-month">Qty Last Month</label>
        <input type="number" id="${sectionId}-qty-last-month" name="qtyLastMonth" min="0" required />
      </div>
      <div class="form-group">
        <label for="${sectionId}-tanggal">Tanggal</label>
        <input type="date" id="${sectionId}-tanggal" name="tanggal" required />
      </div>
      <div class="form-group">
        <label for="${sectionId}-jumlah-masuk">Jumlah Kertas Masuk</label>
        <input type="number" id="${sectionId}-jumlah-masuk" name="jumlahMasuk" min="0" required />
      </div>
      <div class="form-group">
        <label>Total</label>
        <div class="total-display" id="${sectionId}-total">0</div>
      </div>
      <button type="submit" class="submit-button" id="${sectionId}-submit">Simpan</button>
    `;
  }

  _generateInProduksiForm(sectionId) {
    return (
      this._generateInForm(sectionId) +
      `
      <div class="form-group">
        <label for="${sectionId}-remark">Remark</label>
        <input type="text" id="${sectionId}-remark" name="remark" />
      </div>
    `
    );
  }

  _generateOutForm(sectionId) {
    return `
      <div class="form-group">
        <label for="${sectionId}-nomor">No. (Otomatis)</label>
        <input type="number" id="${sectionId}-nomor" name="nomor" readonly style="background-color: #f8f9fa; cursor: not-allowed;" />
      </div>
      <div class="form-group">
        <label for="${sectionId}-jenis-kertas">Jenis Kertas</label>
        <input type="text" id="${sectionId}-jenis-kertas" name="jenisKertas" required />
      </div>
      <div class="form-group">
        <label for="${sectionId}-ukuran">Ukuran</label>
        <input type="text" id="${sectionId}-ukuran" name="ukuran" required />
      </div>
      <div class="form-group">
        <label for="${sectionId}-total-masuk">Total Kertas Masuk</label>
        <input type="number" id="${sectionId}-total-masuk" name="totalMasuk" min="0" required />
      </div>
      <div class="form-group">
        <label for="${sectionId}-tanggal">Tanggal</label>
        <input type="date" id="${sectionId}-tanggal" name="tanggal" required />
      </div>
      <div class="form-row">
        <div class="form-group half-width">
          <label for="${sectionId}-total-keluar-ok">Total Keluar (OK)</label>
          <input type="number" id="${sectionId}-total-keluar-ok" name="totalKeluarOk" min="0" required />
        </div>
        <div class="form-group half-width">
          <label for="${sectionId}-total-keluar-ng">Total Keluar (NG)</label>
          <input type="number" id="${sectionId}-total-keluar-ng" name="totalKeluarNg" min="0" required />
        </div>
      </div>
      <div class="form-group">
        <label>Total Keluar</label>
        <div class="total-display" id="${sectionId}-total-keluar">0</div>
      </div>
      <div class="form-group">
        <label>Sisa Stock</label>
        <div class="total-display" id="${sectionId}-sisa-stock">0</div>
      </div>
      <button type="submit" class="submit-button" id="${sectionId}-submit">Simpan</button>
    `;
  }

  _setupInFormCalculations(form, sectionId) {
    const updateTotal = () => {
      const qtyLastMonth =
        Number(form.querySelector('[name="qtyLastMonth"]').value) || 0;
      const jumlahMasuk =
        Number(form.querySelector('[name="jumlahMasuk"]').value) || 0;
      const total = qtyLastMonth + jumlahMasuk;

      // Update total di form dan simpan ke input tersembunyi
      const totalDisplay = document.getElementById(sectionId + "-total");
      if (totalDisplay) {
        totalDisplay.textContent = total;
      }

      // Update hidden total input
      let totalInput = form.querySelector('[name="total"]');
      if (!totalInput) {
        totalInput = document.createElement("input");
        totalInput.type = "hidden";
        totalInput.name = "total";
        form.appendChild(totalInput);
      }
      totalInput.value = total;
    };

    const updateAutoNumber = () => {
      const dateInput = form.querySelector('[name="tanggal"]');
      if (dateInput && dateInput.value) {
        // Extract category and type from sectionId
        const category = sectionId.split("-")[1]; // banner, digital, produksi
        const type = "in";
        this.updateAutoNumberForSection(
          sectionId,
          category,
          type,
          dateInput.value
        );
      }
    };

    // Panggil updateTotal saat form pertama kali dimuat
    updateTotal();

    // Tambahkan event listeners
    form
      .querySelector('[name="qtyLastMonth"]')
      .addEventListener("input", updateTotal);
    form
      .querySelector('[name="jumlahMasuk"]')
      .addEventListener("input", updateTotal);

    // Add event listener for date change to update auto number
    const dateInput = form.querySelector('[name="tanggal"]');
    if (dateInput) {
      dateInput.addEventListener("change", updateAutoNumber);
    }
  }

  _setupOutFormCalculations(form, sectionId) {
    const updateTotals = () => {
      const totalMasuk =
        Number(form.querySelector('[name="totalMasuk"]').value) || 0;
      const totalKeluarOk =
        Number(form.querySelector('[name="totalKeluarOk"]').value) || 0;
      const totalKeluarNg =
        Number(form.querySelector('[name="totalKeluarNg"]').value) || 0;
      const totalKeluar = totalKeluarOk + totalKeluarNg;
      const sisaStock = totalMasuk - totalKeluar;

      document.getElementById(sectionId + "-total-keluar").textContent =
        totalKeluar;
      document.getElementById(sectionId + "-sisa-stock").textContent =
        sisaStock;
    };

    const updateAutoNumber = () => {
      const dateInput = form.querySelector('[name="tanggal"]');
      if (dateInput && dateInput.value) {
        // Extract category and type from sectionId
        const category = sectionId.split("-")[1]; // banner, digital, produksi
        const type = "out";
        this.updateAutoNumberForSection(
          sectionId,
          category,
          type,
          dateInput.value
        );
      }
    };

    form
      .querySelector('[name="totalMasuk"]')
      .addEventListener("input", updateTotals);
    form
      .querySelector('[name="totalKeluarOk"]')
      .addEventListener("input", updateTotals);
    form
      .querySelector('[name="totalKeluarNg"]')
      .addEventListener("input", updateTotals);

    // Add event listener for date change to update auto number
    const dateInput = form.querySelector('[name="tanggal"]');
    if (dateInput) {
      dateInput.addEventListener("change", updateAutoNumber);
    }
  }

  _getFormElements(section, sectionId) {
    const form = section.querySelector("form");
    if (!form) return null;

    if (sectionId === "in-banner" || sectionId === "in-digital") {
      return {
        form: form,
        nomor: form.querySelector('[name="nomor"]'),
        jenisKertas: form.querySelector('[name="jenisKertas"]'),
        ukuran: form.querySelector('[name="ukuran"]'),
        qtyLastMonth: form.querySelector('[name="qtyLastMonth"]'),
        tanggal: form.querySelector('[name="tanggal"]'),
        jumlahMasuk: form.querySelector('[name="jumlahMasuk"]'),
        total: form.querySelector("#" + sectionId + "-total"),
      };
    } else if (sectionId === "in-produksi") {
      return {
        form: form,
        nomor: form.querySelector('[name="nomor"]'),
        jenisKertas: form.querySelector('[name="jenisKertas"]'),
        ukuran: form.querySelector('[name="ukuran"]'),
        qtyLastMonth: form.querySelector('[name="qtyLastMonth"]'),
        tanggal: form.querySelector('[name="tanggal"]'),
        jumlahMasuk: form.querySelector('[name="jumlahMasuk"]'),
        total: form.querySelector("#" + sectionId + "-total"),
        remark: form.querySelector('[name="remark"]'),
      };
    } else if (
      sectionId === "out-banner" ||
      sectionId === "out-digital" ||
      sectionId === "out-produksi"
    ) {
      return {
        form: form,
        nomor: form.querySelector('[name="nomor"]'),
        jenisKertas: form.querySelector('[name="jenisKertas"]'),
        ukuran: form.querySelector('[name="ukuran"]'),
        totalMasuk: form.querySelector('[name="totalMasuk"]'),
        tanggal: form.querySelector('[name="tanggal"]'),
        totalKeluarOk: form.querySelector('[name="totalKeluarOk"]'),
        totalKeluarNg: form.querySelector('[name="totalKeluarNg"]'),
        totalKeluar: form.querySelector("#" + sectionId + "-total-keluar"),
        sisaStock: form.querySelector("#" + sectionId + "-sisa-stock"),
      };
    }

    return {
      form: form,
      jenis: form.querySelector('[name="jenis"]'),
      jumlah: form.querySelector('[name="jumlah"]'),
      tanggal: form.querySelector('[name="tanggal"]'),
      keterangan: form.querySelector('[name="keterangan"]'),
    };
  }

  _initializeEventListeners() {
    // Initialize "in" form handlers
    ["in-banner", "in-digital", "in-produksi"].forEach((formType) => {
      const categoryMatch = formType.match(/in-(\w+)/);
      if (!categoryMatch) return;

      const category = categoryMatch[1];
      const formElements = this.inOutForms[category].in;

      if (!formElements || !formElements.form) return;

      const submitButton = formElements.form.querySelector(".submit-button");
      if (!submitButton) return;

      // Remove any existing listeners
      const newButton = submitButton.cloneNode(true);
      submitButton.parentNode.replaceChild(newButton, submitButton);

      newButton.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`=== Submit button clicked for ${formType} ===`);

        try {
          console.log("Checking form elements:", formElements);
          // Validasi input (nomor tidak perlu karena auto-generated)
          if (
            !formElements.jenisKertas?.value ||
            !formElements.ukuran?.value ||
            !formElements.qtyLastMonth?.value ||
            !formElements.tanggal?.value ||
            !formElements.jumlahMasuk?.value
          ) {
            console.error("Missing required fields:", {
              jenisKertas: !!formElements.jenisKertas?.value,
              ukuran: !!formElements.ukuran?.value,
              qtyLastMonth: !!formElements.qtyLastMonth?.value,
              tanggal: !!formElements.tanggal?.value,
              jumlahMasuk: !!formElements.jumlahMasuk?.value,
            });
            throw new Error("Semua field harus diisi");
          }
          console.log("All required fields are filled");

          // Validasi angka (nomor akan di-generate otomatis)
          const qtyLastMonth = Number(formElements.qtyLastMonth.value);
          const jumlahMasuk = Number(formElements.jumlahMasuk.value);
          const total = qtyLastMonth + jumlahMasuk;

          if (isNaN(qtyLastMonth) || qtyLastMonth < 0) {
            throw new Error("Qty Last Month tidak boleh negatif");
          }
          if (isNaN(jumlahMasuk) || jumlahMasuk <= 0) {
            throw new Error("Jumlah Masuk harus lebih dari 0");
          }

          console.log("Preparing form data...");
          const formData = {
            category: category,
            type: formType,
            data: {
              nomor: Number(formElements.nomor.value) || 0, // Will be overridden by auto-generated number
              jenisKertas: formElements.jenisKertas.value.trim(),
              ukuran: formElements.ukuran.value.trim(),
              qtyLastMonth: qtyLastMonth,
              tanggal: formElements.tanggal.value,
              jumlahMasuk: jumlahMasuk,
              total: total,
            },
          };

          if (category === "produksi" && formElements.remark) {
            formData.data.remark = formElements.remark.value;
          }

          console.log("Form data prepared:", JSON.stringify(formData, null, 2));

          // Dispatch event for form submission
          console.log("Dispatching form-submit event...");
          const formEvent = new CustomEvent("form-submit", {
            detail: formData,
          });
          document.dispatchEvent(formEvent);
          console.log("Event dispatched successfully");

          // Note: Form reset and success message will be handled by presenter after data is saved
        } catch (error) {
          console.error("Error submitting form:", error);
          this.showError("Gagal menyimpan data: " + error.message);
        }
      });
    });

    // Initialize "out" form handlers
    ["out-banner", "out-digital", "out-produksi"].forEach((formType) => {
      const categoryMatch = formType.match(/out-(\w+)/);
      if (!categoryMatch) return;

      const category = categoryMatch[1];
      const formElements = this.inOutForms[category].out;

      if (!formElements || !formElements.form) return;

      const submitButton = formElements.form.querySelector(".submit-button");
      if (!submitButton) return;

      submitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
          if (
            !formElements.jenisKertas.value ||
            !formElements.ukuran.value ||
            !formElements.totalMasuk.value ||
            !formElements.tanggal.value ||
            !formElements.totalKeluarOk.value ||
            !formElements.totalKeluarNg.value
          ) {
            throw new Error("Semua field harus diisi");
          }

          const totalKeluarOk = Number(formElements.totalKeluarOk.value);
          const totalKeluarNg = Number(formElements.totalKeluarNg.value);
          const totalMasuk = Number(formElements.totalMasuk.value);
          const totalKeluar = totalKeluarOk + totalKeluarNg;
          const sisaStock = totalMasuk - totalKeluar;

          const formData = {
            category: category,
            type: formType,
            data: {
              nomor: Number(formElements.nomor.value) || 0, // Will be overridden by auto-generated number
              jenisKertas: formElements.jenisKertas.value.trim(),
              ukuran: formElements.ukuran.value.trim(),
              totalMasuk: totalMasuk,
              tanggal: formElements.tanggal.value,
              totalKeluarOk: totalKeluarOk,
              totalKeluarNg: totalKeluarNg,
              totalKeluar: totalKeluar,
              sisaStock: sisaStock,
            },
          };

          const formEvent = new CustomEvent("form-submit", {
            detail: formData,
          });
          document.dispatchEvent(formEvent);

          this.resetForm(category, "out");
          this.showSuccess("Data berhasil disimpan");
        } catch (error) {
          console.error("Error submitting form:", error);
          this.showError("Gagal menyimpan data: " + error.message);
        }
      });
    });
  }

  resetForm(category, type) {
    if (!type) {
      const stockForm = this.stockForms[category];
      if (stockForm && stockForm.form) {
        stockForm.form.reset();
      }
    } else {
      const formType = this.inOutForms[category];
      if (formType && formType[type] && formType[type].form) {
        formType[type].form.reset();

        // Reset total field untuk form "in"
        if (type === "in" && formType[type].total) {
          formType[type].total.textContent = "0";
        }

        // Auto-update nomor setelah reset form
        setTimeout(async () => {
          const sectionId = `${type}-${category}`;
          const currentDate = new Date().toISOString().split("T")[0];

          // Set default date
          const dateInput = document.getElementById(`${sectionId}-tanggal`);
          if (dateInput && !dateInput.value) {
            dateInput.value = currentDate;
          }

          // Update auto number
          await this.updateAutoNumberForSection(
            sectionId,
            category,
            type,
            currentDate
          );
        }, 100);
      }
    }
  }

  showSuccess(message) {
    console.log("showSuccess called with message:", message);
    alert(message || "Operasi berhasil");
  }

  showError(message) {
    alert(message || "Terjadi kesalahan");
  }

  // Method to clean up multiple tables if needed
  cleanupStockDisplay(category) {
    const section = document.getElementById(`stock-${category}-section`);
    if (section) {
      const containers = section.querySelectorAll(".stock-results");
      if (containers.length > 1) {
        console.log(
          `Found ${containers.length} containers, removing duplicates...`
        );
        // Keep only the first one, remove the rest
        for (let i = 1; i < containers.length; i++) {
          containers[i].remove();
        }
      }
    }
  }

  updateStockBannerInDisplay(data) {
    const section = document.getElementById("stock-banner-section-in");
    if (!section) {
      console.error("Section stock-banner-section-in not found!");
      return;
    }

    // Simpan data untuk PDF generation
    this.stockData["banner-in"] = data;

    // DIRECT INJECTION - Skip complex initialization
    console.log("� DIRECT TABLE INJECTION - Bypassing complex logic");

    let tableHtml = `
      <div class="stock-results">
        <div class="table-header">
          <h3>� List Stock Bahan Baku Banner In</h3>
          <span class="record-count">Total: ${
            Array.isArray(data) ? data.length : 0
          } records</span>
        </div>
        <div class="results-table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Jenis Kertas</th>
                <th>Ukuran</th>
                <th>Qty Last Month</th>
                <th>Jumlah Masuk</th>
                <th>Total</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
    `;

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        if (item && typeof item === "object") {
          const formattedDate = item.tanggal
            ? new Date(item.tanggal).toLocaleDateString("id-ID")
            : "";
          const total =
            (Number(item.qtyLastMonth) || 0) + (Number(item.jumlahMasuk) || 0);

          tableHtml += `
            <tr data-id="${item.id || item.timestamp}" data-type="banner-in">
              <td><strong>${item.nomor || ""}</strong></td>
              <td class="editable" data-field="jenisKertas" data-type="text" data-value="${
                item.jenisKertas || ""
              }">${item.jenisKertas || ""}</td>
              <td class="editable" data-field="ukuran" data-type="text" data-value="${
                item.ukuran || ""
              }">${item.ukuran || ""}</td>
              <td class="editable text-center" data-field="qtyLastMonth" data-type="number" data-value="${
                item.qtyLastMonth || 0
              }">${item.qtyLastMonth || 0}</td>
              <td class="editable text-center" data-field="jumlahMasuk" data-type="number" data-value="${
                item.jumlahMasuk || 0
              }">${item.jumlahMasuk || 0}</td>
              <td class="text-center"><strong style="color: #007bff;">${total}</strong></td>
              <td class="editable text-center" data-field="tanggal" data-type="date" data-value="${
                item.tanggal || ""
              }">${formattedDate}</td>
              <td class="action-cell">
                <button class="btn btn-sm btn-primary edit-btn" data-id="${
                  item.id || item.timestamp
                }" data-type="banner-in" title="Edit">
                  <i class="bi bi-pencil"></i> Edit
                </button>
                <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                  item.id || item.timestamp
                }" data-type="banner-in" title="Simpan" style="display: none;">
                  <i class="bi bi-check"></i> Simpan
                </button>
                <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                  item.id || item.timestamp
                }" data-type="banner-in" title="Batal" style="display: none;">
                  <i class="bi bi-x"></i> Batal
                </button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${
                  item.id || item.timestamp
                }" data-type="banner-in" title="Hapus">
                  <i class="bi bi-trash"></i> Hapus
                </button>
              </td>
            </tr>
          `;
        }
      });
    } else {
      tableHtml += `
        <tr>
          <td colspan="8" class="text-center">
            <em style="color: #666;">Tidak ada data stock banner in</em>
          </td>
        </tr>
      `;
    }

    tableHtml += `
          </tbody>
        </table>
        <div style="margin-top: 15px; display: flex; gap: 10px;">
          <button id="banner-in-pdf-btn" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
            � Generate PDF
          </button>
        </div>
      </div>
    `;

    // Direct injection to section
    console.log("� Injecting HTML directly to section");
    section.innerHTML = tableHtml;

    // Tambahkan event listener untuk PDF button
    const pdfButton = document.getElementById("banner-in-pdf-btn");
    if (pdfButton) {
      pdfButton.addEventListener("click", () => {
        this._handlePrintStock("banner-in");
      });
    }

    // Tambahkan event listener untuk button edit dan delete
    this._attachStockActionListeners(section, "banner-in");
  }

  updateStockBannerOutDisplay(data) {
    console.log("=== updateStockBannerOutDisplay called ===");
    console.log("Data received:", data);
    console.log("Data type:", typeof data);
    console.log("Is array:", Array.isArray(data));
    console.log(
      "Data length:",
      Array.isArray(data) ? data.length : "Not array"
    );

    const section = document.getElementById("stock-banner-section-out");
    if (!section) {
      console.error("Section stock-banner-section-out not found!");
      return;
    }
    console.log("Section found:", section);

    // Simpan data untuk PDF generation
    this.stockData["banner-out"] = data;

    let tableHtml = `
      <div class="stock-results">
        <div class="table-header">
          <h3>📤 List Stock Bahan Baku Banner Out</h3>
          <span class="record-count">Total: ${
            Array.isArray(data) ? data.length : 0
          } records</span>
        </div>
        <div class="results-table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Jenis Kertas</th>
                <th>Ukuran</th>
                <th>Total Masuk</th>
                <th>Keluar (OK)</th>
                <th>Keluar (NG)</th>
                <th>Total Keluar</th>
                <th>Sisa Stock</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
    `;

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        if (item && typeof item === "object") {
          const formattedDate = item.tanggal
            ? new Date(item.tanggal).toLocaleDateString("id-ID")
            : "";
          const totalKeluarOk = Number(item.totalKeluarOk) || 0;
          const totalKeluarNg = Number(item.totalKeluarNg) || 0;
          const totalKeluar = totalKeluarOk + totalKeluarNg;
          const totalMasuk = Number(item.totalMasuk) || 0;
          const sisaStock = totalMasuk - totalKeluar;

          tableHtml += `
            <tr data-id="${item.id || item.timestamp}" data-type="banner-out">
              <td>${item.nomor || ""}</td>
              <td class="editable" data-field="jenisKertas" data-type="text" data-value="${
                item.jenisKertas || ""
              }">${item.jenisKertas || ""}</td>
              <td class="editable" data-field="ukuran" data-type="text" data-value="${
                item.ukuran || ""
              }">${item.ukuran || ""}</td>
              <td class="editable text-center" data-field="totalMasuk" data-type="number" data-value="${totalMasuk}">${totalMasuk}</td>
              <td class="editable text-center" data-field="totalKeluarOk" data-type="number" data-value="${totalKeluarOk}">${totalKeluarOk}</td>
              <td class="editable text-center" data-field="totalKeluarNg" data-type="number" data-value="${totalKeluarNg}">${totalKeluarNg}</td>
              <td class="text-center"><strong>${totalKeluar}</strong></td>
              <td class="text-center"><strong style="color: ${
                sisaStock < 0 ? "#dc3545" : "#28a745"
              };">${sisaStock}</strong></td>
              <td class="editable text-center" data-field="tanggal" data-type="date" data-value="${
                item.tanggal || ""
              }">${formattedDate}</td>
              <td class="action-cell">
                <button class="btn btn-sm btn-primary edit-btn" data-id="${
                  item.id || item.timestamp
                }" data-type="banner-out" title="Edit">
                  <i class="bi bi-pencil"></i> Edit
                </button>
                <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                  item.id || item.timestamp
                }" data-type="banner-out" title="Simpan" style="display: none;">
                  <i class="bi bi-check"></i> Simpan
                </button>
                <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                  item.id || item.timestamp
                }" data-type="banner-out" title="Batal" style="display: none;">
                  <i class="bi bi-x"></i> Batal
                </button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${
                  item.id || item.timestamp
                }" data-type="banner-out" title="Hapus">
                  <i class="bi bi-trash"></i> Hapus
                </button>
              </td>
            </tr>
          `;
        }
      });
    } else {
      console.log("No data found - showing empty message");
      tableHtml += `
        <tr>
          <td colspan="10" class="text-center">
            <em style="color: #666;">Tidak ada data stock banner out</em>
          </td>
        </tr>
      `;
    }

    tableHtml += `
            </tbody>
          </table>
        </div>
        <div class="table-actions">
          <button id="banner-out-pdf-btn" class="btn btn-success">
            📄 Generate PDF
          </button>
        </div>
      </div>
    `;

    section.innerHTML = tableHtml;

    // Tambahkan event listener untuk PDF button
    const pdfButton = document.getElementById("banner-out-pdf-btn");
    if (pdfButton) {
      pdfButton.addEventListener("click", () => {
        this._handlePrintStock("banner-out");
      });
    }

    // Tambahkan event listener untuk button edit dan delete
    this._attachStockActionListeners(section, "banner-out");
  }

  // New methods for Digital In and Out sections
  updateStockDigitalInDisplay(data) {
    console.log("=== Updating Digital In Display ===");
    console.log("Digital In data received:", data);

    const section = document.getElementById("stock-digital-section-in");
    if (!section) {
      console.error("Digital In section not found");
      return;
    }

    // Store data for PDF generation
    this.stockData["digital-in"] = data;

    // Remove any unwanted stock-results containers
    const unwantedContainers = section.querySelectorAll(".stock-results");
    unwantedContainers.forEach((container) => {
      console.log("Removing unwanted stock-results container from Digital In");
      container.remove();
    });

    let tableHtml = `
        <div class="results-summary">
          <span class="results-count">Menampilkan ${
            Array.isArray(data) ? data.length : 0
          } records</span>
        </div>
        <div class="table-responsive" style="max-width: 100%; overflow-x: auto; margin: 15px 0; padding: 10px; border: 1px solid #dee2e6; border-radius: 8px; background-color: #fff;">
          <table style="width: 100%; min-width: 800px; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 60px;">No.</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: left; font-weight: 600; min-width: 120px;">Jenis Kertas</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 80px;">Ukuran</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Qty Last Month</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Jumlah Masuk</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 80px;">Total</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Tanggal</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 120px;">Aksi</th>
              </tr>
            </thead>
            <tbody>
    `;

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        if (item && typeof item === "object") {
          const formattedDate = item.tanggal
            ? new Date(item.tanggal).toLocaleDateString("id-ID")
            : "";
          const total =
            (Number(item.qtyLastMonth) || 0) + (Number(item.jumlahMasuk) || 0);

          tableHtml += `
            <tr data-id="${
              item.id || item.timestamp
            }" data-type="digital-in" style="border-bottom: 1px solid #dee2e6; ${
            index % 2 === 0
              ? "background-color: #f8f9fa;"
              : "background-color: white;"
          } transition: background-color 0.2s ease;">
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: #495057;">${
                item.nomor || ""
              }</strong></td>
              <td class="editable" data-field="jenisKertas" data-type="text" data-value="${
                item.jenisKertas || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${
            item.jenisKertas || ""
          }</td>
              <td class="editable" data-field="ukuran" data-type="text" data-value="${
                item.ukuran || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${
            item.ukuran || ""
          }</td>
              <td class="editable text-center" data-field="qtyLastMonth" data-type="number" data-value="${
                item.qtyLastMonth || 0
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${
            item.qtyLastMonth || 0
          }</td>
              <td class="editable text-center" data-field="jumlahMasuk" data-type="number" data-value="${
                item.jumlahMasuk || 0
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${
            item.jumlahMasuk || 0
          }</td>
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: #007bff; font-size: 15px;">${total}</strong></td>
              <td class="editable text-center" data-field="tanggal" data-type="date" data-value="${
                item.tanggal || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center; font-size: 13px;">${formattedDate}</td>
              <td class="action-cell" style="border: 1px solid #dee2e6; padding: 8px; text-align: center; white-space: nowrap;">
                <div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;">
                  <button class="btn btn-sm btn-primary edit-btn" data-id="${
                    item.id || item.timestamp
                  }" data-type="digital-in" title="Edit" style="padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                    item.id || item.timestamp
                  }" data-type="digital-in" title="Simpan" style="display: none; padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-check"></i>
                  </button>
                  <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                    item.id || item.timestamp
                  }" data-type="digital-in" title="Batal" style="display: none; padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-x"></i>
                  </button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${
                    item.id || item.timestamp
                  }" data-type="digital-in" title="Hapus" style="padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }
      });
    } else {
      tableHtml += `
        <tr>
          <td colspan="8" style="border: 1px solid #dee2e6; padding: 30px; text-align: center; background-color: #f8f9fa;">
            <em style="color: #6c757d; font-size: 14px;">📋 Tidak ada data stock digital in</em>
          </td>
        </tr>
      `;
    }

    tableHtml += `
            </tbody>
          </table>
        </div>
        <div style="margin-top: 15px; display: flex; gap: 10px;">
          <button id="digital-in-pdf-btn" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s ease;">
            <i class="bi bi-file-earmark-pdf"></i> Generate PDF
          </button>
        </div>
    `;

    // Set innerHTML directly to the section since it doesn't have .results container
    section.innerHTML =
      `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="margin: 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
          <i class="bi bi-arrow-down-circle" style="margin-right: 10px; font-size: 20px;"></i>
          📥 List Stock Bahan Baku Digital In
        </h2>
      </div>
    ` + tableHtml;

    // Tambahkan event listener untuk PDF button
    const digitalInPdfButton = document.getElementById("digital-in-pdf-btn");
    if (digitalInPdfButton) {
      digitalInPdfButton.addEventListener("click", () => {
        this._handlePrintStock("digital-in");
      });
    }

    // Attach event listeners untuk action buttons
    this._attachStockActionListeners(section, "digital-in");
    console.log("✅ Digital In display updated successfully");
  }

  updateStockDigitalOutDisplay(data) {
    console.log("=== Updating Digital Out Display ===");
    console.log("Digital Out data received:", data);

    const section = document.getElementById("stock-digital-section-out");
    if (!section) {
      console.error("Digital Out section not found");
      return;
    }

    // Store data for PDF generation
    this.stockData["digital-out"] = data;

    // Remove any unwanted stock-results containers
    const unwantedContainers = section.querySelectorAll(".stock-results");
    unwantedContainers.forEach((container) => {
      console.log("Removing unwanted stock-results container from Digital Out");
      container.remove();
    });

    let tableHtml = `
        <div class="results-summary">
          <span class="results-count">Menampilkan ${
            Array.isArray(data) ? data.length : 0
          } records</span>
        </div>
        <div class="table-responsive" style="max-width: 100%; overflow-x: auto; margin: 15px 0; padding: 10px; border: 1px solid #dee2e6; border-radius: 8px; background-color: #fff;">
          <table style="width: 100%; min-width: 1000px; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white;">
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 60px;">No.</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: left; font-weight: 600; min-width: 120px;">Jenis Kertas</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 80px;">Ukuran</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Total Masuk</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Keluar (OK)</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Keluar (NG)</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Total Keluar</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 80px;">Sisa Stock</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Tanggal</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 120px;">Aksi</th>
              </tr>
            </thead>
            <tbody>
    `;

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        if (item && typeof item === "object") {
          const formattedDate = item.tanggal
            ? new Date(item.tanggal).toLocaleDateString("id-ID")
            : "";

          const totalKeluarOk = Number(item.totalKeluarOk) || 0;
          const totalKeluarNg = Number(item.totalKeluarNg) || 0;
          const totalKeluar = totalKeluarOk + totalKeluarNg;
          const totalMasuk = Number(item.totalMasuk) || 0;
          const sisaStock = totalMasuk - totalKeluar;

          tableHtml += `
            <tr data-id="${
              item.id || item.timestamp
            }" data-type="digital-out" style="border-bottom: 1px solid #dee2e6; ${
            index % 2 === 0
              ? "background-color: #f8f9fa;"
              : "background-color: white;"
          } transition: background-color 0.2s ease;">
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: #495057;">${
                item.nomor || ""
              }</strong></td>
              <td class="editable" data-field="jenisKertas" data-type="text" data-value="${
                item.jenisKertas || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;" title="${
            item.jenisKertas || ""
          }">${item.jenisKertas || ""}</td>
              <td class="editable" data-field="ukuran" data-type="text" data-value="${
                item.ukuran || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${
            item.ukuran || ""
          }</td>
              <td class="editable text-center" data-field="totalMasuk" data-type="number" data-value="${totalMasuk}" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${totalMasuk}</td>
              <td class="editable text-center" data-field="totalKeluarOk" data-type="number" data-value="${totalKeluarOk}" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${totalKeluarOk}</td>
              <td class="editable text-center" data-field="totalKeluarNg" data-type="number" data-value="${totalKeluarNg}" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${totalKeluarNg}</td>
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: #dc3545; font-size: 15px;">${totalKeluar}</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: ${
                sisaStock < 0 ? "#dc3545" : "#28a745"
              }; font-size: 15px;">${sisaStock}</strong></td>
              <td class="editable text-center" data-field="tanggal" data-type="date" data-value="${
                item.tanggal || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center; font-size: 13px;">${formattedDate}</td>
              <td class="action-cell" style="border: 1px solid #dee2e6; padding: 8px; text-align: center; white-space: nowrap;">
                <div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;">
                  <button class="btn btn-sm btn-primary edit-btn" data-id="${
                    item.id || item.timestamp
                  }" data-type="digital-out" title="Edit" style="padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                    item.id || item.timestamp
                  }" data-type="digital-out" title="Simpan" style="display: none; padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-check"></i>
                  </button>
                  <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                    item.id || item.timestamp
                  }" data-type="digital-out" title="Batal" style="display: none; padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-x"></i>
                  </button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${
                    item.id || item.timestamp
                  }" data-type="digital-out" title="Hapus" style="padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }
      });
    } else {
      tableHtml += `
        <tr>
          <td colspan="10" style="border: 1px solid #dee2e6; padding: 30px; text-align: center; background-color: #f8f9fa;">
            <em style="color: #6c757d; font-size: 14px;">📋 Tidak ada data stock digital out</em>
          </td>
        </tr>
      `;
    }

    tableHtml += `
            </tbody>
          </table>
        </div>
        <div style="margin-top: 15px; display: flex; gap: 10px;">
          <button id="digital-out-pdf-btn" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s ease;">
            <i class="bi bi-file-earmark-pdf"></i> Generate PDF
          </button>
        </div>
    `;

    // Set innerHTML directly to the section since it doesn't have .results container
    section.innerHTML =
      `
      <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="margin: 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
          <i class="bi bi-arrow-up-circle" style="margin-right: 10px; font-size: 20px;"></i>
          📤 List Stock Bahan Baku Digital Out
        </h2>
      </div>
    ` + tableHtml;

    // Tambahkan event listener untuk PDF button
    const digitalOutPdfButton = document.getElementById("digital-out-pdf-btn");
    if (digitalOutPdfButton) {
      digitalOutPdfButton.addEventListener("click", () => {
        this._handlePrintStock("digital-out");
      });
    }

    // Attach event listeners untuk action buttons
    this._attachStockActionListeners(section, "digital-out");
    console.log("✅ Digital Out display updated successfully");
  }

  // New methods for Produksi In and Out sections
  updateStockProduksiInDisplay(data) {
    console.log("=== Updating Produksi In Display ===");
    console.log("Produksi In data received:", data);

    const section = document.getElementById("stock-produksi-section-in");
    if (!section) {
      console.error("Produksi In section not found");
      return;
    }

    // Store data for PDF generation
    this.stockData["produksi-in"] = data;

    // Remove any unwanted stock-results containers
    const unwantedContainers = section.querySelectorAll(".stock-results");
    unwantedContainers.forEach((container) => {
      console.log("Removing unwanted stock-results container from Produksi In");
      container.remove();
    });

    let tableHtml = `
        <div class="results-summary">
          <span class="results-count">Menampilkan ${
            Array.isArray(data) ? data.length : 0
          } records</span>
        </div>
        <div class="table-responsive" style="max-width: 100%; overflow-x: auto; margin: 15px 0; padding: 10px; border: 1px solid #dee2e6; border-radius: 8px; background-color: #fff;">
          <table style="width: 100%; min-width: 900px; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white;">
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 60px;">No.</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: left; font-weight: 600; min-width: 120px;">Jenis Kertas</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 80px;">Ukuran</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Qty Last Month</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Jumlah Masuk</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 80px;">Total</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Tanggal</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Remark</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 120px;">Aksi</th>
              </tr>
            </thead>
            <tbody>
    `;

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        if (item && typeof item === "object") {
          const formattedDate = item.tanggal
            ? new Date(item.tanggal).toLocaleDateString("id-ID")
            : "";
          const total =
            (Number(item.qtyLastMonth) || 0) + (Number(item.jumlahMasuk) || 0);

          tableHtml += `
            <tr data-id="${
              item.id || item.timestamp
            }" data-type="produksi-in" style="border-bottom: 1px solid #dee2e6; ${
            index % 2 === 0
              ? "background-color: #f8f9fa;"
              : "background-color: white;"
          } transition: background-color 0.2s ease;">
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: #495057;">${
                item.nomor || ""
              }</strong></td>
              <td class="editable" data-field="jenisKertas" data-type="text" data-value="${
                item.jenisKertas || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${
            item.jenisKertas || ""
          }</td>
              <td class="editable" data-field="ukuran" data-type="text" data-value="${
                item.ukuran || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${
            item.ukuran || ""
          }</td>
              <td class="editable text-center" data-field="qtyLastMonth" data-type="number" data-value="${
                item.qtyLastMonth || 0
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${
            item.qtyLastMonth || 0
          }</td>
              <td class="editable text-center" data-field="jumlahMasuk" data-type="number" data-value="${
                item.jumlahMasuk || 0
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${
            item.jumlahMasuk || 0
          }</td>
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: #007bff; font-size: 15px;">${total}</strong></td>
              <td class="editable text-center" data-field="tanggal" data-type="date" data-value="${
                item.tanggal || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center; font-size: 13px;">${formattedDate}</td>
              <td class="editable" data-field="remark" data-type="text" data-value="${
                item.remark || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: left; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${
            item.remark || "-"
          }</td>
              <td class="action-cell" style="border: 1px solid #dee2e6; padding: 8px; text-align: center; white-space: nowrap;">
                <div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;">
                  <button class="btn btn-sm btn-primary edit-btn" data-id="${
                    item.id || item.timestamp
                  }" data-type="produksi-in" title="Edit" style="padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                    item.id || item.timestamp
                  }" data-type="produksi-in" title="Simpan" style="display: none; padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-check"></i>
                  </button>
                  <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                    item.id || item.timestamp
                  }" data-type="produksi-in" title="Batal" style="display: none; padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-x"></i>
                  </button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${
                    item.id || item.timestamp
                  }" data-type="produksi-in" title="Hapus" style="padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }
      });
    } else {
      tableHtml += `
        <tr>
          <td colspan="9" style="border: 1px solid #dee2e6; padding: 30px; text-align: center; background-color: #f8f9fa;">
            <em style="color: #6c757d; font-size: 14px;">📋 Tidak ada data stock produksi in</em>
          </td>
        </tr>
      `;
    }

    tableHtml += `
            </tbody>
          </table>
        </div>
        <div style="margin-top: 15px; display: flex; gap: 10px;">
          <button id="produksi-in-pdf-btn" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s ease;">
            <i class="bi bi-file-earmark-pdf"></i> Generate PDF
          </button>
        </div>
    `;

    // Set innerHTML directly to the section since it doesn't have .results container
    section.innerHTML =
      `
      <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="margin: 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
          <i class="bi bi-arrow-down-circle" style="margin-right: 10px; font-size: 20px;"></i>
          🏭 List Stock Bahan Baku Produksi In
        </h2>
      </div>
    ` + tableHtml;

    // Tambahkan event listener untuk PDF button
    const produksiInPdfButton = document.getElementById("produksi-in-pdf-btn");
    if (produksiInPdfButton) {
      produksiInPdfButton.addEventListener("click", () => {
        this._handlePrintStock("produksi-in");
      });
    }

    // Attach event listeners untuk action buttons
    this._attachStockActionListeners(section, "produksi-in");
    console.log("✅ Produksi In display updated successfully");
  }

  updateStockProduksiOutDisplay(data) {
    console.log("=== Updating Produksi Out Display ===");
    console.log("Produksi Out data received:", data);

    const section = document.getElementById("stock-produksi-section-out");
    if (!section) {
      console.error("Produksi Out section not found");
      return;
    }

    // Store data for PDF generation
    this.stockData["produksi-out"] = data;

    // Remove any unwanted stock-results containers
    const unwantedContainers = section.querySelectorAll(".stock-results");
    unwantedContainers.forEach((container) => {
      console.log(
        "Removing unwanted stock-results container from Produksi Out"
      );
      container.remove();
    });

    let tableHtml = `
        <div class="results-summary">
          <span class="results-count">Menampilkan ${
            Array.isArray(data) ? data.length : 0
          } records</span>
        </div>
        <div class="table-responsive" style="max-width: 100%; overflow-x: auto; margin: 15px 0; padding: 10px; border: 1px solid #dee2e6; border-radius: 8px; background-color: #fff;">
          <table style="width: 100%; min-width: 1000px; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333;">
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 60px;">No.</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: left; font-weight: 600; min-width: 120px;">Jenis Kertas</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 80px;">Ukuran</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Total Masuk</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Keluar (OK)</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Keluar (NG)</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Total Keluar</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 80px;">Sisa Stock</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 100px;">Tanggal</th>
                <th style="border: 1px solid #dee2e6; padding: 12px 8px; text-align: center; font-weight: 600; min-width: 120px;">Aksi</th>
              </tr>
            </thead>
            <tbody>
    `;

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        if (item && typeof item === "object") {
          const formattedDate = item.tanggal
            ? new Date(item.tanggal).toLocaleDateString("id-ID")
            : "";

          const totalKeluarOk = Number(item.totalKeluarOk) || 0;
          const totalKeluarNg = Number(item.totalKeluarNg) || 0;
          const totalKeluar = totalKeluarOk + totalKeluarNg;
          const totalMasuk = Number(item.totalMasuk) || 0;
          const sisaStock = totalMasuk - totalKeluar;

          tableHtml += `
            <tr data-id="${
              item.id || item.timestamp
            }" data-type="produksi-out" style="border-bottom: 1px solid #dee2e6; ${
            index % 2 === 0
              ? "background-color: #f8f9fa;"
              : "background-color: white;"
          } transition: background-color 0.2s ease;">
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: #495057;">${
                item.nomor || ""
              }</strong></td>
              <td class="editable" data-field="jenisKertas" data-type="text" data-value="${
                item.jenisKertas || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${
            item.jenisKertas || ""
          }</td>
              <td class="editable" data-field="ukuran" data-type="text" data-value="${
                item.ukuran || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${
            item.ukuran || ""
          }</td>
              <td class="editable text-center" data-field="totalMasuk" data-type="number" data-value="${totalMasuk}" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${totalMasuk}</td>
              <td class="editable text-center" data-field="totalKeluarOk" data-type="number" data-value="${totalKeluarOk}" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${totalKeluarOk}</td>
              <td class="editable text-center" data-field="totalKeluarNg" data-type="number" data-value="${totalKeluarNg}" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;">${totalKeluarNg}</td>
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: #dc3545; font-size: 15px;">${totalKeluar}</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center;"><strong style="color: ${
                sisaStock < 0 ? "#dc3545" : "#28a745"
              }; font-size: 15px;">${sisaStock}</strong></td>
              <td class="editable text-center" data-field="tanggal" data-type="date" data-value="${
                item.tanggal || ""
              }" style="border: 1px solid #dee2e6; padding: 10px 8px; text-align: center; font-size: 13px;">${formattedDate}</td>
              <td class="action-cell" style="border: 1px solid #dee2e6; padding: 8px; text-align: center; white-space: nowrap;">
                <div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;">
                  <button class="btn btn-sm btn-primary edit-btn" data-id="${
                    item.id || item.timestamp
                  }" data-type="produksi-out" title="Edit" style="padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-success save-btn d-none" data-id="${
                    item.id || item.timestamp
                  }" data-type="produksi-out" title="Simpan" style="display: none; padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-check"></i>
                  </button>
                  <button class="btn btn-sm btn-secondary cancel-btn d-none" data-id="${
                    item.id || item.timestamp
                  }" data-type="produksi-out" title="Batal" style="display: none; padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-x"></i>
                  </button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${
                    item.id || item.timestamp
                  }" data-type="produksi-out" title="Hapus" style="padding: 4px 8px; font-size: 11px;">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }
      });
    } else {
      tableHtml += `
        <tr>
          <td colspan="10" style="border: 1px solid #dee2e6; padding: 30px; text-align: center; background-color: #f8f9fa;">
            <em style="color: #6c757d; font-size: 14px;">📋 Tidak ada data stock produksi out</em>
          </td>
        </tr>
      `;
    }

    tableHtml += `
            </tbody>
          </table>
        </div>
        <div style="margin-top: 15px; display: flex; gap: 10px;">
          <button id="produksi-out-pdf-btn" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s ease;">
            <i class="bi bi-file-earmark-pdf"></i> Generate PDF
          </button>
        </div>
    `;

    // Set innerHTML directly to the section since it doesn't have .results container
    section.innerHTML =
      `
      <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="margin: 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
          <i class="bi bi-arrow-up-circle" style="margin-right: 10px; font-size: 20px;"></i>
          🏭 List Stock Bahan Baku Produksi Out
        </h2>
      </div>
    ` + tableHtml;

    // Tambahkan event listener untuk PDF button
    const produksiOutPdfButton = document.getElementById(
      "produksi-out-pdf-btn"
    );
    if (produksiOutPdfButton) {
      produksiOutPdfButton.addEventListener("click", () => {
        this._handlePrintStock("produksi-out");
      });
    }

    // Attach event listeners untuk action buttons
    this._attachStockActionListeners(section, "produksi-out");
    console.log("✅ Produksi Out display updated successfully");
  }

  bindInOutSubmit(handler) {
    // Initialize event listeners for buttons first
    this._initializeEventListeners();

    // Remove any existing event listener first
    const oldHandler = this._formSubmitHandler;
    if (oldHandler) {
      document.removeEventListener("form-submit", oldHandler);
    }

    // Create new handler
    this._formSubmitHandler = async (event) => {
      try {
        console.log("Event details:", JSON.stringify(event.detail, null, 2));
        const formData = event.detail;
        console.log("Processing form data for category:", formData.category);

        // Call the handler and wait for result
        console.log("Calling handler...");
        const result = await handler(formData);
        console.log("Handler result:", result);

        if (result) {
          console.log("Form submission successful");

          // Reset form dan tampilan setelah sukses
          if (formData.category && formData.type) {
            const type = formData.type.startsWith("in-") ? "in" : "out";
            console.log(`Resetting form for ${formData.category} (${type})`);
            this.resetForm(formData.category, type);

            // Re-initialize stock form untuk memastikan tampilan siap
            console.log(`Re-initializing stock form for ${formData.category}`);
            this.stockForms[formData.category] = this._initializeStockForm(
              `stock-${formData.category}`
            );

            const stockForm = this.stockForms[formData.category];
            if (stockForm && stockForm.resultsBody) {
              console.log(
                `Display container ready for ${formData.category}, waiting for refresh...`
              );
            } else {
              console.error(
                `Stock form or results body not found for ${formData.category}`
              );
            }
          }
        }
      } catch (error) {
        console.error("Error handling form submission:", error);
        this.showError(error.message);
      }
    };

    // Add the new handler
    document.addEventListener("form-submit", this._formSubmitHandler);
    console.log("Form-submit event handler attached");
  }

  async updateAutoNumber(sectionId, nextNumber) {
    console.log(`=== Updating auto number for ${sectionId} ===`);
    console.log("Next number:", nextNumber);

    const nomorInput = document.getElementById(`${sectionId}-nomor`);
    if (nomorInput) {
      nomorInput.value = nextNumber;
      console.log(`Auto number ${nextNumber} set for ${sectionId}`);
    } else {
      console.error(`Nomor input not found for ${sectionId}`);
    }
  }

  async initializeAutoNumbers() {
    // Set current date as default for date inputs and update auto numbers
    const currentDate = new Date().toISOString().split("T")[0];

    // Array of all form sections
    const formSections = [
      { id: "in-banner", category: "banner", type: "in" },
      { id: "out-banner", category: "banner", type: "out" },
      { id: "in-digital", category: "digital", type: "in" },
      { id: "out-digital", category: "digital", type: "out" },
      { id: "in-produksi", category: "produksi", type: "in" },
      { id: "out-produksi", category: "produksi", type: "out" },
    ];

    for (const section of formSections) {
      try {
        // Set default date
        const dateInput = document.getElementById(`${section.id}-tanggal`);
        if (dateInput && !dateInput.value) {
          dateInput.value = currentDate;
        }

        // Trigger auto number update
        await this.updateAutoNumberForSection(
          section.id,
          section.category,
          section.type,
          currentDate
        );
      } catch (error) {
        console.error(
          `Error initializing auto number for ${section.id}:`,
          error
        );
      }
    }
  }

  async updateAutoNumberForSection(sectionId, category, type, date = null) {
    try {
      console.log(`=== Updating auto number for section: ${sectionId} ===`);

      // Dispatch event to get next number from model
      const event = new CustomEvent("get-next-number", {
        detail: {
          sectionId,
          category,
          type,
          date: date || new Date().toISOString().split("T")[0],
        },
      });

      document.dispatchEvent(event);
    } catch (error) {
      console.error(`Error updating auto number for ${sectionId}:`, error);
    }
  }

  async _setupAutoNumberingForForm(sectionId) {
    try {
      console.log(`=== Setting up auto numbering for: ${sectionId} ===`);

      // Parse category and type from sectionId (e.g., "in-banner" -> category: "banner", type: "in")
      const [type, category] = sectionId.split("-");
      const currentDate = new Date().toISOString().split("T")[0];

      // Set default date
      const dateInput = document.getElementById(`${sectionId}-tanggal`);
      if (dateInput && !dateInput.value) {
        dateInput.value = currentDate;
      }

      // Initial auto number load
      await this.updateAutoNumberForSection(
        sectionId,
        category,
        type,
        currentDate
      );

      // Setup date change listener for auto number update
      if (dateInput) {
        dateInput.addEventListener("change", async () => {
          const selectedDate = dateInput.value;
          if (selectedDate) {
            await this.updateAutoNumberForSection(
              sectionId,
              category,
              type,
              selectedDate
            );
          }
        });
      }

      console.log(`✅ Auto numbering setup completed for: ${sectionId}`);
    } catch (error) {
      console.error(`Error setting up auto numbering for ${sectionId}:`, error);
    }
  }

  bindStockSubmit(category, handler) {
    console.log(`Binding stock submit handler for category: ${category}`);
    // Method untuk binding stock form submit handler dari presenter
    if (!this.stockSubmitHandlers) {
      this.stockSubmitHandlers = {};
    }
    this.stockSubmitHandlers[category] = handler;
    console.log(`Stock submit handler bound for ${category}`);
  }

  // Method untuk attach event listener ke action buttons
  _attachStockActionListeners(section, category) {
    if (!section) return;

    // Remove existing listeners to avoid duplicates
    const existingHandler = section._stockActionHandler;
    if (existingHandler) {
      section.removeEventListener("click", existingHandler);
    }

    // Create new handler function - like RekapView
    const handler = (e) => {
      const target = e.target.closest("button");
      if (!target) return;

      const id = target.dataset.id;
      const type = target.dataset.type;

      console.log("Stock action clicked:", {
        id,
        idType: typeof id,
        type,
        action: target.className,
        buttonDataset: target.dataset,
      });

      if (target.classList.contains("edit-btn")) {
        this.toggleEditMode(
          section.querySelector(`tr[data-id="${id}"][data-type="${type}"]`),
          true
        );
        if (this.stockEditHandlers && this.stockEditHandlers[type]) {
          this.stockEditHandlers[type](id, type);
        }
      } else if (target.classList.contains("save-btn")) {
        this.saveEdit(id, type);
      } else if (target.classList.contains("cancel-btn")) {
        this.cancelEdit(id, type);
      } else if (target.classList.contains("delete-btn")) {
        this._confirmStockDelete(id, type, category);
      }
    };

    // Store handler reference on section to prevent duplicates
    section._stockActionHandler = handler;
    section.addEventListener("click", handler);
  }

  // Method untuk memulai mode edit
  _startStockEdit(id, type, section) {
    const row = section.querySelector(
      `tr[data-id="${id}"][data-type="${type}"]`
    );
    if (!row) return;

    this._toggleStockEditMode(row, true);
  }

  // Method untuk menyimpan edit
  _saveStockEdit(id, type, section) {
    const row = section.querySelector(
      `tr[data-id="${id}"][data-type="${type}"]`
    );
    if (!row) return;

    // Collect edited data
    const editedData = {};
    const editableCells = row.querySelectorAll(
      ".editable input, .editable select"
    );

    editableCells.forEach((input) => {
      const field = input.getAttribute("data-field");
      editedData[field] = input.value;
    });

    // Call presenter handler if available
    if (this.stockEditHandlers && this.stockEditHandlers[type]) {
      this.stockEditHandlers[type](id, editedData);
    } else {
      console.log("Saving stock data:", id, editedData);
      // Temporary: just exit edit mode
      this._toggleStockEditMode(row, false);
    }
  }

  // Method untuk membatalkan edit
  _cancelStockEdit(id, type, section) {
    const row = section.querySelector(
      `tr[data-id="${id}"][data-type="${type}"]`
    );
    if (!row) return;

    this._toggleStockEditMode(row, false);
  }

  // Method untuk konfirmasi delete
  _confirmStockDelete(id, type, category) {
    console.log("🔍 _confirmStockDelete called with:", {
      id,
      idType: typeof id,
      idValue: id,
      type,
      category,
      handlers: Object.keys(this.stockDeleteHandlers || {}),
    });

    // Prevent multiple confirmation dialogs
    if (this._confirmingDelete) {
      console.log("Confirmation already in progress, ignoring...");
      return;
    }

    this._confirmingDelete = true;

    // Small delay to prevent event bubbling issues
    setTimeout(() => {
      if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        if (this.stockDeleteHandlers && this.stockDeleteHandlers[type]) {
          console.log("🗑️ Calling delete handler for:", { id, type, category });
          this.stockDeleteHandlers[type](id);
        } else {
          console.log(
            "❌ No delete handler found for:",
            type,
            "Available handlers:",
            Object.keys(this.stockDeleteHandlers || {})
          );
          alert("Fitur delete akan diimplementasikan oleh presenter");
        }
      }

      // Reset confirmation flag after a delay
      setTimeout(() => {
        this._confirmingDelete = false;
      }, 500);
    }, 50);
  }

  // Method untuk toggle edit mode
  _toggleStockEditMode(row, isEdit) {
    const editableCells = row.querySelectorAll(".editable");
    const editBtn = row.querySelector(".edit-btn");
    const saveBtn = row.querySelector(".save-btn");
    const cancelBtn = row.querySelector(".cancel-btn");
    const deleteBtn = row.querySelector(".delete-btn");

    if (isEdit) {
      row.setAttribute("data-editing", "true");

      editableCells.forEach((cell) => {
        const field = cell.getAttribute("data-field");
        const type = cell.getAttribute("data-type");
        const value = cell.getAttribute("data-value");
        const originalContent = cell.innerHTML;

        cell.setAttribute("data-original", originalContent);

        let input;
        if (type === "select") {
          const options = cell.getAttribute("data-options").split(",");
          input = document.createElement("select");
          input.className = "form-control form-control-sm";
          options.forEach((option) => {
            const optionEl = document.createElement("option");
            optionEl.value = option;
            optionEl.textContent = option;
            if (option === value) optionEl.selected = true;
            input.appendChild(optionEl);
          });
        } else if (type === "date") {
          input = document.createElement("input");
          input.type = "date";
          input.className = "form-control form-control-sm";
          input.value = value;
        } else if (type === "number") {
          input = document.createElement("input");
          input.type = "number";
          input.className = "form-control form-control-sm";
          input.value = value || 0;
        } else {
          input = document.createElement("input");
          input.type = "text";
          input.className = "form-control form-control-sm";
          input.value = value || "";
        }

        input.setAttribute("data-field", field);
        cell.innerHTML = "";
        cell.appendChild(input);
      });

      editBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
      cancelBtn.style.display = "inline-block";
      deleteBtn.style.display = "none";
    } else {
      row.removeAttribute("data-editing");

      editableCells.forEach((cell) => {
        const originalContent = cell.getAttribute("data-original");
        if (originalContent) {
          cell.innerHTML = originalContent;
          cell.removeAttribute("data-original");
        }
      });

      editBtn.style.display = "inline-block";
      saveBtn.style.display = "none";
      cancelBtn.style.display = "none";
      deleteBtn.style.display = "inline-block";
    }
  }

  // Binding handlers from presenter
  bindStockEditHandler(type, handler) {
    if (!this.stockEditHandlers) {
      this.stockEditHandlers = {};
    }
    this.stockEditHandlers[type] = handler;
  }

  bindStockDeleteHandler(type, handler) {
    if (!this.stockDeleteHandlers) {
      this.stockDeleteHandlers = {};
    }
    this.stockDeleteHandlers[type] = handler;
  }

  // Toggle edit mode - like RekapView
  toggleEditMode(row, isEdit) {
    if (!row) return;

    const editableCells = row.querySelectorAll(".editable");
    const editBtn = row.querySelector(".edit-btn");
    const saveBtn = row.querySelector(".save-btn");
    const cancelBtn = row.querySelector(".cancel-btn");
    const deleteBtn = row.querySelector(".delete-btn");

    if (isEdit) {
      row.setAttribute("data-editing", "true");

      editableCells.forEach((cell) => {
        const field = cell.getAttribute("data-field");
        const type = cell.getAttribute("data-type") || "text";
        const value =
          cell.getAttribute("data-value") || cell.textContent.trim();
        const originalContent = cell.innerHTML;

        cell.setAttribute("data-original", originalContent);

        let input;
        if (type === "select") {
          const options = cell.getAttribute("data-options");
          if (options) {
            input = document.createElement("select");
            input.className = "form-control form-control-sm";
            options.split(",").forEach((option) => {
              const optionEl = document.createElement("option");
              optionEl.value = option.trim();
              optionEl.textContent = option.trim();
              if (option.trim() === value) optionEl.selected = true;
              input.appendChild(optionEl);
            });
          }
        } else if (type === "date") {
          input = document.createElement("input");
          input.type = "date";
          input.className = "form-control form-control-sm";
          input.value = value;
        } else if (type === "number") {
          input = document.createElement("input");
          input.type = "number";
          input.className = "form-control form-control-sm";
          input.value = value;
        } else {
          input = document.createElement("input");
          input.type = "text";
          input.className = "form-control form-control-sm";
          input.value = value;
        }

        if (input) {
          input.setAttribute("data-field", field);
          cell.innerHTML = "";
          cell.appendChild(input);
        }
      });

      // Show/hide buttons - properly handle d-none class with !important
      if (editBtn) {
        editBtn.classList.add("d-none");
      }
      if (saveBtn) {
        saveBtn.classList.remove("d-none");
        saveBtn.style.setProperty("display", "inline-block", "important");
      }
      if (cancelBtn) {
        cancelBtn.classList.remove("d-none");
        cancelBtn.style.setProperty("display", "inline-block", "important");
      }
      if (deleteBtn) {
        deleteBtn.classList.add("d-none");
      }
    } else {
      row.removeAttribute("data-editing");

      editableCells.forEach((cell) => {
        const originalContent = cell.getAttribute("data-original");
        if (originalContent) {
          cell.innerHTML = originalContent;
        }
      });

      // Show/hide buttons - restore original state
      if (editBtn) {
        editBtn.classList.remove("d-none");
        editBtn.style.setProperty("display", "inline-block", "important");
      }
      if (saveBtn) {
        saveBtn.classList.add("d-none");
      }
      if (cancelBtn) {
        cancelBtn.classList.add("d-none");
      }
      if (deleteBtn) {
        deleteBtn.classList.remove("d-none");
        deleteBtn.style.setProperty("display", "inline-block", "important");
      }
    }
  }

  // Bind handler untuk save action
  bindStockSaveHandler(handler) {
    this.stockSaveHandler = handler;
  }

  // Bind handler untuk cancel action
  bindStockCancelHandler(handler) {
    this.stockCancelHandler = handler;
  }

  // Method saveEdit dan cancelEdit seperti di RekapView
  saveEdit(id, type) {
    if (this.stockSaveHandler) {
      this.stockSaveHandler(id, type);
    }
  }

  cancelEdit(id, type) {
    const row = document.querySelector(
      `tr[data-id="${id}"][data-type="${type}"]`
    );
    if (row) {
      this.toggleEditMode(row, false);
    }
    if (this.stockCancelHandler) {
      this.stockCancelHandler(id, type);
    }
  }
}
