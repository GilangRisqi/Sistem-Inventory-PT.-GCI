export class NavigationPresenter {
  constructor(view) {
    this.view = view;
    this.view.bindNavigation(this.handleNavigation.bind(this));
    this.view.bindLogout(this.handleLogout.bind(this));
  }

  handleNavigation(pageId) {
    this.view.showSection(pageId);
  }

  handleLogout() {
    // Notify the App presenter about logout
    document.dispatchEvent(new CustomEvent("logout"));
  }

  showPage(pageId) {
        this.view.showPage(pageId);
      }

  showDefaultSection() {
        // Show landing page as default section after login
    // Make sure we're on dashboard page first
    this.view.showSection("landing-page");
      }
}
