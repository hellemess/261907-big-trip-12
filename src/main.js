import {generateTrip} from './mock/event';
import {generateFilter} from './mock/filter';
import {RenderPosition, render} from './utils';
import InfoView from './view/info';
import RouteView from './view/route';
import CostView from './view/cost';
import HiddenHeadingView from './view/hidden-heading';
import MenuView from './view/menu';
import FilterView from './view/filter';
import SortingView from './view/sorting';
import ListView from './view/list';
import DayView from './view/day';
import EventView from './view/event';
import EventEditView from './view/event-edit';


// import {getInfoTemplate} from './view/info';
// import {getRouteTemplate} from './view/route';
// import {getCostTemplate} from './view/cost';
// import {getMenuTemplate} from './view/menu';
// import {getFilterTemplate} from './view/filter';
// import {getSortingTemplate} from './view/sorting';
// import {getEventEditTemplate} from './view/event-edit';
// import {getListTemplate} from './view/list';
// import {getDayTemplate} from './view/day';
// import {getEventTemplate} from './view/event';

const EVENTS_COUNT = 23;

const trip = generateTrip(EVENTS_COUNT);
const filter = generateFilter(trip.events);

const headerElement = document.querySelector('.trip-main');
const controlsElement = headerElement.querySelector(`.trip-controls`);
const contentElement = document.querySelector(`.trip-events`);

const infoElement = new InfoView();
const daysListElement = new ListView(`trip-days`);

const renderEvent = (event, container) => {
  const eventElement = new EventView(event);
  const eventEditElement = new EventEditView(event);

  const switchEventToForm = () => {
    container.replaceChild(eventEditElement.element, eventElement.element);
  }

  const switchFormToEvent = () => {
    container.replaceChild(eventElement.element, eventEditElement.element);
  }

  console.log( eventEditElement.element );

  eventElement.element.querySelector(`.event__rollup-btn`).addEventListener(`click`, switchEventToForm);
  eventEditElement.element.querySelector(`.event__rollup-btn`).addEventListener(`click`, switchFormToEvent);
  eventEditElement.element.addEventListener(`submit`, switchFormToEvent);

  render(RenderPosition.BEFOREEND, container, eventElement.element);
}

render(RenderPosition.AFTERBEGIN, headerElement, infoElement.element);
render(RenderPosition.BEFOREEND, infoElement.element, new RouteView(trip.events).element);
render(RenderPosition.BEFOREEND, infoElement.element, new CostView(trip.events).element);
render(RenderPosition.BEFOREEND, controlsElement, new HiddenHeadingView(`Switch trip view`).element);
render(RenderPosition.BEFOREEND, controlsElement, new MenuView().element);
render(RenderPosition.BEFOREEND, controlsElement, new HiddenHeadingView(`Filter events`).element);
render(RenderPosition.BEFOREEND, controlsElement, new FilterView(filter).element);
render(RenderPosition.BEFOREEND, contentElement, new SortingView().element);
render(RenderPosition.BEFOREEND, contentElement, daysListElement.element);

for (let day in trip.days) {
  const dayElement = new DayView(day);
  const eventsListElement = new ListView(`trip-events__list`);

  render(RenderPosition.BEFOREEND, daysListElement.element, dayElement.element);
  render(RenderPosition.BEFOREEND, dayElement.element, eventsListElement.element);

  for (let event of trip.days[day])
  {
    renderEvent(event, eventsListElement.element);
  }
}
