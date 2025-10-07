export class BahanBakuView {
  constructor() {
    this._init();
    this._initializeEventListeners();
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
    const form = document.getElementById(formType);
    if (!form) return null;

    return {
      form,
      namaBarang: form.querySelector("input[name='nama_barang']"),
      jumlahBarang: form.querySelector("input[name='jumlah_barang']"),
      tanggal: form.querySelector("input[name='tanggal']"),
      satuan: form.querySelector("select[name='satuan']"),
      keterangan: form.querySelector("input[name='keterangan']"),
      submitButton: form.querySelector("button[type='submit']"),
    };
  }

  _initializeInOutForm(sectionId) {
    const section = document.getElementById(sectionId + "-section");
    if (!section) return null;

    if (!section.querySelector("form")) {
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
      <button type="button" class="submit-button" id="${sectionId}-submit">Simpan</button>
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
      <button type="button" class="submit-button" id="${sectionId}-submit">Simpan</button>
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

        try {
          // Validasi input
          if (
            !formElements.nomor.value ||
            !formElements.jenisKertas.value ||
            !formElements.ukuran.value ||
            !formElements.qtyLastMonth.value ||
            !formElements.tanggal.value ||
            !formElements.jumlahMasuk.value
          ) {
            throw new Error("Semua field harus diisi");
          }

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

          const formEvent = new CustomEvent("form-submit", {
            detail: formData,
          });
          document.dispatchEvent(formEvent);

          this.resetForm(category, "in");
          formElements.total.textContent = "0";
          this.showSuccess(`Data ${category} berhasil disimpan`);
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
      }
    }
  }

  showSuccess(message) {
    alert(message || "Operasi berhasil");
  }

  showError(message) {
    alert(message || "Terjadi kesalahan");
  }

  updateStockDisplay(category, data) {
    const stockForm = this.stockForms[category];
    if (!stockForm || !stockForm.resultsBody) return;

    stockForm.resultsBody.innerHTML = "";

    if (!data || !data.length) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML =
        '<td colspan="' +
        (category === "produksi" ? "8" : "7") +
        '" class="text-center">Belum ada data stock</td>';
      stockForm.resultsBody.appendChild(emptyRow);
      return;
    }

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.nomor}</td>
        <td>${item.jenisKertas}</td>
        <td>${item.ukuran}</td>
        <td>${item.totalMasuk}</td>
        <td>${item.totalKeluar}</td>
        <td>${item.sisaStock}</td>
        <td>${new Date(item.tanggal).toLocaleDateString()}</td>
        ${category === "produksi" ? `<td>${item.remark || "-"}</td>` : ""}
      `;
      stockForm.resultsBody.appendChild(row);
    });
  }

  updateStockBannerDisplay(data) {
    this.updateStockDisplay("banner", data);
  }

  updateStockDigitalDisplay(data) {
    this.updateStockDisplay("digital", data);
  }

  updateStockProduksiDisplay(data) {
    this.updateStockDisplay("produksi", data);
  }
}
