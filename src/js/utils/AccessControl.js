import { sweetAlert } from "./SweetAlertUtil.js";

export class AccessControl {
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

  // Check if user can edit/delete (only admin)
  static canEdit() {
    return this.isAdmin();
  }

  // Check if user can delete (only admin)
  static canDelete() {
    return this.isAdmin();
  }

  // Hide elements based on user permissions
  static hideElementsForOperator() {
    if (this.isOperator()) {
      // Hide all edit buttons
      const editButtons = document.querySelectorAll(
        ".edit-btn, .btn-warning[data-type]"
      );
      editButtons.forEach((btn) => {
        btn.style.display = "none";
      });

      // Hide all delete buttons
      const deleteButtons = document.querySelectorAll(
        ".delete-btn, .btn-danger[data-type]"
      );
      deleteButtons.forEach((btn) => {
        btn.style.display = "none";
      });

      // Hide save and cancel buttons (these appear during edit mode)
      const saveButtons = document.querySelectorAll(".save-btn");
      const cancelButtons = document.querySelectorAll(".cancel-btn");
      saveButtons.forEach((btn) => (btn.style.display = "none"));
      cancelButtons.forEach((btn) => (btn.style.display = "none"));
    }
  }

  // Apply access control to any table
  static applyTableAccessControl(tableContainer) {
    if (!this.canEdit()) {
      // Hide edit buttons in the table
      const editButtons = tableContainer.querySelectorAll(
        ".edit-btn, .btn-warning[data-type]"
      );
      editButtons.forEach((btn) => {
        btn.style.display = "none";
      });
    }

    if (!this.canDelete()) {
      // Hide delete buttons in the table
      const deleteButtons = tableContainer.querySelectorAll(
        ".delete-btn, .btn-danger[data-type]"
      );
      deleteButtons.forEach((btn) => {
        btn.style.display = "none";
      });
    }
  }

  // Show user info in header
  static updateUserDisplay() {
    const user = this.getCurrentUser();
    if (user) {
      // Find user display elements
      const userDisplays = document.querySelectorAll(
        ".user-display, #user-info"
      );
      userDisplays.forEach((element) => {
        element.textContent = `${user.username} (${user.role.toUpperCase()})`;
      });

      // Add role badge if needed
      const roleBadges = document.querySelectorAll(".role-badge");
      roleBadges.forEach((badge) => {
        badge.textContent = user.role.toUpperCase();
        badge.className = `badge role-badge ${
          user.role === "admin" ? "bg-success" : "bg-primary"
        }`;
      });
    }
  }

  // Initialize access control on page load
  static init() {
    // Update user display
    this.updateUserDisplay();

    // Apply access control to existing elements
    this.hideElementsForOperator();

    // Set up mutation observer to handle dynamically added elements
    if (this.isOperator()) {
      this.observeForNewElements();
    }
  }

  // Observe for new elements and apply access control
  static observeForNewElements() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Apply access control to newly added tables
            if (
              node.classList &&
              (node.classList.contains("table") || node.querySelector(".table"))
            ) {
              setTimeout(() => this.applyTableAccessControl(node), 100);
            }

            // Hide edit/delete buttons in newly added content
            if (node.querySelectorAll) {
              const editButtons = node.querySelectorAll(
                ".edit-btn, .btn-warning[data-type]"
              );
              const deleteButtons = node.querySelectorAll(
                ".delete-btn, .btn-danger[data-type]"
              );

              editButtons.forEach((btn) => (btn.style.display = "none"));
              deleteButtons.forEach((btn) => (btn.style.display = "none"));
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Prevent edit/delete actions for operators
  static preventOperatorActions(event) {
    if (this.isOperator()) {
      const target = event.target.closest(
        ".edit-btn, .delete-btn, .save-btn, .cancel-btn"
      );
      if (target) {
        event.preventDefault();
        event.stopPropagation();
        sweetAlert.warning(
          "Anda tidak memiliki izin untuk melakukan aksi ini.",
          "Akses Ditolak"
        );
        return false;
      }
    }
    return true;
  }
}
