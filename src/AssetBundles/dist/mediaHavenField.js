class MediaHavenField {
  constructor(settings) {
    this.name = settings.name;
    this.id = settings.id;
    this.modal = this.initModal();

    this.bindEventListeners();
  }

  initModal() {
    const element = document.querySelector(`#${this.id} .js-mediahaven-modal`);

    return new Garnish.Modal(element, {
      autoShow: false,
    });
  }

  bindEventListeners() {
    document
      .querySelector(`#${this.id} .js-add-mediahaven-asset`)
      .addEventListener('click', this.onAddClick.bind(this));
  }

  onAddClick() {
    this.modal.show();
  }
}
