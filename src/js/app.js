// Import Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import CSS
import "../css/style.css";

// Import Supabase Services
import { dbService } from "./services/SupabaseService.js";
import "./services/RealtimeManager.js";
import "./utils/MigrationHelper.js";

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
    // Force remove any PWA install buttons immediately
    this.forceRemovePWAButtons();

    // Register Service Worker for PWA functionality
    this.registerServiceWorker();

    // Initialize PWA features
    this.initPWAFeatures();

    // Setup continuous button removal
    this.setupButtonRemovalObserver();
  }

  forceRemovePWAButtons() {
    // Remove any existing PWA install buttons
    const removeBtns = () => {
      // By ID
      const installBtnById = document.getElementById("pwa-install-btn");
      if (installBtnById) {
        console.log("Removing PWA install button by ID");
        installBtnById.remove();
      }

      // By content
      const allButtons = document.querySelectorAll("button");
      allButtons.forEach((btn) => {
        if (btn.textContent && btn.textContent.includes("Install App")) {
          console.log("Removing PWA install button by content");
          btn.remove();
        }
      });

      // By floating style
      const floatingBtns = document.querySelectorAll(
        'button[style*="position: fixed"], button[style*="position:fixed"]'
      );
      floatingBtns.forEach((btn) => {
        const style = btn.style.cssText || "";
        if (
          style.includes("bottom") &&
          style.includes("right") &&
          btn.textContent.includes("Install")
        ) {
          console.log("Removing floating PWA install button");
          btn.remove();
        }
      });
    };

    // Run immediately and with delays
    removeBtns();
    setTimeout(removeBtns, 100);
    setTimeout(removeBtns, 500);
    setTimeout(removeBtns, 1000);
    setTimeout(removeBtns, 2000);
  }

  setupButtonRemovalObserver() {
    // Prevent PWA install buttons from being added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Element node
            // Check if node itself is a PWA install button
            if (
              node.id === "pwa-install-btn" ||
              (node.textContent && node.textContent.includes("Install App"))
            ) {
              console.log("Preventing PWA install button from appearing");
              node.remove();
            }

            // Check for PWA install buttons inside the node
            if (node.querySelectorAll) {
              const installBtns = node.querySelectorAll(
                '#pwa-install-btn, button[id*="install"]'
              );
              installBtns.forEach((btn) => {
                if (btn.textContent && btn.textContent.includes("Install")) {
                  console.log("Preventing nested PWA install button");
                  btn.remove();
                }
              });
            }
          }
        });
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  async registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("Service Worker registered successfully:", registration);

        // Handle service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New service worker installed - update notification disabled
              console.log("Service worker updated, auto-refreshing...");
              // Optionally auto-refresh after a delay
              // setTimeout(() => window.location.reload(), 2000);
            }
          });
        });

        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data && event.data.type === "CACHE_UPDATED") {
            console.log("Cache updated:", event.data.payload);
          }
        });
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    }
  }

  initPWAFeatures() {
    // Check if app is already installed
    if (this.isPWAInstalled()) {
      console.log("PWA already installed");
      return;
    }

    // Add to Home Screen prompt
    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Store the event for later use
      deferredPrompt = e;

      // Show custom install button with delay (disabled)
      // setTimeout(() => {
      //   this.showInstallButton(deferredPrompt);
      // }, 2000);
    });

    // Handle app installation
    window.addEventListener("appinstalled", (e) => {
      console.log("PWA was installed successfully");
      this.hideInstallButton();
      this.showInstallSuccessMessage();

      // Track installation
      if ("gtag" in window) {
        gtag("event", "pwa_install", {
          event_category: "engagement",
          event_label: "app_install",
        });
      }

      // Store installation status
      localStorage.setItem("pwa-installed", "true");
    });

    // Check for iOS/Safari install prompt
    if (this.isIOSDevice() && !this.isInStandaloneMode()) {
      setTimeout(() => {
        this.showIOSInstallInstructions();
      }, 3000);
    }

    // Handle online/offline status
    window.addEventListener("online", () => {
      this.showNetworkStatus("online");
      this.syncOfflineData();
    });

    window.addEventListener("offline", () => {
      this.showNetworkStatus("offline");
    });

    // Initialize network status
    if (!navigator.onLine) {
      this.showNetworkStatus("offline");
    }
  }

  showInstallButton(deferredPrompt) {
    // PWA Install button completely disabled
    console.log(
      "PWA install prompt available - use browser address bar instead"
    );

    // Force remove any existing buttons
    this.forceRemovePWAButtons();

    // Do NOT create any install button
    return;
  }

  hideInstallButton() {
    const installBtn = document.getElementById("pwa-install-btn");
    if (installBtn) {
      installBtn.remove();
    }
  }

  // PWA Detection Methods
  isPWAInstalled() {
    return (
      localStorage.getItem("pwa-installed") === "true" ||
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  isIOSDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  isInStandaloneMode() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone
    );
  }

  showInstallSuccessMessage() {
    const successAlert = document.createElement("div");
    successAlert.className =
      "alert alert-success alert-dismissible fade show position-fixed";
    successAlert.style.cssText = `
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1070;
      max-width: 400px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    `;
    successAlert.innerHTML = `
      <i class="bi bi-check-circle me-2"></i>
      <strong>App Installed Successfully!</strong>
      <p class="mb-0">GCI Inventory has been added to your home screen.</p>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(successAlert);

    setTimeout(() => {
      if (successAlert.parentNode) {
        successAlert.remove();
      }
    }, 5000);
  }

  showIOSInstallInstructions() {
    if (localStorage.getItem("ios-install-dismissed") === "true") {
      return;
    }

    const iosPrompt = document.createElement("div");
    iosPrompt.className =
      "alert alert-info alert-dismissible fade show position-fixed";
    iosPrompt.style.cssText = `
      bottom: 20px;
      left: 20px;
      right: 20px;
      z-index: 1070;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    iosPrompt.innerHTML = `
      <div class="d-flex align-items-start">
        <i class="bi bi-phone me-3" style="font-size: 1.5rem; color: #0066cc;"></i>
        <div class="flex-grow-1">
          <h6 class="alert-heading mb-2">Install GCI Inventory</h6>
          <p class="mb-2 small">
            Add this app to your home screen for a better experience:
          </p>
          <ol class="mb-3 small">
            <li>Tap the <i class="bi bi-share"></i> Share button below</li>
            <li>Select "Add to Home Screen"</li>
            <li>Tap "Add" to install</li>
          </ol>
          <button type="button" class="btn btn-sm btn-outline-primary me-2" onclick="this.closest('.alert').remove(); localStorage.setItem('ios-install-dismissed', 'true');">
            Maybe Later
          </button>
        </div>
        <button type="button" class="btn-close" onclick="this.closest('.alert').remove(); localStorage.setItem('ios-install-dismissed', 'true');"></button>
      </div>
    `;

    document.body.appendChild(iosPrompt);
  }

  showNetworkStatus(status) {
    // Remove existing status indicator
    const existingStatus = document.getElementById("network-status");
    if (existingStatus) {
      existingStatus.remove();
    }

    // Create new status indicator
    const statusIndicator = document.createElement("div");
    statusIndicator.id = "network-status";
    statusIndicator.className = `alert alert-${
      status === "online" ? "success" : "warning"
    } alert-dismissible fade show position-fixed`;
    statusIndicator.style.cssText = `
      top: 20px;
      left: 20px;
      z-index: 1060;
      max-width: 300px;
    `;

    const icon = status === "online" ? "wifi" : "wifi-off";
    const message = status === "online" ? "Back online!" : "You are offline";

    statusIndicator.innerHTML = `
      <i class="bi bi-${icon}"></i>
      <strong>${message}</strong>
      ${
        status === "offline"
          ? '<p class="mb-0 small">Some features may not be available.</p>'
          : ""
      }
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(statusIndicator);

    // Auto-dismiss online status after 3 seconds
    if (status === "online") {
      setTimeout(() => {
        if (statusIndicator.parentNode) {
          statusIndicator.remove();
        }
      }, 3000);
    }
  }

  async syncOfflineData() {
    // Sync any offline data when coming back online
    try {
      if (
        "serviceWorker" in navigator &&
        "sync" in window.ServiceWorkerRegistration.prototype
      ) {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register("background-sync");
        console.log("Background sync registered");
      }
    } catch (error) {
      console.error("Background sync failed:", error);
    }
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

    // Header/Menu functionality
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });
    }

    // User info functionality
    const showUserInfo = (username) => {
      const userInfo = document.getElementById("user-info");
      const currentUser = document.getElementById("current-user");
      if (userInfo && currentUser) {
        currentUser.textContent = username;
        userInfo.style.display = "flex";
      }
    };

    const hideUserInfo = () => {
      const userInfo = document.getElementById("user-info");
      if (userInfo) {
        userInfo.style.display = "none";
      }
    };

    // Listen for login events
    document.addEventListener("userLoggedIn", (event) => {
      showUserInfo(event.detail.username);
    });

    document.addEventListener("userLoggedOut", () => {
      hideUserInfo();
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

// Make services globally accessible for debugging and migration
window.dbService = dbService;
window.BahanBakuModel = BahanBakuModel;
window.DailyReportModel = DailyReportModel;
window.IridesseReportModel = IridesseReportModel;

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {})
      .catch((err) => {});
  });
}
