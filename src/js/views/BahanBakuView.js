export class BahanBakuView {
  constructor() {
    this._init();
  }

  _init() {
    var self = this;
    self.stockForms = {
      banner: self.initializeStockForm("stock-banner"),
      digital: self.initializeStockForm("stock-digital"),
      produksi: self.initializeStockForm("stock-produksi"),
    };

    self.inOutForms = {
      banner: {
        in: self.initializeInOutForm("in-banner"),
        out: self.initializeInOutForm("out-banner"),
      },
      digital: {
        in: self.initializeInOutForm("in-digital"),
        out: self.initializeInOutForm("out-digital"),
      },
      produksi: {
        in: self.initializeInOutForm("in-produksi"),
        out: self.initializeInOutForm("out-produksi"),
      },
    };
  }

  initializeStockForm(sectionId) {
    var section = document.getElementById(sectionId + "-section");
    if (!section) return null;

    if (
      sectionId === "stock-banner" ||
      sectionId === "stock-digital" ||
      sectionId === "stock-produksi"
    ) {
      if (!section.querySelector(".stock-results")) {
        var resultsContainer = document.createElement("div");
        resultsContainer.className = "stock-results";
        resultsContainer.innerHTML = `
          <div class="results-table">
            <h3>Current Stock Status</h3>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Jenis Kertas</th>
                  <th>Ukuran</th>
                  <th>Total Masuk</th>
                  <th>Total Keluar</th>
                  <th>Sisa Stock</th>
                  <th>Tanggal Update</th>
                  ${sectionId === "stock-produksi" ? "<th>Remark</th>" : ""}
                </tr>
              </thead>
              <tbody id="${sectionId}-results"></tbody>
            </table>
          </div>
        `;
        section.appendChild(resultsContainer);
      }

      return {
        resultsContainer: section.querySelector(".stock-results"),
        resultsBody: section.querySelector("#" + sectionId + "-results"),
      };
    }

    return null;
  }

  initializeInOutForm(sectionId) {
    var section = document.getElementById(sectionId + "-section");
    if (!section) return null;

    if (!section.querySelector("form")) {
      var form = document.createElement("form");
      form.id = sectionId + "-form";
      form.className = "inout-form";

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
      <button type="submit">Simpan</button>
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
      <button type="submit">Simpan</button>
    `;
  }

  _setupInFormCalculations(form, sectionId) {
    var updateTotal = function () {
      var qtyLastMonth =
        Number(form.querySelector('[name="qtyLastMonth"]').value) || 0;
      var jumlahMasuk =
        Number(form.querySelector('[name="jumlahMasuk"]').value) || 0;
      var total = qtyLastMonth + jumlahMasuk;
      document.getElementById(sectionId + "-total").textContent = total;
    };

    form
      .querySelector('[name="qtyLastMonth"]')
      .addEventListener("input", updateTotal);
    form
      .querySelector('[name="jumlahMasuk"]')
      .addEventListener("input", updateTotal);
  }

  _setupOutFormCalculations(form, sectionId) {
    var updateTotals = function () {
      var totalMasuk =
        Number(form.querySelector('[name="totalMasuk"]').value) || 0;
      var totalKeluarOk =
        Number(form.querySelector('[name="totalKeluarOk"]').value) || 0;
      var totalKeluarNg =
        Number(form.querySelector('[name="totalKeluarNg"]').value) || 0;
      var totalKeluar = totalKeluarOk + totalKeluarNg;
      var sisaStock = totalMasuk - totalKeluar;

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
    var form = section.querySelector("form");
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

  bindInOutSubmit(handler) {
    var self = this;

    ["in-banner", "in-digital", "in-produksi"].forEach(function (formType) {
      var category = formType.split("-")[1];
      var formElements = self.inOutForms[category].in;
      if (!formElements || !formElements.form) return;

      formElements.form.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var formData = {
          category: category,
          type: formType,
          data: {
            nomor: Number(formElements.nomor.value),
            jenisKertas: formElements.jenisKertas.value,
            ukuran: formElements.ukuran.value,
            qtyLastMonth: Number(formElements.qtyLastMonth.value),
            tanggal: formElements.tanggal.value,
            jumlahMasuk: Number(formElements.jumlahMasuk.value),
            total: Number(formElements.total.textContent),
          },
        };

        if (category === "produksi" && formElements.remark) {
          formData.data.remark = formElements.remark.value;
        }

        Promise.resolve(handler(formData))
          .then(function () {
            formElements.form.reset();
            formElements.total.textContent = "0";
            self.showSuccess("Data berhasil disimpan");
          })
          .catch(function (error) {
            console.error("Error submitting form:", error);
            self.showError("Gagal menyimpan data: " + error.message);
          });
      });
    });

    ["out-banner", "out-digital", "out-produksi"].forEach(function (formType) {
      var category = formType.split("-")[1];
      var formElements = self.inOutForms[category].out;
      if (!formElements || !formElements.form) return;

      formElements.form.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var totalKeluar =
          Number(formElements.totalKeluarOk.value) +
          Number(formElements.totalKeluarNg.value);
        var sisaStock = Number(formElements.totalMasuk.value) - totalKeluar;

        var formData = {
          type: formType,
          data: {
            nomor: Number(formElements.nomor.value),
            jenisKertas: formElements.jenisKertas.value,
            ukuran: formElements.ukuran.value,
            totalMasuk: Number(formElements.totalMasuk.value),
            tanggal: formElements.tanggal.value,
            totalKeluarOk: Number(formElements.totalKeluarOk.value),
            totalKeluarNg: Number(formElements.totalKeluarNg.value),
            totalKeluar: totalKeluar,
            sisaStock: sisaStock,
          },
        };

        Promise.resolve(handler(formData))
          .then(function () {
            formElements.form.reset();
            self.showSuccess("Data berhasil disimpan");
          })
          .catch(function (error) {
            console.error("Error submitting form:", error);
            self.showError("Gagal menyimpan data: " + error.message);
          });
      });
    });
  }

  resetForm(category, type) {
    if (!type) {
      var stockForm = this.stockForms[category];
      if (stockForm && stockForm.form) {
        stockForm.form.reset();
      }
    } else {
      var formType = this.inOutForms[category];
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
    var stockForm = this.stockForms[category];
    if (!stockForm || !stockForm.resultsBody) return;

    stockForm.resultsBody.innerHTML = "";

    if (!data || !data.length) {
      var emptyRow = document.createElement("tr");
      emptyRow.innerHTML =
        '<td colspan="' +
        (category === "produksi" ? "8" : "7") +
        '" class="text-center">Belum ada data stock</td>';
      stockForm.resultsBody.appendChild(emptyRow);
      return;
    }

    data.forEach(function (item) {
      var row = document.createElement("tr");
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
