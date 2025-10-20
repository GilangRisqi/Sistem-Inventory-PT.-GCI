// Import Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import CSS
import "../css/style.css";

// Import Models
import { BahanBakuModel } from "./models/BahanBakuModel.js";
import { DailyReportModel } from "./models/DailyReportModel.js";
import { IridesseReportModel } from "./models/IridesseReportModel.js";
import { StraplessReportModel } from "./models/StraplessReportModel.js";
import { LipatReportModel } from "./models/LipatReportModel.js";
import { LemPackingReportModel } from "./models/LemPackingReportModel.js";

// Import Views
import { LoginView } from "./views/LoginView.js";
import { NavigationView } from "./views/NavigationView.js";
import { HeaderView } from "./views/HeaderView.js";
import { BahanBakuView } from "./views/BahanBakuView.js";
import { DailyReportView } from "./views/DailyReportView.js";
import { IridesseReportView } from "./views/IridesseReportView.js";
import { StraplessReportView } from "./views/StraplessReportView.js";
import { LipatReportView } from "./views/LipatReportView.js";
import { LemPackingReportView } from "./views/LemPackingReportView.js";
import { RekapView } from "./views/RekapView.js";

// Import Presenters
import { LoginPresenter } from "./presenters/LoginPresenter.js";
import { NavigationPresenter } from "./presenters/NavigationPresenter.js";
import { HeaderPresenter } from "./presenters/HeaderPresenter.js";
import { BahanBakuPresenter } from "./presenters/BahanBakuPresenter.js";
import { DailyReportPresenter } from "./presenters/DailyReportPresenter.js";
import { IridesseReportPresenter } from "./presenters/IridesseReportPresenter.js";
import { StraplessReportPresenter } from "./presenters/StraplessReportPresenter.js";
import { LipatReportPresenter } from "./presenters/LipatReportPresenter.js";
import { LemPackingReportPresenter } from "./presenters/LemPackingReportPresenter.js";
import { RekapPresenter } from "./presenters/RekapPresenter.js";

// Import Database
import * as db from "./db.js";

// Import Utils
import { AccessControl } from "./utils/AccessControl.js";

class App {
  constructor() {
    // App initialization
  }

  async initDatabase() {
    try {
      await db.openDB();
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  bindEvents() {
    document.addEventListener("loginSuccess", (event) => {
      try {
        const userRole = event.detail?.role;
        console.log(`App: Login success for role: ${userRole}`);

        this.navigationPresenter.showPage("dashboard");
        this.navigationPresenter.showDefaultSection();

        // Initialize access control after login
        setTimeout(() => {
          AccessControl.init();
        }, 500);
      } catch (error) {
        console.error("App: Error during dashboard redirect:", error);
      }
    });

    document.addEventListener("logout", () => {
      this.navigationPresenter.showPage("login");
    });

    // Online/Offline handling
    window.addEventListener("online", () => {
      db.processSyncQueue();
    });

    window.addEventListener("offline", () => {
      // Handle offline state
    });
  }

  async init() {
    try {
      // Initialize Database first
      await db.openDB();

      // Initialize Models
      try {
        this.bahanBakuModel = new BahanBakuModel();
      } catch (error) {
        console.error("BahanBakuModel creation error:", error);
        return;
      }
      this.dailyReportModel = new DailyReportModel();
      this.iridesseReportModel = new IridesseReportModel();
      this.straplessReportModel = new StraplessReportModel();
      this.lipatReportModel = new LipatReportModel();
      this.lemPackingReportModel = new LemPackingReportModel();

      // Initialize Views
      this.loginView = new LoginView();
      this.navigationView = new NavigationView();
      this.headerView = new HeaderView();
      try {
        this.bahanBakuView = new BahanBakuView(this.bahanBakuModel);
      } catch (error) {
        console.error("BahanBakuView creation error:", error);
        return;
      }
      this.dailyReportView = new DailyReportView();
      this.iridesseReportView = new IridesseReportView();
      this.straplessReportView = new StraplessReportView();
      this.lipatReportView = new LipatReportView();
      this.lemPackingReportView = new LemPackingReportView();
      this.rekapView = new RekapView();

      // Initialize Presenters
      this.loginPresenter = new LoginPresenter(this.loginView);

      this.navigationPresenter = new NavigationPresenter(this.navigationView);

      this.headerPresenter = new HeaderPresenter(
        this.headerView,
        this.navigationView
      );

      try {
        this.bahanBakuPresenter = new BahanBakuPresenter(
          this.bahanBakuModel,
          this.bahanBakuView
        );

        // Initialize auto numbers setelah presenter dibuat
        setTimeout(async () => {
          try {
            await this.bahanBakuView.initializeAutoNumbers();
            console.log("🔢 Auto numbers initialized in app.js");
          } catch (error) {
            console.error("Error initializing auto numbers in app.js:", error);
          }
        }, 1000);
      } catch (error) {
        console.error("BahanBakuPresenter creation error:", error);
        return;
      }

      this.dailyReportPresenter = new DailyReportPresenter(
        this.dailyReportModel,
        this.dailyReportView
      );

      this.iridesseReportPresenter = new IridesseReportPresenter(
        this.iridesseReportModel,
        this.iridesseReportView
      );

      this.straplessReportPresenter = new StraplessReportPresenter(
        this.straplessReportView
      );

      this.lipatReportPresenter = new LipatReportPresenter(
        this.lipatReportModel,
        this.lipatReportView
      );

      this.lemPackingReportPresenter = new LemPackingReportPresenter(
        this.lemPackingReportModel,
        this.lemPackingReportView
      );

      this.rekapPresenter = new RekapPresenter(
        this.bahanBakuModel,
        this.dailyReportModel,
        this.iridesseReportModel,
        this.straplessReportModel,
        this.lipatReportModel,
        this.lemPackingReportModel,
        this.rekapView
      );

      // Bind event listeners
      this.bindEvents();
    } catch (error) {
      console.error("Error initializing app:", error);
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  try {
    const app = new App();
    app.init();
  } catch (error) {
    console.error("FATAL ERROR during app initialization:", error);
  }
});

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {})
      .catch((err) => {});
  });
}
