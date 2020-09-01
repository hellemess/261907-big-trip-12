import InfoView from '../view/info';
import ListView from '../view/list';
import CostView from '../view/cost';
import {RenderPosition, render, replace} from '../utils/render';
import DayView from '../view/day';
import EventView from '../view/event';
import EventEditView from '../view/event-edit';
import NoEventsView from '../view/no-events';
import RouteView from '../view/route';
import SortingView from '../view/sorting';

export default class TripPresenter {
  constructor(header, container) {
    this._header = header;
    this._container = container;
    this._info = new InfoView();
    this._daysList = new ListView(`trip-days`);
  }

  _renderCost() {
    render(this._info, new CostView(this._trip.events), RenderPosition.BEFOREEND);
  }

  _renderDay(day) {
    const tripDay = new DayView(day);
    const eventsList = new ListView(`trip-events__list`);

    render(this._daysList, tripDay, RenderPosition.BEFOREEND);
    render(tripDay, eventsList, RenderPosition.BEFOREEND);
    this._trip.days[day].forEach((tripEvent) => this._renderEvent(tripEvent, eventsList));
  }

  _renderEvent(tripEvent, container) {
    const eventItem = new EventView(tripEvent);
    const eventEdit = new EventEditView(tripEvent);

    const switchEventToForm = () => {
      replace(eventEdit, eventItem);
    };

    const switchFormToEvent = () => {
      replace(eventItem, eventEdit);
    };

    const closeForm = (evt) => {
      evt.preventDefault();
      switchFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KeyCodes.ESC) {
        closeForm(evt);
      }
    };

    eventItem.openClickHandler = () => {
      switchEventToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    eventEdit.closeClickHandler = closeForm;
    eventEdit.formSubmitHandler = closeForm;
    render(container, eventItem, RenderPosition.BEFOREEND);
  }

  _renderList() {
    this._renderSorting();
    render(this._container, this._daysList, RenderPosition.BEFOREEND);
    Object.keys(this._trip.days).forEach((day) => this._renderDay(day));
  }

  _renderNoEvents() {
    render(this._container, new NoEventsView(), RenderPosition.BEFOREEND);
  }

  _renderRoute() {
    render(this._info, new RouteView(this._trip.events), RenderPosition.AFTERBEGIN);
  }

  _renderSorting() {
    render(this._container, new SortingView(), RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._trip.events.length === 0) {
      this._renderNoEvents();
    } else {
      this._renderRoute();
      this._renderList();
    }
  }

  init(trip) {
    this._trip = Object.assign({}, trip);
    render(this._header, this._info, RenderPosition.AFTERBEGIN);
    this._renderCost();
    this._renderTrip();
  }
}