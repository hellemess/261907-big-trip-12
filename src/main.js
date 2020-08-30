import {generateTrip} from './mock/event';
import {generateFilter} from './mock/filter';
import {KeyCodes, RenderPosition, render} from './utils';
import InfoView from './view/info';
import EventView from './view/event';
import EventEditView from './view/event-edit';
import NoEventsView from './view/no-events';
import ListView from './view/list';
import SortingView from './view/sorting';
import DayView from './view/day';
import RouteView from './view/route';
import CostView from './view/cost';
import HiddenHeadingView from './view/hidden-heading';
import MenuView from './view/menu';
import FilterView from './view/filter';

const EVENTS_COUNT = 23;

const trip = generateTrip(EVENTS_COUNT);
const filter = generateFilter(trip.events);

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-controls`);
const contentElement = document.querySelector(`.trip-events`);

const infoElement = new InfoView();

const renderEvent = (tripEvent, container) => {
  const eventElement = new EventView(tripEvent);
  const eventEditElement = new EventEditView(tripEvent);

  const switchEventToForm = () => {
    container.replaceChild(eventEditElement.element, eventElement.element);
  };

  const switchFormToEvent = () => {
    container.replaceChild(eventElement.element, eventEditElement.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KeyCodes.ESC) {
      closeForm(evt);
    }
  };

  const closeForm = (evt) => {
    evt.preventDefault();
    switchFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  eventElement.element.querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    switchEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditElement.element.querySelector(`.event__rollup-btn`).addEventListener(`click`, closeForm);
  eventEditElement.element.addEventListener(`submit`, closeForm);

  render(RenderPosition.BEFOREEND, container, eventElement.element);
};

const renderList = (tripContent, container) => {
  if (tripContent.events.length === 0) {
    render(RenderPosition.BEFOREEND, container, new NoEventsView().element);
  } else {
    const daysListElement = new ListView(`trip-days`);

    render(RenderPosition.AFTERBEGIN, infoElement.element, new RouteView(tripContent.events).element);
    render(RenderPosition.BEFOREEND, container, new SortingView().element);
    render(RenderPosition.BEFOREEND, container, daysListElement.element);

    for (let day of Object.keys(tripContent.days)) {
      const dayElement = new DayView(day);
      const eventsListElement = new ListView(`trip-events__list`);

      render(RenderPosition.BEFOREEND, daysListElement.element, dayElement.element);
      render(RenderPosition.BEFOREEND, dayElement.element, eventsListElement.element);

      for (let tripEvent of tripContent.days[day]) {
        renderEvent(tripEvent, eventsListElement.element);
      }
    }
  }
};

render(RenderPosition.AFTERBEGIN, headerElement, infoElement.element);
render(RenderPosition.BEFOREEND, infoElement.element, new CostView(trip.events).element);
render(RenderPosition.BEFOREEND, controlsElement, new HiddenHeadingView(`Switch trip view`).element);
render(RenderPosition.BEFOREEND, controlsElement, new MenuView().element);
render(RenderPosition.BEFOREEND, controlsElement, new HiddenHeadingView(`Filter events`).element);
render(RenderPosition.BEFOREEND, controlsElement, new FilterView(filter).element);
renderList(trip, contentElement);
