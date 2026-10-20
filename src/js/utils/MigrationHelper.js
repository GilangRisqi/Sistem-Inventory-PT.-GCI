// Migration Helper Script
// Run this in browser console to migrate existing IndexedDB data to Supabase

class MigrationHelper {
  constructor() {
    this.results = {
      stock: { success: 0, failed: 0, errors: [] },
      dailyReports: { success: 0, failed: 0, errors: [] },
      iridesseReports: { success: 0, failed: 0, errors: [] },
    };
  }

  async migrate() {
    console.log("🚀 Starting full migration to Supabase...");
    console.log("⚠️ Make sure you have configured Supabase credentials first!");

    try {
      // Check Supabase connection
      const connectionStatus = window.dbService?.getConnectionStatus();
      console.log("📡 Connection status:", connectionStatus);

      if (!connectionStatus || !connectionStatus.isOnline) {
        throw new Error(
          "❌ Supabase connection not available. Please check configuration."
        );
      }

      // Migrate stock data
      await this.migrateStock();

      // Migrate daily reports
      await this.migrateDailyReports();

      // Migrate Iridesse reports
      await this.migrateIridesseReports();

      // Show final results
      this.showResults();
    } catch (error) {
      console.error("❌ Migration failed:", error);
      throw error;
    }
  }

  async migrateStock() {
    console.log("\n📦 Migrating Bahan Baku (Stock)...");

    try {
      const bahanBakuModel = new window.BahanBakuModel();
      bahanBakuModel.useSupabase = false; // Use IndexedDB first

      // Get IndexedDB data
      const indexedDBStock = await bahanBakuModel.getStock();
      console.log(`📊 Found ${indexedDBStock.length} stock items in IndexedDB`);

      if (indexedDBStock.length === 0) {
        console.log("ℹ️ No stock data to migrate");
        return;
      }

      // Switch to Supabase
      bahanBakuModel.useSupabase = true;

      for (const [index, item] of indexedDBStock.entries()) {
        try {
          console.log(
            `📦 Migrating stock ${index + 1}/${indexedDBStock.length}: ${
              item.nama
            }`
          );

          const supabaseData = {
            nama: item.nama || item.name || "Unknown Item",
            stok: item.stok || item.stock || 0,
            satuan: item.satuan || item.unit || "pcs",
            kategori: item.kategori || item.category || "",
            harga_satuan: item.harga_satuan || item.price || 0,
            supplier: item.supplier || "",
            minimum_stok: item.minimum_stok || item.minStock || 0,
            lokasi_penyimpanan: item.lokasi_penyimpanan || item.location || "",
            keterangan: `Migrated from IndexedDB at ${new Date().toISOString()}. Original ID: ${
              item.id || "unknown"
            }`,
          };

          const result = await bahanBakuModel.addSupabaseStock(supabaseData);
          this.results.stock.success++;
          console.log(`✅ Migrated: ${item.nama} → ${result.id}`);
        } catch (error) {
          this.results.stock.failed++;
          this.results.stock.errors.push({
            item: item.nama || item.name || "Unknown",
            error: error.message,
          });
          console.error(`❌ Failed to migrate: ${item.nama}`, error.message);
        }
      }
    } catch (error) {
      console.error("❌ Stock migration error:", error);
      throw error;
    }
  }

  async migrateDailyReports() {
    console.log("\n📊 Migrating Daily Reports...");

    try {
      const dailyModel = new window.DailyReportModel();
      dailyModel.useSupabase = false; // Use IndexedDB first

      // Get IndexedDB data
      const indexedDBReports = await dailyModel.getAll();
      console.log(
        `📊 Found ${indexedDBReports.length} daily reports in IndexedDB`
      );

      if (indexedDBReports.length === 0) {
        console.log("ℹ️ No daily reports to migrate");
        return;
      }

      // Switch to Supabase
      dailyModel.useSupabase = true;

      for (const [index, report] of indexedDBReports.entries()) {
        try {
          console.log(
            `📊 Migrating report ${index + 1}/${indexedDBReports.length}: ${
              report.operator
            } - ${report.tanggal}`
          );

          const result = await dailyModel.saveToSupabase(report);
          this.results.dailyReports.success++;
          console.log(
            `✅ Migrated daily report: ${report.operator} → ${result.id}`
          );
        } catch (error) {
          this.results.dailyReports.failed++;
          this.results.dailyReports.errors.push({
            item: `${report.operator} - ${report.tanggal}`,
            error: error.message,
          });
          console.error(
            `❌ Failed to migrate daily report: ${report.operator}`,
            error.message
          );
        }
      }
    } catch (error) {
      console.error("❌ Daily reports migration error:", error);
      throw error;
    }
  }

  async migrateIridesseReports() {
    console.log("\n🖨️ Migrating Iridesse Reports...");

    try {
      const iridesseModel = new window.IridesseReportModel();
      iridesseModel.useSupabase = false; // Use IndexedDB first

      // Get IndexedDB data
      const indexedDBReports = await iridesseModel.getAll();
      console.log(
        `📊 Found ${indexedDBReports.length} Iridesse reports in IndexedDB`
      );

      if (indexedDBReports.length === 0) {
        console.log("ℹ️ No Iridesse reports to migrate");
        return;
      }

      // Switch to Supabase
      iridesseModel.useSupabase = true;

      for (const [index, report] of indexedDBReports.entries()) {
        try {
          console.log(
            `🖨️ Migrating Iridesse ${index + 1}/${indexedDBReports.length}: ${
              report.jobName
            } - ${report.tanggal}`
          );

          const result = await iridesseModel.saveToSupabase(report);
          this.results.iridesseReports.success++;
          console.log(
            `✅ Migrated Iridesse report: ${report.jobName} → ${result.id}`
          );
        } catch (error) {
          this.results.iridesseReports.failed++;
          this.results.iridesseReports.errors.push({
            item: `${report.jobName} - ${report.tanggal}`,
            error: error.message,
          });
          console.error(
            `❌ Failed to migrate Iridesse report: ${report.jobName}`,
            error.message
          );
        }
      }
    } catch (error) {
      console.error("❌ Iridesse reports migration error:", error);
      throw error;
    }
  }

  showResults() {
    console.log("\n🎉 Migration Completed!");
    console.log("==========================================");

    const total = {
      success:
        this.results.stock.success +
        this.results.dailyReports.success +
        this.results.iridesseReports.success,
      failed:
        this.results.stock.failed +
        this.results.dailyReports.failed +
        this.results.iridesseReports.failed,
    };

    console.log(`📦 Stock Items:`);
    console.log(`   ✅ Success: ${this.results.stock.success}`);
    console.log(`   ❌ Failed: ${this.results.stock.failed}`);

    console.log(`📊 Daily Reports:`);
    console.log(`   ✅ Success: ${this.results.dailyReports.success}`);
    console.log(`   ❌ Failed: ${this.results.dailyReports.failed}`);

    console.log(`🖨️ Iridesse Reports:`);
    console.log(`   ✅ Success: ${this.results.iridesseReports.success}`);
    console.log(`   ❌ Failed: ${this.results.iridesseReports.failed}`);

    console.log(`\n📈 Total Summary:`);
    console.log(`   ✅ Total Success: ${total.success}`);
    console.log(`   ❌ Total Failed: ${total.failed}`);
    console.log(
      `   📊 Success Rate: ${(
        (total.success / (total.success + total.failed)) *
        100
      ).toFixed(1)}%`
    );

    // Show errors if any
    const allErrors = [
      ...this.results.stock.errors,
      ...this.results.dailyReports.errors,
      ...this.results.iridesseReports.errors,
    ];

    if (allErrors.length > 0) {
      console.log("\n⚠️ Errors encountered:");
      allErrors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error.item}: ${error.error}`);
      });
    }

    console.log("\n🚀 Migration process completed successfully!");
    console.log(
      "💡 You can now enable Supabase in your models by setting useSupabase = true"
    );

    return {
      summary: total,
      details: this.results,
      errors: allErrors,
    };
  }

  // Quick test method
  async testConnection() {
    try {
      console.log("🔍 Testing Supabase connection...");

      const testData = {
        nama: "Migration Test Item",
        stok: 1,
        satuan: "pcs",
        kategori: "test",
      };

      const result = await window.dbService.create("bahan_baku", testData);
      console.log("✅ Test create successful:", result);

      await window.dbService.delete("bahan_baku", result.id);
      console.log("✅ Test delete successful");

      console.log("🎉 Supabase connection test passed!");
      return true;
    } catch (error) {
      console.error("❌ Supabase connection test failed:", error);
      return false;
    }
  }
}

// Make migration helper globally accessible
window.MigrationHelper = MigrationHelper;

// Quick access functions
window.migrateToSupabase = async () => {
  const helper = new MigrationHelper();
  return await helper.migrate();
};

window.testSupabaseConnection = async () => {
  const helper = new MigrationHelper();
  return await helper.testConnection();
};

console.log("🔧 Migration Helper loaded!");
console.log("📝 Available commands:");
console.log("   - window.testSupabaseConnection() : Test Supabase connection");
console.log("   - window.migrateToSupabase() : Migrate all data to Supabase");
console.log(
  "   - new window.MigrationHelper() : Manual migration with more control"
);

export { MigrationHelper };
