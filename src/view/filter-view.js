import AbstractView from '../framework/view/abstract-view.js';
import { firstLetterUpperCase, getIsCheckedAttr } from '../utils/common.js';

const createFilterItemTemplate = (value, isChecked) =>`
  <div class="trip-filters__filter">
    <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${value}" ${getIsCheckedAttr(isChecked)}/>
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

  constructor({filters, currentFilter}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }
}
