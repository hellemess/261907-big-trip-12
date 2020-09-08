import AbstractView from './abstract';

export default class ListView extends AbstractView {
  constructor(className) {
    super();
    this._className = className;
  }

  get template() {
    return `<ul class="${this._className}"></ul>`;
  }
}
