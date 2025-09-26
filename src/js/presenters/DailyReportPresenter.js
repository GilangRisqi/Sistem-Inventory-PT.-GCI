export class DailyReportPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindSubmit(this.handleSubmit.bind(this));
  }

  async handleSubmit(formData) {
    try {
      await this.model.add(formData);
      this.view.reset();
      this.view.showSuccess("Daily report berhasil disimpan!");
    } catch (error) {
      this.view.showError(error.message);
    }
  }
}
