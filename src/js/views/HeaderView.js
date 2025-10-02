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
      <div class="d-flex align-items-center">
        <img src="images/logoheader.png" alt="Logo" style="height:60px; margin-right:10px;">
        <nav class="d-flex align-items-center">
          <button id="menu-toggle" class="btn btn-link" aria-label="Toggle menu">
            <i class="bi bi-list fs-4"></i>
          </button>
          <div id="sync-status" class="sync-status d-flex align-items-center">
            <i class="bi bi-cloud-check fs-5 me-2"></i>
            <span></span>
          </div>
        </nav>
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
