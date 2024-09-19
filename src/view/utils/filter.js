import { FilterType } from '../../const.js';

const DestinationEmptyMassages = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no past events now',
  [FilterType.PAST]: 'There are no past events now',
};

const FilteredTypes = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (tripPoint) => tripPoint.dateFrom > new Date(),
  [FilterType.PRESENT]: (tripPoint) => tripPoint.dateFrom <= new Date() && tripPoint.dateTo >= new Date(),
  [FilterType.PAST]: (tripPoint) => tripPoint.dateTo < new Date(),
};

export { FilteredTypes, DestinationEmptyMassages };
