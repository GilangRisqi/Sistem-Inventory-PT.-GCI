export class NavigationView {
  constructor() {
    this.pages = {
      login: document.getElementById("login-page"),
      dashboard: document.getElementById("dashboard-page"),
    };

    this.sections = {
      "stock-banner": document.getElementById("stock-banner-section"),
      "stock-digital": document.getElementById("stock-digital-section"),
      "stock-produksi": document.getElementById("stock-produksi-section"),
      "in-banner": document.getElementById("in-banner-section"),
      "out-banner": document.getElementById("out-banner-section"),
      "in-digital": document.getElementById("in-digital-section"),
      "out-digital": document.getElementById("out-digital-section"),
      "in-produksi": document.getElementById("in-produksi-section"),
      "out-produksi": document.getElementById("out-produksi-section"),
      "daily-report": document.getElementById("daily-report-section"),
      rekap: document.getElementById("rekap-section"),
    };

    this.sidebar = document.querySelector(".sidebar");
    this.logoutBtn = document.getElementById("logout-btn");
  }

  bindNavigation(handler) {
    // Handle submenu toggles
    document.querySelectorAll(".menu-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const menuItem = e.currentTarget.parentElement;
        menuItem.classList.toggle("active");
      });
    });

    // Handle navigation for pages
    document.querySelectorAll(".main-nav a[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.currentTarget.dataset.page;
        if (page) {
          // Only handle if it's a page link
          handler(page);
        }
      });
    });
  }

  bindLogout(handler) {
    this.logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.toggle("active");
    }
  }

  showPage(pageId) {
    Object.values(this.pages).forEach((page) =>
      page.classList.remove("active")
    );
    this.pages[pageId].classList.add("active");
  }

  showSection(sectionId) {
    // Hide all sections first
    Object.values(this.sections).forEach((section) => {
      if (section) section.style.display = "none";
    });

    // Show the requested section if it exists
    const section = this.sections[sectionId];
    if (section) {
      section.style.display = "block";
    } else {
      console.warn(`Section ${sectionId} not found`);
    }
  }
}
