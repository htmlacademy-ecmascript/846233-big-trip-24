import AbstractView from '../framework/view/abstract-view.js';
import { firstLetterUpperCase, getIsCheckedAttr, getIsDisabledAttr } from './utils/common.js';
import { render } from '../framework/render.js';

const createFilterItemTemplate = (value, isChecked, isDisabled) =>`
  <div class="trip-filters__filter">
    <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${value}" ${getIsCheckedAttr(isChecked)} ${getIsDisabledAttr(isDisabled)}/>
    <label class="trip-filters__filter-label" for="filter-${value}">${firstLetterUpperCase(value)}</label>
</div>
`;

const createFilterTemplate = (filters, currentFilter) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterItemTemplate(filter, filter === currentFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class FilterView extends AbstractView{
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
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  removeElement() {
    this.element.removeEventListener('change', this.#onFilterChange);
    super.removeElement();
  }

  #onFilterChange = (evt) => {
    evt.preventDefault();
    this.#filterChangeHandler(evt.target.value.replace('filter-', ''));
  };
}
