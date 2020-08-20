import {createElement} from '../utils';

const getCostTemplate = (events) => {
  let cost = 0;

  for (let tripEvent of events) {
    cost += tripEvent.cost;

    for (let option of tripEvent.options) {
      cost += option.cost;
    }
  }

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class CostView {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return getCostTemplate(this._events);
  }

  removeElement() {
    this._element = null;
  }
}
