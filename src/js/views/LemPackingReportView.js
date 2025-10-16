class LemPackingReportView {
  constructor() {
    this.form = document.getElementById('lem-packing-report-form');
    this.section = document.getElementById('lem-packing-report-section');
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    if (this.form) {
      // Form submission
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });

      // Real-time total calculation
      const qtyOkInput = document.getElementById('lem-packing-qty-ok');
      const qtyNgInput = document.getElementById('lem-packing-qty-ng');
      
      if (qtyOkInput && qtyNgInput) {
        qtyOkInput.addEventListener('input', () => this.updateTotals());
        qtyNgInput.addEventListener('input', () => this.updateTotals());
      }

      // Auto-generate nomor based on date
      const tanggalInput = document.getElementById('lem-packing-tanggal');
      if (tanggalInput) {
        tanggalInput.addEventListener('change', () => this.autoGenerateNomor());
      }
    }
  }

  // Handle form submission
  handleFormSubmit() {
    const formData = this.getFormData();
    
    if (this.validateForm(formData)) {
      // Dispatch custom event for presenter to handle
      const event = new CustomEvent('lemPackingReportSubmit', {
        detail: formData
      });
      document.dispatchEvent(event);
    }
  }

  // Get form data
  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }

  // Validate form data
  validateForm(data) {
    const requiredFields = [
      { key: 'nomor', label: 'No.' },
      { key: 'tanggal', label: 'Hari/Tanggal' },
      { key: 'operator', label: 'Operator' },
      { key: 'jenisPekerjaan', label: 'Jenis Pekerjaan' },
      { key: 'timeStart', label: 'Time Start' },
      { key: 'timeFinish', label: 'Time Finish' },
      { key: 'qtyOk', label: 'QTY OK' },
      { key: 'qtyNg', label: 'QTY NG' },
      { key: 'noSpk', label: 'No. SPK' }
    ];

    for (let field of requiredFields) {
      if (!data[field.key] && data[field.key] !== '0') {
        this.showToast(`${field.label} harus diisi`, 'error');
        return false;
      }
    }

    // Validate time range
    if (data.timeStart && data.timeFinish) {
      const startTime = new Date(`2000-01-01T${data.timeStart}`);
      const finishTime = new Date(`2000-01-01T${data.timeFinish}`);
      
      if (finishTime <= startTime) {
        this.showToast('Time Finish harus lebih besar dari Time Start', 'error');
        return false;
      }
    }

    // Validate quantities
    const qtyOk = parseInt(data.qtyOk) || 0;
    const qtyNg = parseInt(data.qtyNg) || 0;
    
    if (qtyOk < 0 || qtyNg < 0) {
      this.showToast('QTY tidak boleh negatif', 'error');
      return false;
    }

    return true;
  }

  // Update real-time totals
  updateTotals() {
    const qtyOk = parseInt(document.getElementById('lem-packing-qty-ok').value) || 0;
    const qtyNg = parseInt(document.getElementById('lem-packing-qty-ng').value) || 0;
    const total = qtyOk + qtyNg;

    document.getElementById('lem-packing-total-qty-ok').textContent = qtyOk;
    document.getElementById('lem-packing-total-qty-ng').textContent = qtyNg;
    document.getElementById('lem-packing-total-qty-all').textContent = total;
  }

  // Auto-generate nomor based on selected date
  autoGenerateNomor() {
    const tanggal = document.getElementById('lem-packing-tanggal').value;
    if (!tanggal) return;

    // Dispatch event to get next nomor from presenter
    const event = new CustomEvent('lemPackingReportGetNextNomor', {
      detail: { tanggal }
    });
    document.dispatchEvent(event);
  }

  // Set auto-generated nomor
  setAutoNomor(nomor) {
    const nomorInput = document.getElementById('lem-packing-nomor');
    if (nomorInput && !nomorInput.value) {
      nomorInput.value = nomor;
    }
  }

  // Clear form
  clearForm() {
    this.form.reset();
    this.updateTotals();
  }

  // Populate form for editing
  populateForm(data) {
    Object.keys(data).forEach(key => {
      const input = document.getElementById(`lem-packing-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
      if (input) {
        if (input.type === 'number') {
          input.value = data[key] || 0;
        } else {
          input.value = data[key] || '';
        }
      }
    });
    
    // Update totals after populating
    this.updateTotals();
    
    // Store edit ID for update
    this.editId = data.id;
  }

  // Show toast notification
  showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: opacity 0.3s ease;
    `;
    
    // Set background color based on type
    switch (type) {
      case 'success':
        toast.style.backgroundColor = '#10b981';
        break;
      case 'error':
        toast.style.backgroundColor = '#ef4444';
        break;
      case 'warning':
        toast.style.backgroundColor = '#f59e0b';
        break;
      default:
        toast.style.backgroundColor = '#3b82f6';
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  // Show success message
  showSuccess(message) {
    this.showToast(message, 'success');
  }

  // Show error message
  showError(message) {
    this.showToast(message, 'error');
  }

  // Show/hide section
  show() {
    if (this.section) {
      this.section.style.display = 'block';
    }
  }

  hide() {
    if (this.section) {
      this.section.style.display = 'none';
    }
  }

  // Get current edit ID
  getEditId() {
    return this.editId;
  }

  // Clear edit ID
  clearEditId() {
    this.editId = null;
  }

  // Format date for display
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Format time for display
  formatTime(timeString) {
    return timeString;
  }
}

export { LemPackingReportView };