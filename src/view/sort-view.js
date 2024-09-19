import AbstractView from '../framework/view/abstract-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { firstLetterUpperCase, getIsCheckedAttr, getIsDisabledAttr } from './utils/common.js';
import { SortInputTypes } from '../const.js';

const createSortItemTemplate = (type, isChecked, isDisabled) => `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
        value="sort-${type}" ${getIsCheckedAttr(isChecked)} ${getIsDisabledAttr(isDisabled)}>
      <label class="trip-sort__btn" for="sort-${type}">${firstLetterUpperCase(type)}</label>
    </div>
`;

const createSortTemplate = (currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SortInputTypes.map(({ type, sortable }) => createSortItemTemplate(type, type === currentSortType, !sortable)).join('')}
  </form>
`;

export default class SortView extends AbstractView {
  #currentSort = '';
  #sortTypeChangeHandler = null;

  constructor({ currentSort, container, onSortTypeChange }) {
    super();
    this.#currentSort = currentSort;
    this.#sortTypeChangeHandler = onSortTypeChange;
    render(this, container, RenderPosition.AFTERBEGIN);

    this.element.addEventListener('change', this.#onSortTypeChange);
  }

  get template() {
    return createSortTemplate(this.#currentSort);
  }

  removeElement() {
    this.element.removeEventListener('change', this.#onSortTypeChange);
    super.removeElement();
  }

  #onSortTypeChange = (evt) => {
    evt.preventDefault();
    this.#sortTypeChangeHandler(evt.target.value.replace('sort-', ''));
  };

  destroy() {
    remove(this);
  }
}
