import { SortTypes } from '../const/common.js';
import { getDateDiff } from './date.js';

const SortFunctions = {
  [SortTypes.DAY]: (pointA, pointB) => pointA.dateFrom - pointB.dateFrom,
  [SortTypes.TIME]: (pointA, pointB) => getDateDiff(pointB) - getDateDiff(pointA),
  [SortTypes.PRICE]: (pointA, pointB) => pointB.basePrice - pointA.basePrice,
};

export { SortFunctions };
