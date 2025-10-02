export class LoginView {
  constructor() {
    this.form = document.getElementById("login-form");
    this.loginPage = document.getElementById("login-page");
    this.dashboardPage = document.getElementById("dashboard-page");

    if (this.form) {
      this.initializeEventListeners();
    }
  }

  initializeEventListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Untuk sementara, kita langsung redirect ke dashboard
      // Nanti bisa ditambahkan validasi username dan password
      this.showDashboard();
    });

    // Handle logout
    document.getElementById("logout-btn").addEventListener("click", (e) => {
      e.preventDefault();
      this.showLogin();
    });
  }

  showDashboard() {
    this.loginPage.classList.remove("active");
    this.dashboardPage.classList.add("active");
  }

  showLogin() {
    this.dashboardPage.classList.remove("active");
    this.loginPage.classList.add("active");
    this.form.reset();
  }
}
