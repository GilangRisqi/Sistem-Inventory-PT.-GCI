export class HeaderView {
  constructor() {
    this.header = document.querySelector(".main-header");
    this.menuToggle = document.getElementById("menu-toggle");
    this.syncStatus = document.getElementById("sync-status");

    // Initialize header if it doesn't exist
    if (!this.header) {
      this.createHeader();
    }
  }

  createHeader() {
    const header = document.createElement("header");
    header.className = "main-header";
    header.innerHTML = `
      <div class="header-content">
        <div class="logo-section">
          <button id="menu-toggle" class="menu-toggle-btn" aria-label="Toggle menu">
            <i class="bi bi-list"></i>
          </button>
          <img src="images/logoheader.png" alt="Logo" class="company-logo">
          <div class="company-info">
            <h1>Sistem Daily Reports PT. GCI</h1>
            <span class="tagline">Gudang Digital Professional</span>
          </div>
        </div>
        <div class="header-actions">
          <div class="user-info">
            <span class="welcome-text">Selamat datang, </span>
            <span id="current-user">-</span>
          </div>
          <div id="sync-status" class="sync-status">
            <i class="bi bi-cloud-check"></i>
            <span>Online</span>
          </div>
        </div>
      </div>
    `;

    // Insert header at the beginning of dashboard page
    const dashboardPage = document.getElementById("dashboard-page");
    if (dashboardPage) {
      dashboardPage.insertBefore(header, dashboardPage.firstChild);
    }

    // Update references
    this.header = header;
    this.menuToggle = header.querySelector("#menu-toggle");
    this.syncStatus = header.querySelector("#sync-status");
  }

  setTitle(title) {
    const h1 = this.header.querySelector("h1");
    if (h1) {
      h1.textContent = title;
    }
  }

  updateSyncStatus(status) {
    if (this.syncStatus) {
      this.syncStatus.textContent = status;
    }
  }

  bindMenuToggle(handler) {
    if (this.menuToggle) {
      this.menuToggle.addEventListener("click", handler);
    }
  }
}
