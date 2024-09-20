import { Filters, DEFAULT_FILTER, DEFAULT_SORT_TYPE, UpdateType } from '../const/common.js';
import { BASE_URL, AUTHORIZATION } from '../const/api.js';
import { FilterFunctions } from '../utils/filter.js';
import { SortFunctions } from '../utils/sort.js';
import TripApiService from '../trip-api-service.js';
import Observable from '../framework/observable.js';
import { removeItem } from '../utils/common.js';

export default class PointModel extends Observable {
  #destinations = [];
  #offers = [];
  #trip = [];
  #filters = [];
  #currentFilter = DEFAULT_FILTER;
  #currentSort = DEFAULT_SORT_TYPE;
  #tripApiService = new TripApiService(BASE_URL, AUTHORIZATION);

  get trip() {
    const filteredTrip = this.#getFilteredTrip(this.#trip, this.currentFilter);
    return this.#getSortedTrip(filteredTrip, this.currentSort);
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

  get currentSort() {
    return this.#currentSort;
  }

  set currentSort(sortType) {
    this.#currentSort = sortType;
  }

  get info() {
    const trip = this.#getSortedTrip(this.#trip, DEFAULT_SORT_TYPE);
    const first = trip[0];
    const last = trip[trip.length - 1];
    const middle = trip.slice(1, -1);
    const middleDestination = middle.length === 1 ? this.#getDestinationName(middle[0].destination) : '...';
    return {
      start: this.#getDestinationName(first.destination),
      middle: middleDestination,
      end:  this.#getDestinationName(last.destination),
      dateFrom: first.dateFrom,
      dateTo: last.dateTo,
      cost: trip.reduce((price, point) => price + point.basePrice, 0),
    };
  }

  async init() {
    try {
      this.#destinations = await this.#tripApiService.getDestinations();
      this.#offers = await this.#tripApiService.getOffers();
      this.#trip = (await this.#tripApiService.getPoints()).map(TripApiService.adaptToClient);
    } catch(error) {
      this._notify(UpdateType.ERROR);
      this.#destinations = [];
      this.#offers = [];
      this.#trip = [];
    }

    this.#filters = Object.values(Filters);
    this._notify(UpdateType.INIT);
  }

  setCurrentFilter(updateType, filterType) {
    this.#currentFilter = filterType;
    this._notify(updateType, filterType);
  }

  async addPoint(updateType, point) {
    try {
      const newPoint = await this.#tripApiService.addPoint(point);
      this.#trip.push(newPoint);
      this._notify(updateType, newPoint);
    } catch(error) {
      throw new Error(error);
    }
  }

  async updatePoint(updateType, point) {
    const selectedPoint = this.#findPoint(point.id);
    if (!selectedPoint) {
      throw new Error(`Can't update trip event ${point.id}`);
    }

    try {
      const updatedPoint = await this.#tripApiService.updatePoint(point);
      Object.assign(selectedPoint, updatedPoint);
      this._notify(updateType, point);
    } catch(error) {
      throw new Error(error);
    }
  }

  async deletePoint(updateType, point) {
    const selectedPoint = this.#findPoint(point.id);
    if (!selectedPoint) {
      throw new Error(`Can't delete trip event ${point.id}`);
    }
    try {
      await this.#tripApiService.deletePoint(point);
    } catch(error) {
      throw new Error(error);
    }

    this.#trip = removeItem(this.#trip, selectedPoint);
    this._notify(updateType);
  }

  #getSortedTrip = (trip, sortType) => trip.sort(SortFunctions[sortType]);
  #getFilteredTrip = (trip, filter) => trip.filter(FilterFunctions[filter]);
  #getDestinationName = (id) => this.#destinations.find((destination) => destination.id === id).name;
  #findPoint = (id) => this.#trip.find((point) => point.id === id);
}
