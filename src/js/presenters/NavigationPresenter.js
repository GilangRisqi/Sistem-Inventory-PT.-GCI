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
    this.view.showSection("bahan-baku");
  }
}
