// SweetAlert2 Utility for Professional Alerts
import Swal from "sweetalert2";

class SweetAlertUtil {
  constructor() {
    this.defaultConfig = {
      width: "400px",
      padding: "2rem",
      background: "#fff",
      backdrop: "rgba(0,0,0,0.4)",
      allowOutsideClick: false,
      allowEscapeKey: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      customClass: {
        popup: "swal-custom-popup",
        title: "swal-custom-title",
        content: "swal-custom-content",
        confirmButton: "swal-custom-confirm",
        cancelButton: "swal-custom-cancel",
      },
    };

    // Inject custom CSS
    this.injectCustomCSS();

    // 🔧 Override global SweetAlert2 defaults agar success icon jadi custom
    Swal.mixin({
      customClass: {
        icon: "swal2-no-default-icon",
      },
      iconHtml: `
        <div class="custom-success-icon">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="11" fill="#10b981" />
            <path d="M7 13l3 3 7-7" />
          </svg>
        </div>
      `,
    });
  }

  injectCustomCSS() {
    const style = document.createElement("style");
    style.textContent = `
      /* ==== SweetAlert2 Custom Styling ==== */
      .swal-custom-popup {
        border-radius: 12px !important;
        box-shadow: 0 20px 60px rgba(0,0,0,0.12) !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }

      .swal-custom-title {
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        color: #2d3748 !important;
        margin-bottom: 1rem !important;
      }

      .swal-custom-content {
        font-size: 1rem !important;
        color: #4a5568 !important;
        line-height: 1.6 !important;
        margin-bottom: 1.5rem !important;
      }

      .swal-custom-confirm {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 12px 24px !important;
        font-weight: 500 !important;
        font-size: 0.95rem !important;
        transition: all 0.2s ease !important;
        min-width: 100px !important;
      }

      .swal-custom-confirm:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
      }

      .swal-custom-cancel {
        background: #e2e8f0 !important;
        color: #4a5568 !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 12px 24px !important;
        font-weight: 500 !important;
        font-size: 0.95rem !important;
        transition: all 0.2s ease !important;
        min-width: 100px !important;
        margin-right: 12px !important;
      }

      .swal-custom-cancel:hover {
        background: #cbd5e0 !important;
        transform: translateY(-1px) !important;
      }

      /* === Custom Success Icon === */
      .swal2-no-default-icon .swal2-icon {
        display: none !important;
      }

      .custom-success-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px auto 25px;
      }
    `;
    document.head.appendChild(style);
  }

  // ===================== Alert Methods =====================
  success(message, title = "Berhasil!") {
    return Swal.fire({
      ...this.defaultConfig,
      icon: "success",
      title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

  error(message, title = "Terjadi Kesalahan!") {
    return Swal.fire({
      ...this.defaultConfig,
      icon: "error",
      title,
      text: message,
      confirmButtonText: "Tutup",
    });
  }

  warning(message, title = "Perhatian!") {
    return Swal.fire({
      ...this.defaultConfig,
      icon: "warning",
      title,
      text: message,
      confirmButtonText: "Mengerti",
    });
  }

  info(message, title = "Informasi") {
    return Swal.fire({
      ...this.defaultConfig,
      icon: "info",
      title,
      text: message,
      confirmButtonText: "OK",
    });
  }

  confirm(message, title = "Konfirmasi", options = {}) {
    const defaultOptions = {
      confirmButtonText: "Ya, Lanjutkan",
      cancelButtonText: "Batal",
      showCancelButton: true,
      reverseButtons: true,
    };

    return Swal.fire({
      ...this.defaultConfig,
      icon: "question",
      title,
      text: message,
      ...defaultOptions,
      ...options,
    });
  }

  loading(message = "Memproses...", title = "Mohon Tunggu") {
    return Swal.fire({
      ...this.defaultConfig,
      title,
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });
  }

  close() {
    Swal.close();
  }

  toast(message, type = "success", duration = 3000) {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: duration,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  }

  custom(options) {
    return Swal.fire({
      ...this.defaultConfig,
      ...options,
    });
  }

  pdfSuccess(filename) {
    return Swal.fire({
      ...this.defaultConfig,
      icon: "success",
      title: "PDF Berhasil Dibuat!",
      html: `
        <div style="text-align: center;">
          <p style="margin-bottom: 1rem;">File PDF telah berhasil dibuat:</p>
          <p style="font-weight: 600; color: #4f46e5; background: #f0f9ff; padding: 8px 16px; border-radius: 6px; display: inline-block;">
            📄 ${filename}
          </p>
          <p style="margin-top: 1rem; font-size: 0.9rem; color: #6b7280;">
            File akan otomatis terdownload ke folder Downloads Anda
          </p>
        </div>
      `,
      confirmButtonText: "OK",
      timer: 5000,
      timerProgressBar: true,
    });
  }

  dataSuccess(operation, details = null) {
    let message = "";
    switch (operation) {
      case "save":
        message = "Data berhasil disimpan!";
        break;
      case "update":
        message = "Data berhasil diperbarui!";
        break;
      case "delete":
        message = "Data berhasil dihapus!";
        break;
      case "import":
        message = "Data berhasil diimport!";
        break;
      default:
        message = "Operasi berhasil!";
    }

    let html = `<p>${message}</p>`;
    if (details) {
      html += `<p style="font-size: 0.9rem; color: #6b7280; margin-top: 0.5rem;">${details}</p>`;
    }

    return Swal.fire({
      ...this.defaultConfig,
      icon: "success",
      title: "Berhasil!",
      html,
      timer: 2500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
}

// Export sebagai singleton
export const sweetAlert = new SweetAlertUtil();
export default sweetAlert;
