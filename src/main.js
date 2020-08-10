import {generateEvent} from './mock/event';
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

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const headerElement = document.querySelector('.trip-main');
const controlsElement = headerElement.querySelector(`.trip-controls`);
const contentElement = document.querySelector(`.trip-events`);

const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

render(headerElement, `afterbegin`, getInfoTemplate());

const infoElement = headerElement.querySelector(`.trip-info`);

render(infoElement, `beforeend`, getRouteTemplate());
render(infoElement, `beforeend`, getCostTemplate());
render(controlsElement, `beforeend`, getMenuTemplate());
render(controlsElement, `beforeend`, getFilterTemplate());
render(contentElement, `beforeend`, getSortingTemplate());
render(contentElement, `beforeend`, getEventEditTemplate(events[0]));
render(contentElement, `beforeend`, getListTemplate());

const listElement = contentElement.querySelector(`.trip-days`);

render(listElement, `beforeend`, getDayTemplate());

const dayElement = contentElement.querySelector(`.trip-events__list`);

for (let i = 1; i < EVENTS_COUNT; i++) {
  render(dayElement, `beforeend`, getEventTemplate(events[i]));
}
