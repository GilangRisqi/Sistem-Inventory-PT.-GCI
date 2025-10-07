import Database from "./db.js";
import BahanBakuModel from "./models/BahanBakuModel.js";
import BahanBakuView from "./views/BahanBakuView.js";
import BahanBakuPresenter from "./presenters/BahanBakuPresenter.js";
import DailyReportModel from "./models/DailyReportModel.js";
import DailyReportView from "./views/DailyReportView.js";
import DailyReportPresenter from "./presenters/DailyReportPresenter.js";
import RekapView from "./views/RekapView.js";
import RekapPresenter from "./presenters/RekapPresenter.js";
import HeaderView from "./views/HeaderView.js";
import HeaderPresenter from "./presenters/HeaderPresenter.js";
import NavigationView from "./views/NavigationView.js";
import NavigationPresenter from "./presenters/NavigationPresenter.js";

class App {
  constructor() {
    this.db = new Database();
    console.log("App constructor called");
  }

  async init() {
    console.log("=== APP INIT START ===");

    try {
      // Step 1: Database
      console.log("1. Database init...");
      await this.db.init();
      console.log("✓ Database OK");

      // Step 2: Model
      console.log("2. Creating Model...");
      this.bahanBakuModel = new BahanBakuModel(this.db);
      console.log("✓ Model OK:", !!this.bahanBakuModel);

      // Step 3: View
      console.log("3. Creating View...");
      this.bahanBakuView = new BahanBakuView(this.bahanBakuModel);
      console.log("✓ View OK:", !!this.bahanBakuView);

      // Step 4: Presenter - This is where it likely fails
      console.log("4. About to create Presenter...");
      console.log("- Model exists:", !!this.bahanBakuModel);
      console.log("- View exists:", !!this.bahanBakuView);
      console.log("- BahanBakuPresenter class:", typeof BahanBakuPresenter);

      this.bahanBakuPresenter = new BahanBakuPresenter(
        this.bahanBakuModel,
        this.bahanBakuView
      );
      console.log("✓ Presenter created:", !!this.bahanBakuPresenter);

      // Other components
      console.log("5. Creating other components...");
      this.dailyReportModel = new DailyReportModel(this.db);
      this.dailyReportView = new DailyReportView();
      this.dailyReportPresenter = new DailyReportPresenter(
        this.dailyReportModel,
        this.dailyReportView
      );
      this.rekapView = new RekapView();
      this.rekapPresenter = new RekapPresenter(
        this.bahanBakuModel,
        this.rekapView
      );
      this.headerView = new HeaderView();
      this.headerPresenter = new HeaderPresenter(this.headerView);

      // Navigation
      this.navigationView = new NavigationView();
      this.navigationPresenter = new NavigationPresenter(this.navigationView);

      console.log("=== APP INIT COMPLETE ===");
    } catch (error) {
      console.error("❌ INIT ERROR:", error);
      console.error("Error details:", error.message);
      console.error("Stack:", error.stack);
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM loaded, starting app...");
  const app = new App();
  await app.init();
});
