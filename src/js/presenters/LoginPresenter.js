export class LoginPresenter {
  constructor(view) {
    console.log("LoginPresenter: Constructor called");
    this.view = view;
    console.log("LoginPresenter: Binding login handler");
    this.view.bindLogin(this.handleLogin.bind(this));
    console.log("LoginPresenter: Login handler bound");
  }

  handleLogin(credentials) {
    console.log("LoginPresenter: handleLogin called with:", credentials);
    // For demo purposes, any login will succeed
    // In real application, you would validate credentials here
    this.onLoginSuccess();
  }

  onLoginSuccess() {
    console.log(
      "LoginPresenter: onLoginSuccess called, dispatching loginSuccess event"
    );
    // Notify the App presenter about successful login
    document.dispatchEvent(new CustomEvent("loginSuccess"));
    console.log("LoginPresenter: loginSuccess event dispatched");
  }
}
