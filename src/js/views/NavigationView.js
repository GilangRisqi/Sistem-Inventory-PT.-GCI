export class NavigationView {
  constructor() {
    this.pages = {
      login: document.getElementById("login-page"),
      dashboard: document.getElementById("dashboard-page"),
    };

    this.sections = {
      "landing-page": document.getElementById("landing-page-section"),
      "stock-banner": document.getElementById("stock-banner-section-in"), // Default to In section
      "stock-banner-in": document.getElementById("stock-banner-section-in"),
      "stock-banner-out": document.getElementById("stock-banner-section-out"),
      "stock-digital": document.getElementById("stock-digital-section"),
      "stock-produksi": document.getElementById("stock-produksi-section"),
      "in-banner": document.getElementById("in-banner-section"),
      "out-banner": document.getElementById("out-banner-section"),
      "in-digital": document.getElementById("in-digital-section"),
      "out-digital": document.getElementById("out-digital-section"),
      "in-produksi": document.getElementById("in-produksi-section"),
      "out-produksi": document.getElementById("out-produksi-section"),
      "daily-report": document.getElementById("daily-report-section"),
      "iridesse-report": document.getElementById("iridesse-report-section"),
      rekap: document.getElementById("rekap-section"),
    };

    this.sidebar = document.querySelector(".sidebar");
    this.logoutBtn = document.getElementById("logout-btn");

    this.bindEvents();
    this.setupSubmenuToggle();
    this.setupMobileOverlay();
    this.currentPage = null;
  }

  bindNavigation(handler) {
    // Method untuk binding navigation handler dari presenter
    this.navigationHandler = handler;
  }

  bindLogout(handler) {
    // Method untuk binding logout handler dari presenter
    this.logoutHandler = handler;

    // Bind logout button if exists
    if (this.logoutBtn) {
      this.logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.logoutHandler) {
          this.logoutHandler();
        }
      });
    }
  }

  bindEvents() {
    // Handle navigation links for pages
    document.querySelectorAll("a[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;
        if (page) {
          this.showPage(page);
          this.updateActiveState(e.target);
          // Auto-close sidebar on mobile after menu click
          this.closeSidebarOnMobile();
        }
      });
    });

    // Handle navigation links for sections
    document.querySelectorAll("a[data-section]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const section = e.target.dataset.section;
        if (section) {
          this.showSection(section);
          this.updateActiveState(e.target);
          // Call navigation handler if available
          if (this.navigationHandler) {
            this.navigationHandler(section);
          }
          // Auto-close sidebar on mobile after menu click
          this.closeSidebarOnMobile();
        }
      });
    });

    // Handle all submenu links (they use data-page attribute)
    document.querySelectorAll(".submenu a[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        // Auto-close sidebar on mobile after submenu click
        this.closeSidebarOnMobile();
      });
    });

    // Handle regular menu links that don't have data attributes
    document
      .querySelectorAll(
        ".main-nav a:not([data-page]):not([data-section]):not(.menu-toggle)"
      )
      .forEach((link) => {
        link.addEventListener("click", (e) => {
          // Auto-close sidebar on mobile for regular menu clicks
          this.closeSidebarOnMobile();
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
    // Check if this is actually a section, not a page
    if (this.sections[pageId]) {
      this.showSection(pageId);
      return;
    }

    // Hide all pages first
    Object.values(this.pages).forEach((page) => {
      if (page) {
        page.classList.remove("active");
        page.style.display = "none";
      }
    });

    // Show the selected page
    const page = this.pages[pageId];

    if (page) {
      page.classList.add("active");
      page.style.display = "block";
      this.currentPage = pageId;
    } else {
      console.warn("NavigationView: Page not found for pageId:", pageId);
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

    // Special handling for stock-banner to show both In and Out sections
    if (sectionId === "stock-banner") {
      const bannerInSection = this.sections["stock-banner-in"];
      const bannerOutSection = this.sections["stock-banner-out"];

      if (bannerInSection) bannerInSection.style.display = "block";
      if (bannerOutSection) bannerOutSection.style.display = "block";

      // Dispatch events for both sections to load data
      document.dispatchEvent(
        new CustomEvent("section-activated", {
          detail: { sectionId: "stock-banner-in" },
        })
      );
      document.dispatchEvent(
        new CustomEvent("section-activated", {
          detail: { sectionId: "stock-banner-out" },
        })
      );
    } else {
      const section = this.sections[sectionId];

      if (section) {
        section.style.display = "block";

        // Dispatch section activation event
        document.dispatchEvent(
          new CustomEvent("section-activated", {
            detail: { sectionId },
          })
        );
      } else {
        console.warn(
          "NavigationView: Section not found for sectionId:",
          sectionId
        );
      }
    }

    // Dispatch navigation changed event for all cases
    document.dispatchEvent(
      new CustomEvent("navigation-changed", {
        detail: { sectionId },
      })
    );

    // Trigger auto numbering untuk form In/Out setelah section ditampilkan
    setTimeout(() => {
      const formSections = [
        "in-banner",
        "out-banner",
        "in-digital",
        "out-digital",
        "in-produksi",
        "out-produksi",
      ];

      if (formSections.includes(sectionId)) {
        console.log(
          `📋 Triggering auto number update for section: ${sectionId}`
        );
        document.dispatchEvent(
          new CustomEvent("update-auto-numbers", {
            detail: { sectionId },
          })
        );
      }
    }, 300);
  }

  showLandingPage() {
    // Show landing page as default after login
    this.showSection("landing-page");
  }

  closeSidebarOnMobile() {
    // Check if we're on mobile (screen width <= 768px)
    if (window.innerWidth <= 768) {
      if (this.sidebar) {
        this.sidebar.classList.remove("active");
      }
    }
  }

  setupMobileOverlay() {
    // Add event listener to main content area to close sidebar on mobile
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
      mainContent.addEventListener("click", (e) => {
        // Only close sidebar on mobile and if sidebar is currently active
        if (
          window.innerWidth <= 768 &&
          this.sidebar &&
          this.sidebar.classList.contains("active")
        ) {
          this.closeSidebarOnMobile();
        }
      });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      // Only on mobile devices
      if (window.innerWidth <= 768) {
        // If sidebar is active and click is outside sidebar and not on menu toggle button
        if (this.sidebar && this.sidebar.classList.contains("active")) {
          const menuToggleBtn = document.getElementById("menu-toggle");
          if (
            !this.sidebar.contains(e.target) &&
            e.target !== menuToggleBtn &&
            !menuToggleBtn.contains(e.target)
          ) {
            this.closeSidebarOnMobile();
          }
        }
      }
    });
  }
}
