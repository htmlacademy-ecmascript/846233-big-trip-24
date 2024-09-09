import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPES } from '../const.js';

const createSortItemTemplate = (type) => {
  const lowerType = type.toLowerCase();
  return `
    <div class="trip-sort__item  trip-sort__item--${lowerType}">
      <input id="sort-${lowerType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
      <label class="trip-sort__btn" for="sort-${lowerType}">${type}</label>
    </div>`;
};

const createSortTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_TYPES.map((type) => createSortItemTemplate(type)).join('')}
  </form>
`;

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
