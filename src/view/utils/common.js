import { getDateDiff } from './date.js';

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEmpty = (list) => list.length === 0;
const getIsCheckedAttr = (isChecked) => isChecked ? 'checked' : '';
const getIsDisabledAttr = (isDisabled) => isDisabled ? 'disabled' : '';
const updateItem = (items, updatedItem) => items.map((item) => item.id === updatedItem.id ? updatedItem : item);
const sortByDay = (pointA, pointB) => pointA.dateFrom - pointB.dateFrom;
const sortByTime = (pointA, pointB) => getDateDiff(pointB) - getDateDiff(pointA);
const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;
const firstLetterUpperCase = (word) => {
  const [firstLetter,...rest] = word;
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

export {
  isEscapeKey,
  firstLetterUpperCase,
  isEmpty,
  getIsCheckedAttr,
  getIsDisabledAttr,
  updateItem,
  sortByDay,
  sortByTime,
  sortByPrice
};
