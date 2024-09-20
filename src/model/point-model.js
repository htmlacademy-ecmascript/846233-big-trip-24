import { Filters, DEFAULT_FILTER, DEFAULT_SORT_TYPE, UpdateType } from '../const/common.js';
import { BASE_URL, AUTHORIZATION } from '../const/api.js';
import TripApiService from '../trip-api-service.js';
import Observable from '../framework/observable.js';
import { removeItem } from '../utils/common.js';
import { getInfo } from './utils/info.js';
import { getSorted } from '../utils/sort.js';
export default class PointModel extends Observable {
  #destinations = [];
  #offers = [];
  #trip = [];
  #filters = [];
  #currentFilter = DEFAULT_FILTER;
  #currentSort = DEFAULT_SORT_TYPE;
  #tripApiService = new TripApiService(BASE_URL, AUTHORIZATION);

  get trip() {
    return this.#trip;
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
    const sortedTrip = getSorted(this.#trip, DEFAULT_SORT_TYPE);
    return getInfo(sortedTrip, this.#destinations, this.#offers);
  }

  init = async () => {
    try {
      this.#destinations = await this.#tripApiService.getDestinations();
      this.#offers = await this.#tripApiService.getOffers();
      this.#trip = (await this.#tripApiService.getPoints()).map(TripApiService.adaptToClient);
    } catch(error) {
      this.#destinations = [];
      this.#offers = [];
      this.#trip = [];
      this._notify(UpdateType.ERROR);
    }

    this.#filters = Object.values(Filters);
    this._notify(UpdateType.INIT);
  };

  setCurrentFilter = (updateType, filterType) => {
    this.#currentFilter = filterType;
    this._notify(updateType, filterType);
  };

  addPoint = async (updateType, point) => {
    try {
      const newPoint = await this.#tripApiService.addPoint(point);
      this.#trip.push(newPoint);
      this._notify(updateType, newPoint);
    } catch(error) {
      throw new Error(`Add error: ${error.message}`);
    }
  };

  updatePoint = async (updateType, point) => {
    const selectedPoint = this.#findPoint(point.id);
    if (!selectedPoint) {
      throw new Error(`Can't update trip event ${point.id}`);
    }

    try {
      const updatedPoint = await this.#tripApiService.updatePoint(point);
      Object.assign(selectedPoint, updatedPoint);
      this._notify(updateType, point);
    } catch(error) {
      throw new Error(`Update error: ${error.message}`);
    }
  };

  deletePoint = async (updateType, point) => {
    const selectedPoint = this.#findPoint(point.id);
    if (!selectedPoint) {
      throw new Error(`Can't delete trip event ${point.id}`);
    }
    try {
      await this.#tripApiService.deletePoint(point);
      this.#trip = removeItem(this.#trip, selectedPoint);
      this._notify(updateType);
    } catch(error) {
      throw new Error(`Delete error: ${error.message}`);
    }
  };

  #findPoint = (id) => this.#trip.find((point) => point.id === id);
}
