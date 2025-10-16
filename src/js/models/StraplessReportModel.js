export class StraplessReportModel {
  constructor() {
    this.data = [];
    this.nextId = 1;
    this.loadFromStorage();
  }

  // Generate new ID
  generateId() {
    const id = this.nextId;
    this.nextId++;
    this.saveToStorage();
    return id;
  }

  // Add new strapless report entry
  add(reportData) {
    const id = this.generateId();
    const newEntry = {
      id,
      nomor: reportData.nomor || 0,
      tanggal: reportData.tanggal,
      operator: reportData.operator,
      jenisPekerjaan: reportData.jenisPekerjaan,
      timeStart: reportData.timeStart,
      timeFinish: reportData.timeFinish,
      qtyOk: Number(reportData.qtyOk) || 0,
      qtyNg: Number(reportData.qtyNg) || 0,
      totalQty:
        (Number(reportData.qtyOk) || 0) + (Number(reportData.qtyNg) || 0),
      satuan: reportData.satuan,
      prosesSelanjutnya: reportData.prosesSelanjutnya,
      keterangan: reportData.keterangan || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.push(newEntry);
    this.saveToStorage();
    return newEntry;
  }

  // Get all entries
  getAll() {
    return [...this.data];
  }

  // Get entry by ID
  getById(id) {
    return this.data.find((item) => item.id === parseInt(id));
  }

  // Update entry
  update(id, updateData) {
    const index = this.data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) return null;

    // Update only provided fields
    const updatedEntry = { ...this.data[index] };
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined && key !== "id") {
        updatedEntry[key] = updateData[key];
      }
    });

    // Recalculate total if qty values change
    if (updateData.qtyOk !== undefined || updateData.qtyNg !== undefined) {
      updatedEntry.totalQty =
        (Number(updatedEntry.qtyOk) || 0) + (Number(updatedEntry.qtyNg) || 0);
    }

    updatedEntry.updatedAt = new Date().toISOString();
    this.data[index] = updatedEntry;
    this.saveToStorage();
    return updatedEntry;
  }

  // Delete entry
  delete(id) {
    const index = this.data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) return false;

    this.data.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Get entries by date range
  getByDateRange(startDate, endDate) {
    return this.data.filter((item) => {
      const itemDate = new Date(item.tanggal);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  // Get entries by operator
  getByOperator(operator) {
    return this.data.filter(
      (item) =>
        item.operator &&
        item.operator.toLowerCase().includes(operator.toLowerCase())
    );
  }

  // Get summary statistics
  getSummary(filterData = null) {
    const dataToAnalyze = filterData || this.data;

    return {
      totalEntries: dataToAnalyze.length,
      totalQtyOk: dataToAnalyze.reduce(
        (sum, item) => sum + (Number(item.qtyOk) || 0),
        0
      ),
      totalQtyNg: dataToAnalyze.reduce(
        (sum, item) => sum + (Number(item.qtyNg) || 0),
        0
      ),
      totalQtyAll: dataToAnalyze.reduce(
        (sum, item) => sum + (Number(item.totalQty) || 0),
        0
      ),
      averageQtyOk:
        dataToAnalyze.length > 0
          ? dataToAnalyze.reduce(
              (sum, item) => sum + (Number(item.qtyOk) || 0),
              0
            ) / dataToAnalyze.length
          : 0,
      averageQtyNg:
        dataToAnalyze.length > 0
          ? dataToAnalyze.reduce(
              (sum, item) => sum + (Number(item.qtyNg) || 0),
              0
            ) / dataToAnalyze.length
          : 0,
      averageQtyAll:
        dataToAnalyze.length > 0
          ? dataToAnalyze.reduce(
              (sum, item) => sum + (Number(item.totalQty) || 0),
              0
            ) / dataToAnalyze.length
          : 0,
    };
  }

  // Save to localStorage
  saveToStorage() {
    try {
      localStorage.setItem("straplessReportData", JSON.stringify(this.data));
      localStorage.setItem("straplessReportNextId", this.nextId.toString());
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }

  // Load from localStorage
  loadFromStorage() {
    try {
      const savedData = localStorage.getItem("straplessReportData");
      const savedNextId = localStorage.getItem("straplessReportNextId");

      if (savedData) {
        this.data = JSON.parse(savedData);
      }

      if (savedNextId) {
        this.nextId = parseInt(savedNextId);
      }

      // Ensure nextId is always greater than existing IDs
      if (this.data.length > 0) {
        const maxId = Math.max(...this.data.map((item) => item.id));
        if (this.nextId <= maxId) {
          this.nextId = maxId + 1;
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      this.data = [];
      this.nextId = 1;
    }
  }

  // Clear all data
  clearAll() {
    this.data = [];
    this.nextId = 1;
    this.saveToStorage();
  }

  // Export data
  exportData() {
    return {
      data: this.data,
      nextId: this.nextId,
      exportedAt: new Date().toISOString(),
    };
  }

  // Import data
  importData(importedData) {
    if (importedData && importedData.data && Array.isArray(importedData.data)) {
      this.data = importedData.data;
      this.nextId = importedData.nextId || 1;

      // Ensure nextId consistency
      if (this.data.length > 0) {
        const maxId = Math.max(...this.data.map((item) => item.id));
        if (this.nextId <= maxId) {
          this.nextId = maxId + 1;
        }
      }

      this.saveToStorage();
      return true;
    }
    return false;
  }
}
