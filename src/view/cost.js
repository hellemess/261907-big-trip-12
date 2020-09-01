import AbstractView from './abstract';

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

export default class CostView extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  get template() {
    return getCostTemplate(this._events);
  }
}
