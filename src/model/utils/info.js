const getDestinationName = (destinations, destinationId) => {
  const currentDestination = destinations.find((destination) => destination.id === destinationId);
  return currentDestination ? currentDestination.name : '';
};


const getInfo = (trip, destinations) => {
  const first = trip[0];
  const last = trip[trip.length - 1];
  const middle = trip.slice(1, -1);
  const middleDestination = middle.length === 1 ? getDestinationName(destinations, middle[0]?.destination) : '...';
  return {
    start: getDestinationName(destinations, first?.destination),
    middle: middleDestination,
    end: getDestinationName(destinations, last?.destination),
    dateFrom: first?.dateFrom,
    dateTo: last?.dateTo,
    cost: trip.reduce((price, point) => price + point.basePrice, 0),
  };
};

export { getInfo };
