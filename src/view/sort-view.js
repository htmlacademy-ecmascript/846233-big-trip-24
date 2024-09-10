import AbstractView from '../framework/view/abstract-view.js';
import { render } from '../framework/render.js';
import { firstLetterUpperCase } from './utils/common.js';
import { getIsCheckedAttr, getIsDisabledAttr } from './utils/common.js';

const createSortItemTemplate = (type, isChecked, isDisabled) => `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio"
        name="trip-sort" value="sort-${type}" ${getIsCheckedAttr(isChecked)} ${getIsDisabledAttr(isDisabled)}>
      <label class="trip-sort__btn" for="sort-${type}">${firstLetterUpperCase(type)}</label>
    </div>
`;

const createSortTemplate = (sortTypes, currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTypes.map(({ type, disabled }) => createSortItemTemplate(type, type === currentSortType, disabled)).join('')}
  </form>
`;

export default class SortView extends AbstractView {
  #sortTypes = [];
  #currentSort = '';
  #sortTypeChangeHandler = null;

  constructor({ sortTypes, currentSort, container, onSortTypeChange }) {
    super();
    this.#sortTypes = sortTypes;
    this.#currentSort = currentSort;
    this.#sortTypeChangeHandler = onSortTypeChange;
    render(this, container);

    this.element.addEventListener('change', this.#onSortTypeChange);
  }

  get template() {
    return createSortTemplate(this.#sortTypes, this.#currentSort);
  }

  removeElement() {
    this.element.removeEventListener('change', this.#onSortTypeChange);
    super.removeElement();
  }

  #onSortTypeChange = (evt) => {
    evt.preventDefault();
    this.#sortTypeChangeHandler(evt.target.value.replace('sort-', ''));
  };
}
