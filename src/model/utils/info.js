import { isEmpty } from '../../utils/common';
import { getPointOffers, getDestination, getOffer } from './common';

const getDestinationName = (destinations, destinationId) => {
  const currentDestination = getDestination(destinations, destinationId);
  return currentDestination ? currentDestination.name : '';
};

const getOffersCost = (point, offers) => {
  const pointOffers = getPointOffers(offers, point.type).offers;
  return point.offers.reduce((price, offerId) => price + getOffer(pointOffers, offerId).price , 0);
};

const getInfo = (points, destinations, offers) => {
  if (isEmpty(points)) {
    return {};
  }

  const first = points[0];
  const last = points[points.length - 1];
  const middle = points.slice(1, -1);
  const middleDestination = middle.length === 1 ? getDestinationName(destinations, middle[0].destination) : '...';
  return {
    start: getDestinationName(destinations, first.destination),
    middle: middle.length ? middleDestination : '',
    end: getDestinationName(destinations, last.destination),
    dateFrom: first.dateFrom,
    dateTo: last.dateTo,
    cost: points.reduce(
      (price, point) => price + point.basePrice + getOffersCost(point, offers), 0),
  };
};

export { getInfo };
