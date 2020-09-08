import {generateTrip} from './mock/event';
import {generateFilter} from './mock/filter';
import {RenderPosition, render} from './utils/render';
import HeadingView from './view/heading';
import MenuView from './view/menu';
import FilterView from './view/filter';
import TripPresenter from './presenter/trip';

const EVENTS_COUNT = 23;

const trip = generateTrip(EVENTS_COUNT);
const filter = generateFilter(trip.events);

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-controls`);
const contentElement = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(headerElement, contentElement);

render(controlsElement, new HeadingView(`Switch trip view`), RenderPosition.BEFOREEND);
render(controlsElement, new MenuView(), RenderPosition.BEFOREEND);
render(controlsElement, new HeadingView(`Filter events`), RenderPosition.BEFOREEND);
render(controlsElement, new FilterView(filter), RenderPosition.BEFOREEND);
tripPresenter.init(trip);
