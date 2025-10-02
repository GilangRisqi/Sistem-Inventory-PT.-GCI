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

    this.bindEvents();
    this.setupSubmenuToggle();
    this.currentPage = null;
  }

  bindEvents() {
    // Handle navigation links
    document.querySelectorAll("a[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;
        if (page) {
          this.showPage(page);
          this.updateActiveState(e.target);
        }
      });
    });
  }

  setupSubmenuToggle() {
    // Handle submenu toggles
    document.querySelectorAll(".menu-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling

        const menuItem = toggle.closest(".has-submenu");
        if (menuItem) {
          // Close other open submenus
          document.querySelectorAll(".has-submenu").forEach((item) => {
            if (item !== menuItem && item.classList.contains("active")) {
              item.classList.remove("active");
              const submenu = item.querySelector(".submenu");
              if (submenu) submenu.classList.remove("active");
            }
          });

          // Toggle current submenu
          menuItem.classList.toggle("active");
          const submenu = menuItem.querySelector(".submenu");
          if (submenu) {
            submenu.classList.toggle("active");
          }
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
    // Hide all sections first
    document.querySelectorAll(".content-section").forEach((section) => {
      section.style.display = "none";
    });

    // Show the selected section
    const section = document.getElementById(`${pageId}-section`);
    if (section) {
      section.style.display = "block";
      this.currentPage = pageId;
    }
  }

  updateActiveState(clickedLink) {
    // Remove active class from all links
    document.querySelectorAll(".main-nav a").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to clicked link
    clickedLink.classList.add("active");

    // If it's a submenu item, make sure the parent menu is expanded
    const submenu = clickedLink.closest(".submenu");
    if (submenu) {
      const parentMenu = submenu.closest(".has-submenu");
      if (parentMenu) {
        parentMenu.classList.add("active");
        submenu.classList.add("active");
      }
    }
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
