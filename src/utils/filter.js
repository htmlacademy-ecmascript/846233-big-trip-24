import { Filter } from '../const/common';


const FilterFunction = {
  [Filter.EVERYTHING]: () => true,
  [Filter.FUTURE]: (point) => point.dateFrom > new Date(),
  [Filter.PRESENT]: (point) => point.dateFrom <= new Date() && point.dateTo >= new Date(),
  [Filter.PAST]: (point) => point.dateTo < new Date(),
};

const getFiltered = (items, filterType) => items.filter(FilterFunction[filterType]);

export { getFiltered };
