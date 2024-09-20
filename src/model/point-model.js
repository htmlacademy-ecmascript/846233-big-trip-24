import { Filter, DEFAULT_FILTER, DEFAULT_SORT_TYPE, UpdateType } from '../const/common';
import { BASE_URL, AUTHORIZATION } from '../const/api';
import TripApiService from '../trip-api-service';
import Observable from '../framework/observable';
import { removeItem } from '../utils/common';
import { getInfo } from './utils/info';
import { getSorted } from '../utils/sort';

export default class PointModel extends Observable {
  #destinations = [];
  #offers = [];
  #points = [];
  #filters = [];
  #currentFilter = DEFAULT_FILTER;
  #currentSort = DEFAULT_SORT_TYPE;
  #tripApiService = new TripApiService(BASE_URL, AUTHORIZATION);

  get points() {
    return this.#points;
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
    const sortedPoints = getSorted(this.#points, DEFAULT_SORT_TYPE);
    return getInfo(sortedPoints, this.#destinations, this.#offers);
  }

  init = async () => {
    try {
      this.#destinations = await this.#tripApiService.getDestinations();
      this.#offers = await this.#tripApiService.getOffers();
      this.#points = (await this.#tripApiService.getPoints()).map(TripApiService.adaptToClient);
      this.#filters = Object.values(Filter);
      this._notify(UpdateType.INIT);
    } catch(error) {
      this.#destinations = [];
      this.#offers = [];
      this.#points = [];
      this._notify(UpdateType.ERROR);
    }
  };

  setCurrentFilter = (updateType, filterType) => {
    this.#currentFilter = filterType;
    this._notify(updateType, filterType);
  };

  addPoint = async (updateType, point) => {
    try {
      const newPoint = await this.#tripApiService.addPoint(point);
      this.#points.push(newPoint);
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
      this.#points = removeItem(this.#points, selectedPoint);
      this._notify(updateType);
    } catch(error) {
      throw new Error(`Delete error: ${error.message}`);
    }
  };

  #findPoint = (id) => this.#points.find((point) => point.id === id);
}
