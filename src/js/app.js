// Import CSS
import "../css/style.css";

// Import Models
import { BahanBakuModel } from "./models/BahanBakuModel.js";
import { DailyReportModel } from "./models/DailyReportModel.js";

// Import Views
import { LoginView } from "./views/LoginView.js";
import { NavigationView } from "./views/NavigationView.js";
import { HeaderView } from "./views/HeaderView.js";
import { BahanBakuView } from "./views/BahanBakuView.js";
import { DailyReportView } from "./views/DailyReportView.js";
import { RekapView } from "./views/RekapView.js";

// Import Presenters
import { LoginPresenter } from "./presenters/LoginPresenter.js";
import { NavigationPresenter } from "./presenters/NavigationPresenter.js";
import { HeaderPresenter } from "./presenters/HeaderPresenter.js";
import { BahanBakuPresenter } from "./presenters/BahanBakuPresenter.js";
import { DailyReportPresenter } from "./presenters/DailyReportPresenter.js";
import { RekapPresenter } from "./presenters/RekapPresenter.js";

// Import Database
import * as db from "./db.js";

class App {
  constructor() {
    // Initialize Models
    this.bahanBakuModel = new BahanBakuModel();
    this.dailyReportModel = new DailyReportModel();

    // Initialize Views
    this.loginView = new LoginView();
    this.navigationView = new NavigationView();
    this.headerView = new HeaderView();
    this.bahanBakuView = new BahanBakuView();
    this.dailyReportView = new DailyReportView();
    this.rekapView = new RekapView();

    // Initialize Presenters
    this.loginPresenter = new LoginPresenter(this.loginView);
    this.navigationPresenter = new NavigationPresenter(this.navigationView);
    this.headerPresenter = new HeaderPresenter(
      this.headerView,
      this.navigationView
    );
    this.bahanBakuPresenter = new BahanBakuPresenter(
      this.bahanBakuModel,
      this.bahanBakuView
    );
    this.dailyReportPresenter = new DailyReportPresenter(
      this.dailyReportModel,
      this.dailyReportView
    );
    this.rekapPresenter = new RekapPresenter(
      this.bahanBakuModel,
      this.dailyReportModel,
      this.rekapView
    );

    // Bind event listeners
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("loginSuccess", () => {
      this.navigationPresenter.showPage("dashboard");
      this.navigationPresenter.showDefaultSection();
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
      await db.openDB();
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
      alert("Gagal menginisialisasi database");
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
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
