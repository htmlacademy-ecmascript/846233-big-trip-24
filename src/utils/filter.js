import { Filters } from '../const/common.js';

const TripEmptyMessages = {
  [Filters.EVERYTHING]: 'Click New Event to create your first point',
  [Filters.FUTURE]: 'There are no future events now',
  [Filters.PRESENT]: 'There are no present events now',
  [Filters.PAST]: 'There are no past events now',
};

const FilterFunctions = {
  [Filters.EVERYTHING]: () => true,
  [Filters.FUTURE]: (point) => point.dateFrom > new Date(),
  [Filters.PRESENT]: (point) => point.dateFrom <= new Date() && point.dateTo >= new Date(),
  [Filters.PAST]: (point) => point.dateTo < new Date(),
};

export { TripEmptyMessages, FilterFunctions };
