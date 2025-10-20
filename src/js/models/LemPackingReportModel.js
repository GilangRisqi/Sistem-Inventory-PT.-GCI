class LemPackingReportModel {
  constructor() {
    this.storageKey = "lem-packing-reports";
  }

  // Get all lem packing reports from localStorage
  getAll() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Add new lem packing report
  add(reportData) {
    try {
      // Validate required fields
      const requiredFields = [
        "nomor",
        "tanggal",
        "operator",
        "jenisPekerjaan",
        "timeStart",
        "timeFinish",
        "qtyOk",
        "qtyNg",
        "noSpk",
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

  // Update existing lem packing report
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
        "timeStart",
        "timeFinish",
        "qtyOk",
        "qtyNg",
        "noSpk",
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

  // Delete lem packing report
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

  // Get next available nomor for current month (like banner pattern)
  async getNextNomor() {
    try {
      console.log("🔍 LemPacking: Getting next nomor from database...");
      const allReports = this.getAll();
      console.log(
        "📊 LemPacking: Total reports in database:",
        allReports.length
      );

      // Get current month and year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // 0-based month
      console.log(
        `📅 LemPacking: Current month/year: ${currentMonth + 1}/${currentYear}`
      );

      // Filter reports for the current month and year
      const reportsForMonth = allReports.filter((report) => {
        const reportDate = new Date(report.tanggal);
        const reportYear = reportDate.getFullYear();
        const reportMonth = reportDate.getMonth();
        return reportYear === currentYear && reportMonth === currentMonth;
      });

      console.log(
        "📈 LemPacking: Reports for current month:",
        reportsForMonth.length
      );

      if (reportsForMonth.length === 0) {
        console.log("✨ LemPacking: First report for this month, returning 1");
        return 1; // First report for this month
      }

      // Find the maximum nomor for this month and increment by 1
      const nomors = reportsForMonth.map((report) => Number(report.nomor) || 0);
      console.log("🔢 LemPacking: Existing nomors:", nomors);

      const maxNomor = Math.max(...nomors);
      const nextNomor = maxNomor + 1;

      console.log(
        `🎯 LemPacking: Max nomor: ${maxNomor}, Next nomor: ${nextNomor}`
      );
      return nextNomor;
    } catch (error) {
      console.error("❌ LemPacking: Error getting next nomor:", error);
      return 1; // Default to 1 if error occurs
    }
  }

  // Save data with promise pattern (like DailyReportModel)
  async save(data) {
    return new Promise((resolve, reject) => {
      try {
        const result = this.add(data);
        if (result.success) {
          resolve(result);
        } else {
          reject(new Error(result.error || "Failed to save"));
        }
      } catch (error) {
        reject(error);
      }
    });
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

export { LemPackingReportModel };
