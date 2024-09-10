import { getMockedPoints } from '../mock/point-mock.js';
import { getMockedDestinations } from '../mock/destination.js';
import { getMockedOffers } from '../mock/offer-mock.js';
import { FilterType, SORT_TYPES } from '../const.js';

export default class PointModel {
  #tripPoints = [];
  #destinations = [];
  #offers = [];
  #filters = [];
  #sortTypes = [];

  init() {
    this.destinations = getMockedDestinations();
    this.offers = getMockedOffers();
    this.tripPoints = getMockedPoints();
    this.#filters = Object.values(FilterType);
    this.#sortTypes = SORT_TYPES;
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  set tripPoints(tripPoints) {
    this.#tripPoints = tripPoints;
  }

  get offers() {
    return this.#offers;
  }

  set offers(offers) {
    this.#offers = offers;
  }

  get destinations() {
    return this.#destinations;
  }

  set destinations(destinations) {
    this.#destinations = destinations;
  }

  get sortTypes() {
    return this.#sortTypes;
  }

  get filters() {
    return this.#filters;
  }
}


