import { SortTypes } from '../../const.js';
import { getDateDiff } from './date.js';

const SortedTypes = {
  [SortTypes.DAY]: (pointA, pointB) => pointA.dateFrom - pointB.dateFrom,
  [SortTypes.TIME]: (pointA, pointB) => getDateDiff(pointB) - getDateDiff(pointA),
  [SortTypes.PRICE]: (pointA, pointB) => pointB.Price - pointA.Price,
};

export { SortedTypes };
