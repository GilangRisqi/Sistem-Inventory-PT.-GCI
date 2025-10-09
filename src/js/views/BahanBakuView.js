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
    console.log(`=== Updating ${category} stock display ===`);
    console.log("Stock data to display:", stockData);

    // Store data for PDF generation
    this.stockData[category] = stockData;

    const formType = `stock-${category}`;
    const section = document.getElementById(`${formType}-section`);

    if (!section) {
      console.error(`Section ${formType}-section not found`);
      return;
    }

    // Initialize or get the form references
    const formRefs = this.stockForms[category];
    if (!formRefs) {
      console.log("Initializing new stock form...");
      this.stockForms[category] = this._initializeStockForm(formType);
    }

    // Get the current form references
    const currentForm = this.stockForms[category];
    if (!currentForm || !currentForm.container) {
      console.error("Failed to initialize stock form");
      return;
    }

    // Reset and update table content
    const tableHtml = `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Jenis Kertas</th>
            <th>Ukuran</th>
            <th>Qty Last Month</th>
            <th>Jumlah Masuk</th>
            <th>Total</th>
            <th>Tanggal</th>
            ${category === "produksi" ? "<th>Remark</th>" : ""}
          </tr>
        </thead>
        <tbody>
    `;

    // Create table content
    let rows = "";
    if (Array.isArray(stockData) && stockData.length > 0) {
      stockData.forEach((item) => {
        if (item && typeof item === "object") {
          const formattedDate = item.tanggal
            ? new Date(item.tanggal).toLocaleDateString("id-ID")
            : "";
          rows += `
            <tr>
              <td>${item.nomor || ""}</td>
              <td>${item.jenisKertas || ""}</td>
              <td>${item.ukuran || ""}</td>
              <td>${item.qtyLastMonth || 0}</td>
              <td>${item.jumlahMasuk || 0}</td>
              <td>${
                (Number(item.qtyLastMonth) || 0) +
                (Number(item.jumlahMasuk) || 0)
              }</td>
              <td>${formattedDate}</td>
              ${category === "produksi" ? `<td>${item.remark || "-"}</td>` : ""}
            </tr>
          `;
        }
      });
    }

    if (!rows) {
      const colCount = category === "produksi" ? "8" : "7";
      rows = `<tr><td colspan="${colCount}" class="text-center">Tidak ada data</td></tr>`;
    }

    // Update table content and ensure print button is present
    currentForm.container.innerHTML = tableHtml + rows + "</tbody></table>";

    // Always add print button after updating content
    const printBtn = document.createElement("button");
    printBtn.innerHTML = '<i class="bi bi-printer"></i> Download PDF';
    printBtn.className = "print-button btn btn-success";
    printBtn.style.cssText =
      "margin-top: 10px; margin-left: 10px; margin-right: 10px; padding: 8px 15px;";
    printBtn.onclick = () => this._handlePrintStock(category);
    currentForm.container.appendChild(printBtn);

    console.log("Table updated successfully");

    console.log("Stock display updated successfully");
  }

  _handleRefreshStock(category) {
    console.log(`=== Handling refresh for ${category} ===`);

    // Clean up any duplicate tables first
    this.cleanupStockDisplay(category);

    // Create and dispatch refresh event
    const refreshEvent = new CustomEvent("refresh-stock", {
      detail: { category },
    });
    document.dispatchEvent(refreshEvent);

    // Show loading state
    const section = document.getElementById(`stock-${category}-section`);
    if (section) {
      const resultsContainer = section.querySelector(".stock-results");
      if (resultsContainer) {
        resultsContainer.innerHTML = "<p>Memperbarui data...</p>";
      }
    }
  }

  _handlePrintStock(category) {
    console.log(`=== Printing stock for ${category} ===`);

    try {
      // Use stored data instead of DOM parsing
      const stockData = this.stockData[category];
      console.log("Stored stock data:", stockData);

      if (!stockData || !Array.isArray(stockData) || stockData.length === 0) {
        console.warn("No stock data available for PDF generation");
        alert("Tidak ada data untuk dicetak");
        return;
      }

      console.log("Proceeding with PDF generation using stored data...");

      // Create PDF
      const doc = new window.jspdf.jsPDF();

      // Add company header
      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      doc.text("PT. GCI (Garasi Creasindo Indonesia)", 20, 20);

      // Add report title
      const title = `Laporan Data Stock ${
        category.charAt(0).toUpperCase() + category.slice(1)
      }`;
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
      const headers = [
        "No.",
        "Jenis Kertas",
        "Ukuran",
        "Qty Last Month",
        "Jumlah Masuk",
        "Total",
        "Tanggal",
      ];
      if (category === "produksi") {
        headers.push("Remark");
      }

      // Convert stored data to table format
      const tableData = stockData.map((item) => {
        const formattedDate = item.tanggal
          ? new Date(item.tanggal).toLocaleDateString("id-ID")
          : "";
        const total =
          (Number(item.qtyLastMonth) || 0) + (Number(item.jumlahMasuk) || 0);

        const row = [
          item.nomor || "",
          item.jenisKertas || "",
          item.ukuran || "",
          item.qtyLastMonth || 0,
          item.jumlahMasuk || 0,
          total,
          formattedDate,
        ];

        if (category === "produksi") {
          row.push(item.remark || "-");
        }

        return row;
      });

      console.log("Table data for PDF:", tableData);

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
      banner: this._initializeStockForm("stock-banner"),
      digital: this._initializeStockForm("stock-digital"),
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

    // Add refresh button for banner stock
    if (formType === "stock-banner") {
      const refreshBtn = document.createElement("button");
      refreshBtn.textContent = "Refresh Data";
      refreshBtn.className = "refresh-button";
      refreshBtn.onclick = () => this._handleRefreshStock("banner");
      container.appendChild(refreshBtn);
    }

    // Create table element
    const table = document.createElement("table");
    table.className = "table table-bordered";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = [
      "No.",
      "Jenis Kertas",
      "Ukuran",
      "Qty Last Month",
      "Jumlah Masuk",
      "Total",
      "Tanggal",
    ];

    // Add Remark header for produksi
    if (formType === "stock-produksi") {
      headers.push("Remark");
    }

    headers.forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // Add table to container
    container.appendChild(table);

    // Add print button for all stock forms
    const printBtn = document.createElement("button");
    printBtn.innerHTML = '<i class="bi bi-printer"></i> Download PDF';
    printBtn.className = "print-button btn btn-success";
    printBtn.style.cssText =
      "margin-top: 10px; margin-left: 10px; margin-right: 10px; padding: 8px 15px;";
    printBtn.onclick = () =>
      this._handlePrintStock(formType.replace("stock-", ""));
    container.appendChild(printBtn);

    // Add container to section
    section.appendChild(container);

    return {
      container,
      tbody,
      resultsBody: tbody, // Alias untuk compatibility
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
    }

    return this._getFormElements(section, sectionId);
  }

  _generateInForm(sectionId) {
    return `
      <div class="form-group">
        <label for="${sectionId}-nomor">No.</label>
        <input type="number" id="${sectionId}-nomor" name="nomor" required />
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
        <label for="${sectionId}-nomor">No.</label>
        <input type="number" id="${sectionId}-nomor" name="nomor" required />
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

    // Panggil updateTotal saat form pertama kali dimuat
    updateTotal();

    // Tambahkan event listeners
    form
      .querySelector('[name="qtyLastMonth"]')
      .addEventListener("input", updateTotal);
    form
      .querySelector('[name="jumlahMasuk"]')
      .addEventListener("input", updateTotal);
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

    form
      .querySelector('[name="totalMasuk"]')
      .addEventListener("input", updateTotals);
    form
      .querySelector('[name="totalKeluarOk"]')
      .addEventListener("input", updateTotals);
    form
      .querySelector('[name="totalKeluarNg"]')
      .addEventListener("input", updateTotals);
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
          // Validasi input
          if (
            !formElements.nomor?.value ||
            !formElements.jenisKertas?.value ||
            !formElements.ukuran?.value ||
            !formElements.qtyLastMonth?.value ||
            !formElements.tanggal?.value ||
            !formElements.jumlahMasuk?.value
          ) {
            console.error("Missing required fields:", {
              nomor: !!formElements.nomor?.value,
              jenisKertas: !!formElements.jenisKertas?.value,
              ukuran: !!formElements.ukuran?.value,
              qtyLastMonth: !!formElements.qtyLastMonth?.value,
              tanggal: !!formElements.tanggal?.value,
              jumlahMasuk: !!formElements.jumlahMasuk?.value,
            });
            throw new Error("Semua field harus diisi");
          }
          console.log("All required fields are filled");

          // Validasi angka
          const nomor = Number(formElements.nomor.value);
          const qtyLastMonth = Number(formElements.qtyLastMonth.value);
          const jumlahMasuk = Number(formElements.jumlahMasuk.value);
          const total = qtyLastMonth + jumlahMasuk;

          if (isNaN(nomor) || nomor <= 0) {
            throw new Error("Nomor harus berupa angka positif");
          }
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
              nomor: nomor,
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
            !formElements.nomor.value ||
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
              nomor: Number(formElements.nomor.value),
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

  updateStockBannerDisplay(data) {
    console.log("=== Update Banner Display Called ===");
    console.log("Data received:", JSON.stringify(data, null, 2));

    // Pastikan stock form untuk banner ter-initialize dengan benar
    this.stockForms.banner = this._initializeStockForm("stock-banner");

    // Pastikan container dan table sudah ada
    const section = document.getElementById("stock-banner-section");
    if (!section) {
      console.error("stock-banner-section not found!");
      return;
    }

    // Update display
    this.updateStockDisplay("banner", data);

    console.log("Banner display update completed");
  }

  updateStockDigitalDisplay(data) {
    console.log("=== Update Digital Display Called ===");
    this.stockForms.digital = this._initializeStockForm("stock-digital"); // Re-initialize form
    this.updateStockDisplay("digital", data);
  }

  updateStockProduksiDisplay(data) {
    console.log("=== Update Produksi Display Called ===");
    this.stockForms.produksi = this._initializeStockForm("stock-produksi"); // Re-initialize form
    this.updateStockDisplay("produksi", data);
  }

  bindInOutSubmit(handler) {
    console.log("=== Setting up form-submit event handler ===");

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
        console.log("=== Form Submit Event Triggered ===");
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

  bindStockSubmit(category, handler) {
    console.log(`Binding stock submit handler for category: ${category}`);
    // Method untuk binding stock form submit handler dari presenter
    if (!this.stockSubmitHandlers) {
      this.stockSubmitHandlers = {};
    }
    this.stockSubmitHandlers[category] = handler;
    console.log(`Stock submit handler bound for ${category}`);
  }
}
