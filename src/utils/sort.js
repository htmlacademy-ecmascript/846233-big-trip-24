import { SortType } from '../const/common';
import { getDateDiff } from './date';

const SortFunction = {
  [SortType.DAY]: (pointA, pointB) => pointA.dateFrom - pointB.dateFrom,
  [SortType.TIME]: (pointA, pointB) => getDateDiff(pointB) - getDateDiff(pointA),
  [SortType.PRICE]: (pointA, pointB) => pointB.basePrice - pointA.basePrice,
};

const getSorted = (items, sortType) => items.sort(SortFunction[sortType]);


export { getSorted };
