export class LoginPresenter {
  constructor(view) {
    this.view = view;
    this.view.bindLogin(this.handleLogin.bind(this));

    // Define users with roles
    this.users = {
      admin: { password: "admin123", role: "admin" },
      operator: { password: "operator123", role: "operator" },
    };
  }

  handleLogin(credentials) {
    const { username, password } = credentials;

    // Validate credentials
    const user = this.users[username.toLowerCase()];

    if (user && user.password === password) {
      // Store user info in sessionStorage
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          username: username.toLowerCase(),
          role: user.role,
        })
      );

      console.log(`✅ Login successful: ${username} (${user.role})`);

      // Show success message
      this.view.showSuccess(
        `Selamat datang, ${username}! Login berhasil sebagai ${user.role}.`
      );

      // Delay navigation to show success message
      setTimeout(() => {
        this.onLoginSuccess(user.role);
      }, 1500);
    } else {
      this.view.showError(
        "Username atau password salah! Silakan periksa kembali kredensial Anda."
      );
    }
  }

  onLoginSuccess(role) {
    // Notify the App presenter about successful login with role
    document.dispatchEvent(
      new CustomEvent("loginSuccess", {
        detail: { role },
      })
    );
  }

  // Get current user from session
  static getCurrentUser() {
    const userStr = sessionStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if current user has admin role
  static isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === "admin";
  }

  // Check if current user has operator role
  static isOperator() {
    const user = this.getCurrentUser();
    return user && user.role === "operator";
  }

  // Logout function
  static logout() {
    sessionStorage.removeItem("currentUser");
  }
}
