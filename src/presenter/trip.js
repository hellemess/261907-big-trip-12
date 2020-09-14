import InfoView from '../view/info';
import ListView from '../view/list';
import CostView from '../view/cost';
import {RenderPosition, render, replace} from '../utils/render';
import DayView from '../view/day';
import EventView from '../view/event';
import EventEditView from '../view/event-edit';
import {KeyCodes} from '../utils/common';
import NoEventsView from '../view/no-events';
import RouteView from '../view/route';
import SortingView from '../view/sorting';
import {SortTypes} from '../const';
import {sortPrice, sortTime} from '../utils/trip';

export default class TripPresenter {
  constructor(header, container) {
    this._header = header;
    this._container = container;
    this._info = new InfoView();
    this._sorting = new SortingView();
    this._daysList = new ListView(`trip-days`);
    this._currentSortType = SortTypes.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  _clearList() {
    this._container.innerHTML = ``;
    this._daysList.element.innerHTML = ``;
  }

  _handleSortTypeChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._sortEvents(sortType);
  }

  _renderCost() {
    render(this._info, new CostView(this._trip.events), RenderPosition.BEFOREEND);
  }

  _renderDay(events, day) {
    const tripDay = new DayView(day);
    const eventsList = new ListView(`trip-events__list`);

    render(this._daysList, tripDay, RenderPosition.BEFOREEND);
    render(tripDay, eventsList, RenderPosition.BEFOREEND);
    events.forEach((tripEvent) => this._renderEvent(tripEvent, eventsList));
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

    if (this._currentSortType === SortTypes.DEFAULT) {
      Object.keys(this._trip.days).forEach((day) => this._renderDay(this._trip.days[day], day));
    } else {
      this._renderDay(this._trip.events);
    }
  }

  _renderNoEvents() {
    render(this._container, new NoEventsView(), RenderPosition.BEFOREEND);
  }

  _renderRoute() {
    render(this._info, new RouteView(this._trip.events), RenderPosition.AFTERBEGIN);
  }

  _renderSorting() {
    render(this._container, this._sorting, RenderPosition.BEFOREEND);
    this._sorting.sortTypeChangeHandler = this._handleSortTypeChange;
  }

  _renderTrip() {
    if (this._trip.events.length === 0) {
      this._renderNoEvents();
    } else {
      this._renderRoute();
      this._renderList();
    }
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortTypes.PRICE:
        this._trip.events.sort(sortPrice);
        break;
      case SortTypes.TIME:
        this._trip.events.sort(sortTime);
        break;
      default:
        this._trip.events = this._originalEvents;
    }

    this._currentSortType = sortType;
    this._clearList();
    this._renderList();
  }

  init(trip) {
    this._trip = Object.assign({}, trip);
    this._originalEvents = this._trip.events.slice();
    render(this._header, this._info, RenderPosition.AFTERBEGIN);
    this._renderCost();
    this._renderTrip();
  }
}
