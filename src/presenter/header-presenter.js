import FilterView from '../view/filter-view.js';
import InfoView from '../view/info-view.js';

export default class HeaderPresenter {
  #model = null;
  #filterContainer = null;
  #infoContainer = null;
  #filterView = null;

  constructor ({container, model}) {
    this.#filterContainer = container.filter;
    this.#infoContainer = container.info;
    this.#model = model;
  }

  init() {
    this.#renderSum(this.#model);
    this.#renderFilters(this.#model);
  }

  #renderSum({tripInfo}) {
    new InfoView({ tripInfo, container: this.#infoContainer });
  }

  #renderFilters({ filters, currentFilter }) {
    this.#filterView = new FilterView({
      filters,
      currentFilter,
      container: this.#filterContainer,
      onFilterChange: this.#onFilterChange
    });
  }

  #onFilterChange = (newFilter) => {
    if (this.#model.currentFilter === newFilter) {
      return;
    }

    this.#model.currentFilter = newFilter;
  };
}

