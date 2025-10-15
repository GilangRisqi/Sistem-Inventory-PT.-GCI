export class RekapPresenter {
  constructor(bahanBakuModel, dailyReportModel, iridesseReportModel, view) {
    this.bahanBakuModel = bahanBakuModel;
    this.dailyReportModel = dailyReportModel;
    this.iridesseReportModel = iridesseReportModel;
    this.view = view;
    this.currentData = [];
    this.currentTipe = "";

    this.view.bindGenerateRekap(this.handleGenerateRekap.bind(this));
    this.view.bindEditRecord(this.handleEditRecord.bind(this));
    this.view.bindSaveRecord(this.handleSaveInlineEdit.bind(this));
    this.view.bindCancelEdit(this.handleCancelInlineEdit.bind(this));
    this.view.bindDeleteRecord(this.handleDeleteRecord.bind(this));
  }

  async handleGenerateRekap({ tipe, startDate, endDate }) {
    try {
      console.log(`🔍 Generating rekap for type: ${tipe}`);
      console.log(
        `📅 Date range: ${startDate.toISOString().split("T")[0]} to ${
          endDate.toISOString().split("T")[0]
        }`
      );

      let model;
      if (tipe === "bahan-baku") {
        model = this.bahanBakuModel;
        console.log("📊 Using BahanBakuModel");
      } else if (tipe === "iridesse-report") {
        model = this.iridesseReportModel;
        console.log("📊 Using IridesseReportModel");
      } else {
        model = this.dailyReportModel;
        console.log("📊 Using DailyReportModel");
      }

      console.log("🔄 Calling getByDateRange...");
      const data = await model.getByDateRange(startDate, endDate);
      console.log(`✅ Retrieved ${data.length} records`);

      if (data.length > 0) {
        console.log("📋 Sample record:", data[0]);
      } else {
        console.warn("⚠️ No data found for the selected period");
      }

      this.currentData = data;
      this.currentTipe = tipe;
      this.view.displayTable(data, tipe);

      if (data.length === 0) {
        this.view.showError(
          `Tidak ada data ${tipe} untuk periode yang dipilih. Pastikan Anda telah menginput data pada menu yang sesuai.`
        );
      }
    } catch (error) {
      console.error("❌ Error in handleGenerateRekap:", error);
      this.view.showError(`Gagal generate laporan: ${error.message}`);
    }
  }

  async handleEditRecord(id, type) {
    try {
      const row = document.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (!row) {
        this.view.showError("Row tidak ditemukan!");
        return;
      }

      this.toggleEditMode(row, true);
    } catch (error) {
      this.view.showError("Gagal masuk mode edit: " + error.message);
    }
  }

  async handleDeleteRecord(id, type) {
    try {
      if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        return;
      }

      let model;
      if (type === "iridesse-report") {
        model = this.iridesseReportModel;
      } else if (type === "daily-report") {
        model = this.dailyReportModel;
      } else {
        return;
      }

      await model.delete(id);
      this.view.showSuccess("Data berhasil dihapus!");
      this.refreshCurrentTable();
    } catch (error) {
      this.view.showError("Gagal menghapus data: " + error.message);
    }
  }

  toggleEditMode(row, isEdit) {
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
        } else if (type === "time") {
          input = document.createElement("input");
          input.type = "time";
          input.className = "form-control form-control-sm";
          input.value = value;
        } else if (type === "number") {
          input = document.createElement("input");
          input.type = "number";
          input.className = "form-control form-control-sm";
          input.value = value;
          input.min = "0";
        } else {
          input = document.createElement("input");
          input.type = "text";
          input.className = "form-control form-control-sm";
          input.value = value;
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

  async handleSaveInlineEdit(id, type) {
    try {
      const row = document.querySelector(
        `tr[data-id="${id}"][data-type="${type}"]`
      );
      if (!row) {
        this.view.showError("Row tidak ditemukan!");
        return;
      }

      const data = {};
      const inputs = row.querySelectorAll(".editable input, .editable select");

      inputs.forEach((input) => {
        const field = input.getAttribute("data-field");
        data[field] = input.value;
      });

      let model;
      if (type === "iridesse-report") {
        model = this.iridesseReportModel;
        data.totalCetak =
          (Number(data.jumlahCetak) || 0) - (Number(data.ng) || 0);
      } else {
        model = this.dailyReportModel;
        data.totalQtyCetakAll =
          (Number(data.qtyCetakOk) || 0) + (Number(data.qtyCetakNg) || 0);
      }

      await model.update(id, data);
      this.view.showSuccess("Data berhasil diperbarui!");
      this.refreshCurrentTable();
    } catch (error) {
      this.view.showError("Gagal menyimpan perubahan: " + error.message);
    }
  }

  handleCancelInlineEdit(id, type) {
    const row = document.querySelector(
      `tr[data-id="${id}"][data-type="${type}"]`
    );
    if (row) {
      this.toggleEditMode(row, false);
    }
  }

  async refreshCurrentTable() {
    if (this.currentTipe && this.currentData.length > 0) {
      const periodeInput = document.getElementById("rekap-periode");
      if (periodeInput && periodeInput.value) {
        const [year, month] = periodeInput.value.split("-");
        await this.handleGenerateRekap({
          tipe: this.currentTipe,
          startDate: new Date(year, month - 1, 1),
          endDate: new Date(year, month, 0),
        });
      }
    }
  }
}
