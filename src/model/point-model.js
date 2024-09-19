import Observable from '../framework/observable.js';
import { getMockedPoints } from '../mock/point-mock.js';
import { getMockedDestinations } from '../mock/destination.js';
import { getMockedOffers } from '../mock/offer-mock.js';
import { FilterType, SortTypes, UpdateType } from '../const.js';
import { FilteredTypes } from '../view/utils/filter.js';
import { SortedTypes } from '../view/utils/sort.js';
import { removeComponent } from '../view/utils/common.js';

export default class PointModel extends Observable{
  #tripPoints = [];
  #destinations = [];
  #offers = [];
  #filters = [];
  #defaultFilter = FilterType.EVERYTHING;
  #defaultSortType = SortTypes.DAY;
  #currentFilter = this.#defaultFilter;
  #currentSort = this.#defaultSortType;

  get tripPoints() {
    const filteredTripPoints = this.#getFilteredTripPoints(this.#tripPoints, this.currentFilter);
    return this.#getSortedTripPoints(filteredTripPoints, this.currentSort);
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get filters() {
    return this.#filters;
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  set currentFilter(filter) {
    if (filter === this.#currentFilter) {
      return;
    }
    this.#currentFilter = filter;
    this._notify();
  }

  get currentSort() {
    return this.#currentSort;
  }

  set currentSort(sortType) {
    this.#currentSort = sortType;
  }

  get tripInfo() {
    const tripInfo = this.#getSortedTripPoints(this.#tripPoints, this.#defaultSortType);
    const firstPoint = tripInfo[0];
    const lastPoint = tripInfo[tripInfo.length - 1];
    const middlePoint = tripInfo.slice(1, -1);
    const middleDestination = middlePoint.length === 1 ? this.#getDestinationName(middlePoint[0].destination) : '...';
    return {
      start: this.#getDestinationName(firstPoint.destination),
      middle: middleDestination,
      end: this.#getDestinationName(lastPoint.destination),
      dateFrom: firstPoint.dateFrom,
      dateTo: lastPoint.dateTo,
      cost: tripInfo.reduce((price, tripPoint) => price + tripPoint.price, 0),
    };
  }

  init() {
    this.#destinations = getMockedDestinations();
    this.#offers = getMockedOffers();
    this.#tripPoints = getMockedPoints();
    this.#filters = Object.values(FilterType);
    this._notify(UpdateType.MAJOR);
  }

  setCurrentFilter(updateType, filterType) {
    this.#currentSort = filterType;
    this._notify(updateType, filterType);
  }

  addTripPoint(updateType, tripPoint) {
    this.#tripPoints.push(tripPoint);
    this._notify(updateType, tripPoint);
  }

  updateTripPoint(updateType, tripPoint) {
    const selectedPoint = this.#findTripPoint(tripPoint.id);
    if (!selectedPoint) {
      throw new Error(`Can't update trip event ${tripPoint.id}`);
    }
    Object.assign(selectedPoint, tripPoint);
    this._notify(updateType, tripPoint);
  }

  deleteTripPoint(updateType, tripPoint) {
    const updateTripPoint = this.#findTripPoint(tripPoint.id);
    if (!updateTripPoint) {
      throw new Error(`Can't delete trip event ${tripPoint.id}`);
    }
    this.#tripPoints = removeComponent(this.#tripPoints, updateTripPoint);
    this._notify(updateType);
  }

  #getSortedTripPoints = (tripPoints, sortType) => tripPoints.sort(SortedTypes[sortType]);
  #getFilteredTripPoints = (tripPoints, filter) => tripPoints.filter(FilteredTypes[filter]);
  #getDestinationName = (id) => this.#destinations.find((destination) => destination.id === id).name;
  #findTripPoint = (id) => this.#tripPoints.find((tripPoint) => tripPoint.id === id);
}
