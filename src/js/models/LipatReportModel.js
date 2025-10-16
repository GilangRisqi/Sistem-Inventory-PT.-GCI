class LipatReportModel {
  constructor() {
    this.storageKey = "lipat-reports";
  }

  // Get all lipat reports from localStorage
  getAll() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Add new lipat report
  add(reportData) {
    try {
      // Validate required fields
      const requiredFields = [
        "nomor",
        "tanggal",
        "operator",
        "jenisPekerjaan",
        "produk",
        "terimaDari",
        "timeStart",
        "timeFinish",
        "qtyOk",
        "qtyNg",
        "satuan",
        "prosesSelanjutnya",
      ];
      for (let field of requiredFields) {
        if (!reportData[field] && reportData[field] !== 0) {
          throw new Error(`Field ${field} is required`);
        }
      }

      const reports = this.getAll();

      // Check if nomor already exists for the same date
      const existingReport = reports.find(
        (r) => r.nomor == reportData.nomor && r.tanggal === reportData.tanggal
      );

      if (existingReport) {
        throw new Error(
          `Nomor ${reportData.nomor} sudah ada untuk tanggal ${reportData.tanggal}`
        );
      }

      // Convert string numbers to integers
      reportData.nomor = parseInt(reportData.nomor);
      reportData.qtyOk = parseInt(reportData.qtyOk) || 0;
      reportData.qtyNg = parseInt(reportData.qtyNg) || 0;

      // Calculate total
      reportData.totalQty = reportData.qtyOk + reportData.qtyNg;

      // Add timestamp
      reportData.id = Date.now();
      reportData.createdAt = new Date().toISOString();

      reports.push(reportData);
      localStorage.setItem(this.storageKey, JSON.stringify(reports));

      return { success: true, data: reportData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update existing lipat report
  update(id, reportData) {
    try {
      const reports = this.getAll();
      const index = reports.findIndex((r) => r.id == id);

      if (index === -1) {
        throw new Error("Laporan tidak ditemukan");
      }

      // Validate required fields
      const requiredFields = [
        "nomor",
        "tanggal",
        "operator",
        "jenisPekerjaan",
        "produk",
        "terimaDari",
        "timeStart",
        "timeFinish",
        "qtyOk",
        "qtyNg",
        "satuan",
        "prosesSelanjutnya",
      ];
      for (let field of requiredFields) {
        if (!reportData[field] && reportData[field] !== 0) {
          throw new Error(`Field ${field} is required`);
        }
      }

      // Check if nomor already exists for other reports on the same date
      const existingReport = reports.find(
        (r) =>
          r.id != id &&
          r.nomor == reportData.nomor &&
          r.tanggal === reportData.tanggal
      );

      if (existingReport) {
        throw new Error(
          `Nomor ${reportData.nomor} sudah ada untuk tanggal ${reportData.tanggal}`
        );
      }

      // Convert string numbers to integers
      reportData.nomor = parseInt(reportData.nomor);
      reportData.qtyOk = parseInt(reportData.qtyOk) || 0;
      reportData.qtyNg = parseInt(reportData.qtyNg) || 0;

      // Calculate total
      reportData.totalQty = reportData.qtyOk + reportData.qtyNg;

      // Preserve original timestamps
      reportData.id = reports[index].id;
      reportData.createdAt = reports[index].createdAt;
      reportData.updatedAt = new Date().toISOString();

      reports[index] = reportData;
      localStorage.setItem(this.storageKey, JSON.stringify(reports));

      return { success: true, data: reportData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Delete lipat report
  delete(id) {
    try {
      const reports = this.getAll();
      const index = reports.findIndex((r) => r.id == id);

      if (index === -1) {
        throw new Error("Laporan tidak ditemukan");
      }

      reports.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(reports));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get reports by date range
  getByDateRange(startDate, endDate) {
    const reports = this.getAll();
    return reports
      .filter((report) => {
        const reportDate = new Date(report.tanggal);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return reportDate >= start && reportDate <= end;
      })
      .sort(
        (a, b) => new Date(a.tanggal) - new Date(b.tanggal) || a.nomor - b.nomor
      );
  }

  // Get report by ID
  getById(id) {
    const reports = this.getAll();
    return reports.find((r) => r.id == id);
  }

  // Clear all data (for testing/reset purposes)
  clearAll() {
    localStorage.removeItem(this.storageKey);
    return { success: true };
  }

  // Export data
  export() {
    return JSON.stringify(this.getAll(), null, 2);
  }

  // Import data
  import(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format");
      }
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export { LipatReportModel };
