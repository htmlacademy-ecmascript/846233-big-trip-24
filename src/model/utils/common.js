const getPointOffers = (offers, type) => offers.find((offer) => offer.type === type);
const getOffer = (offers, id) => offers.find((offer) => offer.id === id);
const getDestination = (destinations, id) => destinations.find((destination) => destination.id === id);

export { getDestination, getPointOffers, getOffer };
