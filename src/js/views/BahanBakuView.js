export class BahanBakuView {
  constructor() {
    // Inisialisasi form untuk Stock
    this.stockForms = {
      banner: this.initializeStockForm("stock-banner"),
      digital: this.initializeStockForm("stock-digital"),
      produksi: this.initializeStockForm("stock-produksi"),
    };

    // Inisialisasi form untuk Input/Output
    this.inOutForms = {
      banner: {
        in: this.initializeInOutForm("in-banner"),
        out: this.initializeInOutForm("out-banner"),
      },
      digital: {
        in: this.initializeInOutForm("in-digital"),
        out: this.initializeInOutForm("out-digital"),
      },
      produksi: {
        in: this.initializeInOutForm("in-produksi"),
        out: this.initializeInOutForm("out-produksi"),
      },
    };
  }

  initializeStockForm(sectionId) {
    const section = document.getElementById(`${sectionId}-section`);
    if (!section) return null;

    // Tambahkan form jika belum ada
    if (!section.querySelector("form")) {
      const form = document.createElement("form");
      form.id = `${sectionId}-form`;
      form.className = "stock-form";

      const isDigital = sectionId === "stock-digital";

      form.innerHTML = `
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
          <label for="${sectionId}-qty">Qty Stock (Lembar)</label>
          <input type="number" id="${sectionId}-qty" name="qty" min="0" required />
        </div>
        <div class="form-group">
          <label for="${sectionId}-${isDigital ? "actual" : "satuan"}">${
        isDigital ? "Actual" : "Satuan"
      }</label>
          <input type="text" id="${sectionId}-${
        isDigital ? "actual" : "satuan"
      }" name="${isDigital ? "actual" : "satuan"}" required />
        </div>
        <div class="form-group">
          <label for="${sectionId}-tanggal">Tanggal</label>
          <input type="date" id="${sectionId}-tanggal" name="tanggal" required />
        </div>
        <button type="submit">Simpan</button>
      `;
      section.appendChild(form);
    }

    return {
      form: section.querySelector("form"),
      nomor: section.querySelector('[name="nomor"]'),
      jenisKertas: section.querySelector('[name="jenisKertas"]'),
      ukuran: section.querySelector('[name="ukuran"]'),
      qty: section.querySelector('[name="qty"]'),
      ...(sectionId === "stock-digital"
        ? { actual: section.querySelector('[name="actual"]') }
        : { satuan: section.querySelector('[name="satuan"]') }),
      tanggal: section.querySelector('[name="tanggal"]'),
    };
  }

  initializeInOutForm(sectionId) {
    const section = document.getElementById(`${sectionId}-section`);
    if (!section) return null;

    // Tambahkan form jika belum ada
    if (!section.querySelector("form")) {
      const form = document.createElement("form");
      form.id = `${sectionId}-form`;
      form.className = "inout-form";

      // Khusus untuk form In Banner dan In Digital
      if (sectionId === "in-banner" || sectionId === "in-digital") {
        form.innerHTML = `
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

        // Tambahkan event listener untuk menghitung total
        const updateTotal = () => {
          const qtyLastMonth =
            Number(form.querySelector('[name="qtyLastMonth"]').value) || 0;
          const jumlahMasuk =
            Number(form.querySelector('[name="jumlahMasuk"]').value) || 0;
          const total = qtyLastMonth + jumlahMasuk;
          document.getElementById(`${sectionId}-total`).textContent = total;
        };

        form
          .querySelector('[name="qtyLastMonth"]')
          .addEventListener("input", updateTotal);
        form
          .querySelector('[name="jumlahMasuk"]')
          .addEventListener("input", updateTotal);
      }
      // Khusus untuk form In Produksi
      else if (sectionId === "in-produksi") {
        form.innerHTML = `
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
          <div class="form-group">
            <label for="${sectionId}-remark">Remark</label>
            <input type="text" id="${sectionId}-remark" name="remark" />
          </div>
          <button type="submit">Simpan</button>
        `;

        // Tambahkan event listener untuk menghitung total
        const updateTotal = () => {
          const qtyLastMonth =
            Number(form.querySelector('[name="qtyLastMonth"]').value) || 0;
          const jumlahMasuk =
            Number(form.querySelector('[name="jumlahMasuk"]').value) || 0;
          const total = qtyLastMonth + jumlahMasuk;
          document.getElementById(`${sectionId}-total`).textContent = total;
        };

        form
          .querySelector('[name="qtyLastMonth"]')
          .addEventListener("input", updateTotal);
        form
          .querySelector('[name="jumlahMasuk"]')
          .addEventListener("input", updateTotal);
      }
      // Khusus untuk form Out Banner, Out Digital, dan Out Produksi
      else if (
        sectionId === "out-banner" ||
        sectionId === "out-digital" ||
        sectionId === "out-produksi"
      ) {
        form.innerHTML = `
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

        // Tambahkan event listener untuk menghitung total dan sisa stock
        const updateTotals = () => {
          const totalMasuk =
            Number(form.querySelector('[name="totalMasuk"]').value) || 0;
          const totalKeluarOk =
            Number(form.querySelector('[name="totalKeluarOk"]').value) || 0;
          const totalKeluarNg =
            Number(form.querySelector('[name="totalKeluarNg"]').value) || 0;

          const totalKeluar = totalKeluarOk + totalKeluarNg;
          const sisaStock = totalMasuk - totalKeluar;

          document.getElementById(`${sectionId}-total-keluar`).textContent =
            totalKeluar;
          document.getElementById(`${sectionId}-sisa-stock`).textContent =
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
      } else {
        form.innerHTML = `
          <div class="form-group">
            <label for="${sectionId}-jenis">Jenis Bahan</label>
            <input type="text" id="${sectionId}-jenis" name="jenis" required />
          </div>
          <div class="form-group">
            <label for="${sectionId}-jumlah">Jumlah</label>
            <input type="number" id="${sectionId}-jumlah" name="jumlah" min="0" required />
          </div>
          <div class="form-group">
            <label for="${sectionId}-tanggal">Tanggal</label>
            <input type="date" id="${sectionId}-tanggal" name="tanggal" required />
          </div>
          <div class="form-group">
            <label for="${sectionId}-keterangan">Keterangan</label>
            <textarea id="${sectionId}-keterangan" name="keterangan" rows="3"></textarea>
          </div>
          <button type="submit">Simpan</button>
        `;
      }
      section.appendChild(form);
    }

    // Return untuk form In Banner dan In Digital
    if (sectionId === "in-banner" || sectionId === "in-digital") {
      return {
        form: section.querySelector("form"),
        nomor: section.querySelector('[name="nomor"]'),
        jenisKertas: section.querySelector('[name="jenisKertas"]'),
        ukuran: section.querySelector('[name="ukuran"]'),
        qtyLastMonth: section.querySelector('[name="qtyLastMonth"]'),
        tanggal: section.querySelector('[name="tanggal"]'),
        jumlahMasuk: section.querySelector('[name="jumlahMasuk"]'),
        total: section.querySelector(`#${sectionId}-total`),
      };
    } else if (
      sectionId === "out-banner" ||
      sectionId === "out-digital" ||
      sectionId === "out-produksi"
    ) {
      return {
        form: section.querySelector("form"),
        nomor: section.querySelector('[name="nomor"]'),
        jenisKertas: section.querySelector('[name="jenisKertas"]'),
        ukuran: section.querySelector('[name="ukuran"]'),
        totalMasuk: section.querySelector('[name="totalMasuk"]'),
        tanggal: section.querySelector('[name="tanggal"]'),
        totalKeluarOk: section.querySelector('[name="totalKeluarOk"]'),
        totalKeluarNg: section.querySelector('[name="totalKeluarNg"]'),
        totalKeluar: section.querySelector(`#${sectionId}-total-keluar`),
        sisaStock: section.querySelector(`#${sectionId}-sisa-stock`),
      };
    } else if (sectionId === "in-produksi") {
      return {
        form: section.querySelector("form"),
        nomor: section.querySelector('[name="nomor"]'),
        jenisKertas: section.querySelector('[name="jenisKertas"]'),
        ukuran: section.querySelector('[name="ukuran"]'),
        qtyLastMonth: section.querySelector('[name="qtyLastMonth"]'),
        tanggal: section.querySelector('[name="tanggal"]'),
        jumlahMasuk: section.querySelector('[name="jumlahMasuk"]'),
        total: section.querySelector("#in-produksi-total"),
        remark: section.querySelector('[name="remark"]'),
      };
    }

    return {
      form: section.querySelector("form"),
      jenis: section.querySelector('[name="jenis"]'),
      jumlah: section.querySelector('[name="jumlah"]'),
      tanggal: section.querySelector('[name="tanggal"]'),
      keterangan: section.querySelector('[name="keterangan"]'),
    };
  }

  formatTitle(sectionId) {
    return sectionId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  bindStockSubmit(category, handler) {
    const form = this.stockForms[category]?.form;
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formElements = form.elements;
        const isDigital = category === "digital";

        const data = {
          nomor: Number(formElements.nomor.value),
          jenisKertas: formElements.jenisKertas.value,
          ukuran: formElements.ukuran.value,
          qty: Number(formElements.qty.value),
          [isDigital ? "actual" : "satuan"]:
            formElements[isDigital ? "actual" : "satuan"].value,
          tanggalLengkap: formElements.tanggal.value,
        };
        handler(data);
      });
    }
  }

  bindInOutSubmit(handler) {
    // Bind untuk form In Banner dan In Digital
    ["in-banner", "in-digital"].forEach((formType) => {
      const formElements = this.initializeInOutForm(formType);
      if (!formElements) return;

      const {
        form,
        nomor,
        jenisKertas,
        ukuran,
        qtyLastMonth,
        tanggal,
        jumlahMasuk,
        total,
      } = formElements;

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        handler({
          type: formType,
          data: {
            nomor: Number(nomor.value),
            jenisKertas: jenisKertas.value,
            ukuran: ukuran.value,
            qtyLastMonth: Number(qtyLastMonth.value),
            tanggal: tanggal.value,
            jumlahMasuk: Number(jumlahMasuk.value),
            total: Number(total.textContent),
          },
        });

        form.reset();
      });
    });

    // Bind untuk form In Produksi
    const formElementsProduksi = this.initializeInOutForm("in-produksi");
    if (formElementsProduksi) {
      const {
        form,
        nomor,
        jenisKertas,
        ukuran,
        qtyLastMonth,
        tanggal,
        jumlahMasuk,
        total,
        remark,
      } = formElementsProduksi;

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        handler({
          type: "in-produksi",
          data: {
            nomor: Number(nomor.value),
            jenisKertas: jenisKertas.value,
            ukuran: ukuran.value,
            qtyLastMonth: Number(qtyLastMonth.value),
            tanggal: tanggal.value,
            jumlahMasuk: Number(jumlahMasuk.value),
            total: Number(total.textContent),
            remark: remark.value,
          },
        });

        form.reset();
      });
    }

    // Bind untuk form Out Banner, Out Digital, dan Out Produksi
    ["out-banner", "out-digital", "out-produksi"].forEach((formType) => {
      const formElements = this.initializeInOutForm(formType);
      if (!formElements) return;

      const {
        form,
        nomor,
        jenisKertas,
        ukuran,
        totalMasuk,
        tanggal,
        totalKeluarOk,
        totalKeluarNg,
      } = formElements;

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const totalKeluar =
          Number(totalKeluarOk.value) + Number(totalKeluarNg.value);
        const sisaStock = Number(totalMasuk.value) - totalKeluar;

        handler({
          type: formType,
          data: {
            nomor: Number(nomor.value),
            jenisKertas: jenisKertas.value,
            ukuran: ukuran.value,
            totalMasuk: Number(totalMasuk.value),
            tanggal: tanggal.value,
            totalKeluarOk: Number(totalKeluarOk.value),
            totalKeluarNg: Number(totalKeluarNg.value),
            totalKeluar: totalKeluar,
            sisaStock: sisaStock,
          },
        });

        form.reset();
      });
    });
  }

  resetForm(category, type = null) {
    if (type === null) {
      // Reset stock form
      this.stockForms[category]?.form.reset();
    } else {
      // Reset in/out form
      this.inOutForms[category]?.[type]?.form.reset();
    }
  }

  showSuccess(message) {
    alert(message);
  }

  showError(message) {
    alert(message);
  }
}
