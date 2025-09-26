export class LoginPresenter {
  constructor(view) {
    this.view = view;
    this.view.bindLogin(this.handleLogin.bind(this));
  }

  handleLogin(credentials) {
    // For demo purposes, any login will succeed
    // In real application, you would validate credentials here
    this.onLoginSuccess();
  }

  onLoginSuccess() {
    // Notify the App presenter about successful login
    document.dispatchEvent(new CustomEvent("loginSuccess"));
  }
}
