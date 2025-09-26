export class HeaderPresenter {
  constructor(view, navigationView) {
    this.view = view;
    this.navigationView = navigationView;

    // Bind menu toggle to sidebar
    this.view.bindMenuToggle(() => {
      this.toggleSidebar();
    });
  }

  setTitle(title) {
    this.view.setTitle(title);
  }

  updateSyncStatus(status) {
    this.view.updateSyncStatus(status);
  }

  toggleSidebar() {
    if (this.navigationView) {
      this.navigationView.toggleSidebar();
    }
  }
}
