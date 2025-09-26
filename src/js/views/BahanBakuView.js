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
      section.appendChild(form);
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

  bindInOutSubmit(category, type, handler) {
    const form = this.inOutForms[category]?.[type]?.form;
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = this.inOutForms[category][type];
        const data = {
          jenis: formData.jenis.value,
          jumlah: Number(formData.jumlah.value),
          tanggal: formData.tanggal.value,
          keterangan: formData.keterangan.value,
        };
        handler(data);
      });
    }
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
