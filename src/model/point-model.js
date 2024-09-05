import { getMockedPoints } from '../mock/point-mock.js';
import { getMockedDestionations } from '../mock/destination.js';
import { getMockedOffers } from '../mock/offer-mock.js';
import { getRandomBoolean } from '../utils.js';


export default class PointModel {
  constructor() {
    this.destinations = getMockedDestionations();
    this.offers = getMockedOffers();

    this.tripPoints = getMockedPoints().map((tripPoint) => {
      const { offers } = this.offers.find((offer) => offer.type === tripPoint.type);

      return {
        ...tripPoint,
        destination: this.destinations.find((dest) => dest.id === tripPoint.destination),
        offers: offers.map((offer) => ({
          type: tripPoint.type,
          ...offer,
          selected: getRandomBoolean(),
        })),
      };
    });
  }

  getTripPoints() {
    return this.tripPoints;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
