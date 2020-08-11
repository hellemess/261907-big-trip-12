import {generateTrip} from './mock/event';
import {generateFilter} from './mock/filter';
import {getInfoTemplate} from './view/info';
import {getRouteTemplate} from './view/route';
import {getCostTemplate} from './view/cost';
import {getMenuTemplate} from './view/menu';
import {getFilterTemplate} from './view/filter';
import {getSortingTemplate} from './view/sorting';
import {getEventEditTemplate} from './view/event-edit';
import {getListTemplate} from './view/list';
import {getDayTemplate} from './view/day';
import {getEventTemplate} from './view/event';

const EVENTS_COUNT = 23;

const trip = generateTrip(EVENTS_COUNT);
const filter = generateFilter(trip.events);

const headerElement = document.querySelector('.trip-main');
const controlsElement = headerElement.querySelector(`.trip-controls`);
const contentElement = document.querySelector(`.trip-events`);

const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

render(headerElement, `afterbegin`, getInfoTemplate());

const infoElement = headerElement.querySelector(`.trip-info`);

render(infoElement, `beforeend`, getRouteTemplate(trip.events));
render(infoElement, `beforeend`, getCostTemplate(trip.events));
render(controlsElement, `beforeend`, getMenuTemplate());
render(controlsElement, `beforeend`, getFilterTemplate(filter));
render(contentElement, `beforeend`, getSortingTemplate());
render(contentElement, `beforeend`, getEventEditTemplate());
render(contentElement, `beforeend`, getListTemplate());

const listElement = contentElement.querySelector(`.trip-days`);

for (let day in trip.days) {
  render(listElement, `beforeend`, getDayTemplate(day));

  const dayElement = contentElement.querySelector(`.day:last-child .trip-events__list`);

  for (let event of trip.days[day]) {
    render(dayElement, `beforeend`, getEventTemplate(event));
  }
}
