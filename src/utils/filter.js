import { Filters } from '../const/common.js';


const FilterFunctions = {
  [Filters.EVERYTHING]: () => true,
  [Filters.FUTURE]: (point) => point.dateFrom > new Date(),
  [Filters.PRESENT]: (point) => point.dateFrom <= new Date() && point.dateTo >= new Date(),
  [Filters.PAST]: (point) => point.dateTo < new Date(),
};

const getFiltered = (items, filterType) => items.filter(FilterFunctions[filterType]);

export { getFiltered };
