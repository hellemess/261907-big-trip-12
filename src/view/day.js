import AbstractView from './abstract';

const getDayTemplate = (day) => {
  if (!day) {
    return `<li class="trip-days__item  day">
        <div class="day__info"></div>
      </li>`;
  }

  const [, month, date, year] = day.split(` `);
  const datetime = new Date(day).toISOString();

  return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${date}</span>
        <time class="day__date" datetime="${datetime}">${month.toUpperCase()} ${year.slice(2)}</time>
      </div>
    </li>`;
};

export default class DayView extends AbstractView {
  constructor(day) {
    super();
    this._day = day;
  }

  get template() {
    return getDayTemplate(this._day);
  }
}
