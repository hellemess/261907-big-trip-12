import {createElement} from '../utils';

export default class ListView {
  constructor(className) {
    this._className = className;
    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return `<ul class="${this._className}"></ul>`;
  }

  removeElement() {
    this._element = null;
  }
}
