console.log("=== APP.JS FILE LOADED ===");

// Import Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import CSS
import "../css/style.css";

// Import Models
import { BahanBakuModel } from "./models/BahanBakuModel.js";
import { DailyReportModel } from "./models/DailyReportModel.js";
import { IridesseReportModel } from "./models/IridesseReportModel.js";

// Import Views
import { LoginView } from "./views/LoginView.js";
import { NavigationView } from "./views/NavigationView.js";
import { HeaderView } from "./views/HeaderView.js";
import { BahanBakuView } from "./views/BahanBakuView.js";
import { DailyReportView } from "./views/DailyReportView.js";
import { IridesseReportView } from "./views/IridesseReportView.js";
import { RekapView } from "./views/RekapView.js";

// Import Presenters
import { LoginPresenter } from "./presenters/LoginPresenter.js";
import { NavigationPresenter } from "./presenters/NavigationPresenter.js";
import { HeaderPresenter } from "./presenters/HeaderPresenter.js";
import { BahanBakuPresenter } from "./presenters/BahanBakuPresenter.js";
import { DailyReportPresenter } from "./presenters/DailyReportPresenter.js";
import { IridesseReportPresenter } from "./presenters/IridesseReportPresenter.js";
import { RekapPresenter } from "./presenters/RekapPresenter.js";

// Import Database
import * as db from "./db.js";

class App {
  constructor() {
    console.log("App constructor - initialization will happen in init()");
  }

  async initDatabase() {
    try {
      await db.openDB();
      console.log("Database connection established");
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  bindEvents() {
    console.log("App: Setting up event listeners");
    document.addEventListener("loginSuccess", () => {
      console.log("App: loginSuccess event received, redirecting to dashboard");
      console.log(
        "App: navigationPresenter exists:",
        !!this.navigationPresenter
      );
      try {
        this.navigationPresenter.showPage("dashboard");
        this.navigationPresenter.showDefaultSection();
        console.log("App: Dashboard redirect completed");
      } catch (error) {
        console.error("App: Error during dashboard redirect:", error);
      }
    });

    document.addEventListener("logout", () => {
      this.navigationPresenter.showPage("login");
    });

    // Online/Offline handling
    window.addEventListener("online", () => {
      console.log("Back online");
      db.processSyncQueue();
    });

    window.addEventListener("offline", () => {
      console.log("Gone offline");
    });
  }

  async init() {
    try {
      console.log("App init method called");

      // Initialize Database first
      await db.openDB();
      console.log("Database initialized successfully");

      // Initialize Models
      try {
        this.bahanBakuModel = new BahanBakuModel();
      } catch (error) {
        console.error("BahanBakuModel creation error:", error);
        return;
      }
      this.dailyReportModel = new DailyReportModel();
      this.iridesseReportModel = new IridesseReportModel();

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
      this.rekapView = new RekapView();

      // Initialize Presenters
      console.log("Creating LoginPresenter...");
      this.loginPresenter = new LoginPresenter(this.loginView);
      console.log(" LoginPresenter created");

      console.log("Creating NavigationPresenter...");
      this.navigationPresenter = new NavigationPresenter(this.navigationView);
      console.log(" NavigationPresenter created");

      console.log("Creating HeaderPresenter...");
      this.headerPresenter = new HeaderPresenter(
        this.headerView,
        this.navigationView
      );
      console.log(" HeaderPresenter created");

      try {
        this.bahanBakuPresenter = new BahanBakuPresenter(
          this.bahanBakuModel,
          this.bahanBakuView
        );
      } catch (error) {
        console.error("BahanBakuPresenter creation error:", error);
        return;
      }

      console.log("Creating DailyReportPresenter...");
      this.dailyReportPresenter = new DailyReportPresenter(
        this.dailyReportModel,
        this.dailyReportView
      );
      console.log(" DailyReportPresenter created");

      console.log("Creating IridesseReportPresenter...");
      this.iridesseReportPresenter = new IridesseReportPresenter(
        this.iridesseReportModel,
        this.iridesseReportView
      );
      console.log(" IridesseReportPresenter created");

      console.log("Creating RekapPresenter...");
      this.rekapPresenter = new RekapPresenter(
        this.bahanBakuModel,
        this.dailyReportModel,
        this.iridesseReportModel,
        this.rekapView
      );
      console.log(" RekapPresenter created");

      // Bind event listeners
      console.log("App: About to bind events");
      this.bindEvents();
      console.log("App: Events bound successfully");
    } catch (error) {
      console.error("Error initializing app:", error);
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("=== DOM CONTENT LOADED ===");
  try {
    console.log("Creating app instance...");
    const app = new App();
    console.log("App instance created, calling init...");
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
      .then((registration) => {
        console.log("ServiceWorker registration successful");
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}
