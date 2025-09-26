export class LoginView {
  constructor() {
    this.form = document.getElementById("login-form");
    this.username = document.getElementById("username");
    this.password = document.getElementById("password");
  }

  bindLogin(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler({
        username: this.username.value,
        password: this.password.value,
      });
    });
  }

  reset() {
    this.form.reset();
  }

  showError(message) {
    alert(message);
  }
}
