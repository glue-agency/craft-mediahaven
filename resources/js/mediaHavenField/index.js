import render from './render';

class MediaHavenField {
  constructor(settings) {
    this.name = settings.name;
    this.id = settings.id;
    this.modal = this.initModal();
    this.initialized = false;

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
    this.openModal();
  }

  openModal() {
    this.modal.show();

    if (this.initialized) {
      return;
    }

    render(document.querySelector(`.js-mediahaven-app-${this.id}`));
    this.initialized = true;
  }
}

export default MediaHavenField;
