import {createElement} from '../utils';

const getDayTemplate = (day) => {
  const [, month, date, year] = day.split(` `);
  const datetime = new Date(day).toISOString();

  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${date}</span>
      <time class="day__date" datetime="${datetime}">${month.toUpperCase()} ${year.slice(2)}</time>
    </div>
  </li>`;
};

export default class DayView {
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return getDayTemplate(this._day);
  }

  removeElement() {
    this._element = null;
  }
}
