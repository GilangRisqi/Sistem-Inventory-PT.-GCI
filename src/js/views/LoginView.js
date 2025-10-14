export class LoginView {
  constructor() {
    this.form = document.getElementById("login-form");
    this.loginPage = document.getElementById("login-page");
    this.dashboardPage = document.getElementById("dashboard-page");

    if (this.form) {
      this.initializeEventListeners();
    } else {
    }
  }

  bindLogin(handler) {
    // Method untuk binding login handler dari presenter
    this.loginHandler = handler;
  }

  initializeEventListeners() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Call presenter handler if available
        if (this.loginHandler) {
          this.loginHandler({ username, password });
        } else {
          // Fallback: langsung redirect ke dashboard
          this.showDashboard();
        }
      });
    }

    // Handle logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.showLogin();
      });
    }
  }

  showDashboard() {
    this.loginPage.classList.remove("active");
    this.dashboardPage.classList.add("active");

    // Show landing page by default after login
    setTimeout(() => {
      // Remove active class from all sections
      document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.remove("active");
        section.style.display = "none";
      });

      // Show landing page section
      const landingSection = document.getElementById("landing-page-section");
      if (landingSection) {
        landingSection.classList.add("active");
        landingSection.style.display = "block";
      }
    }, 100);
  }

  showLogin() {
    this.dashboardPage.classList.remove("active");
    this.loginPage.classList.add("active");
    this.form.reset();
  }
}
