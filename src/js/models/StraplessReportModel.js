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
      client: reportData.client || "",
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

  // Get next available nomor for current month (like banner pattern)
  async getNextNomor() {
    try {
      console.log("🔍 Strapless: Getting next nomor from database...");
      const allReports = this.getAll();
      console.log(
        "📊 Strapless: Total reports in database:",
        allReports.length
      );

      // Get current month and year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // 0-based month
      console.log(
        `📅 Strapless: Current month/year: ${currentMonth + 1}/${currentYear}`
      );

      // Filter reports for the current month and year
      const reportsForMonth = allReports.filter((report) => {
        const reportDate = new Date(report.tanggal);
        const reportYear = reportDate.getFullYear();
        const reportMonth = reportDate.getMonth();
        return reportYear === currentYear && reportMonth === currentMonth;
      });

      console.log(
        "📈 Strapless: Reports for current month:",
        reportsForMonth.length
      );

      if (reportsForMonth.length === 0) {
        console.log("✨ Strapless: First report for this month, returning 1");
        return 1; // First report for this month
      }

      // Find the maximum nomor for this month and increment by 1
      const nomors = reportsForMonth.map((report) => Number(report.nomor) || 0);
      console.log("🔢 Strapless: Existing nomors:", nomors);

      const maxNomor = Math.max(...nomors);
      const nextNomor = maxNomor + 1;

      console.log(
        `🎯 Strapless: Max nomor: ${maxNomor}, Next nomor: ${nextNomor}`
      );
      return nextNomor;
    } catch (error) {
      console.error("❌ Strapless: Error getting next nomor:", error);
      return 1; // Default to 1 if error occurs
    }
  }

  // Save data with promise pattern (like DailyReportModel)
  async save(data) {
    return new Promise((resolve, reject) => {
      try {
        const result = this.add(data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
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
