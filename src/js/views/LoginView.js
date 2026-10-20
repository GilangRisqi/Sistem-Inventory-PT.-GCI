export class LoginView {
  constructor() {
    this.form = document.getElementById("login-form");
    this.loginPage = document.getElementById("login-page");
    this.dashboardPage = document.getElementById("dashboard-page");

    if (this.form) {
      this.initializeEventListeners();
      this.initializePasswordToggle();
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

        // Import and call logout
        import("../presenters/LoginPresenter.js").then((module) => {
          module.LoginPresenter.logout();
          this.showLogin();
        });
      });
    }
  }

  initializePasswordToggle() {
    const passwordInput = document.getElementById("password");
    const toggleBtn = document.getElementById("password-toggle");
    const toggleIcon = document.getElementById("password-toggle-icon");

    if (passwordInput && toggleBtn && toggleIcon) {
      toggleBtn.addEventListener("click", () => {
        // Toggle password visibility
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          toggleIcon.className = "bi bi-eye-slash";
          toggleBtn.setAttribute("aria-label", "Hide password");
        } else {
          passwordInput.type = "password";
          toggleIcon.className = "bi bi-eye";
          toggleBtn.setAttribute("aria-label", "Show password");
        }
      });

      // Prevent form submission when clicking toggle button
      toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
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
    this.clearError();
  }

  showError(message) {
    // Remove any existing error message
    this.clearError();

    // Create error message element
    const errorDiv = document.createElement("div");
    errorDiv.className = "login-error mt-2";
    errorDiv.id = "login-error";

    // Create icon and message structure
    errorDiv.innerHTML = `
      <i class="bi bi-exclamation-triangle-fill"></i>
      <span class="error-message">${message}</span>
    `;

    // Insert error message after the form
    this.form.parentNode.insertBefore(errorDiv, this.form.nextSibling);
  }
  clearError() {
    const existingError = document.getElementById("login-error");
    const existingSuccess = document.getElementById("login-success");

    if (existingError) {
      existingError.remove();
    }
    if (existingSuccess) {
      existingSuccess.remove();
    }
  }

  showSuccess(message) {
    // Remove any existing messages
    this.clearError();

    // Create success message element
    const successDiv = document.createElement("div");
    successDiv.className = "login-success mt-2";
    successDiv.id = "login-success";

    // Create icon and message structure
    successDiv.innerHTML = `
      <i class="bi bi-check-circle-fill"></i>
      <span class="success-message">${message}</span>
    `;

    // Insert success message after the form
    this.form.parentNode.insertBefore(successDiv, this.form.nextSibling);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.remove();
      }
    }, 3000);
  }
}
