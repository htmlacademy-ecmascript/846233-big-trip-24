import AbstractView from '../framework/view/abstract-view.js';
import { firstLetterUpperCase, getIsCheckedAttr, getIsDisabledAttr } from '../utils/common.js';
import { render, remove } from '../framework/render.js';
import { Prefix } from '../const/common.js';


const getFilterItemTemplate = (value, isChecked, isDisabled) => `
  <div class="trip-filters__filter">
    <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${value}" ${getIsCheckedAttr(isChecked)} ${getIsDisabledAttr(isDisabled)}>
    <label class="trip-filters__filter-label" for="filter-${value}">${firstLetterUpperCase(value)}</label>
  </div>
`;

const getFiltersTemplate = (filters, currentFilter) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => getFilterItemTemplate(filter, filter === currentFilter, false)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class FilterView extends AbstractView {
  #filters = [];
  #currentFilter = '';
  #filterChangeHandler = null;

  constructor({filters, currentFilter, container, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#filterChangeHandler = onFilterChange;
    this.element.addEventListener('change', this.#onFilterChange);
    render(this, container);
  }

  get template() {
    return getFiltersTemplate(this.#filters, this.#currentFilter);
  }

  destroy = () => remove(this);

  removeElement = () => {
    this.element.removeEventListener('change', this.#onFilterChange);
    super.removeElement();
  };

  #onFilterChange = (evt) => {
    evt.preventDefault();
    this.#filterChangeHandler(evt.target.value.replace(Prefix.FILTER, ''));
  };
}
