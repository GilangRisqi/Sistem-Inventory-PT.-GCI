export class LoginView {
  constructor() {
    console.log("LoginView: Constructor called");
    this.form = document.getElementById("login-form");
    this.loginPage = document.getElementById("login-page");
    this.dashboardPage = document.getElementById("dashboard-page");

    console.log("LoginView: Form element:", !!this.form);
    console.log("LoginView: Login page:", !!this.loginPage);
    console.log("LoginView: Dashboard page:", !!this.dashboardPage);

    if (this.form) {
      console.log("LoginView: Initializing event listeners");
      this.initializeEventListeners();
    } else {
      console.log("LoginView: Form not found!");
    }
  }

  bindLogin(handler) {
    console.log("LoginView: bindLogin called with handler:", !!handler);
    // Method untuk binding login handler dari presenter
    this.loginHandler = handler;
    console.log("LoginView: loginHandler set:", !!this.loginHandler);
  }

  initializeEventListeners() {
    console.log("LoginView: Setting up event listeners");
    if (this.form) {
      console.log("LoginView: Form found, adding submit listener");
      this.form.addEventListener("submit", (e) => {
        console.log("LoginView: Form submitted!");
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log("LoginView: Username:", username, "Password:", password);

        // Call presenter handler if available
        if (this.loginHandler) {
          console.log("LoginView: Calling loginHandler");
          this.loginHandler({ username, password });
        } else {
          console.log("LoginView: No loginHandler, using fallback");
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

      console.log("Dashboard shown with landing page as default");
    }, 100);
  }

  showLogin() {
    this.dashboardPage.classList.remove("active");
    this.loginPage.classList.add("active");
    this.form.reset();
  }
}
