import FilterView from '../view/filter-view.js';
import { UpdateType } from '../const.js';
import { replace } from '../framework/render.js';

export default class FilterPresenter {
  #model = null;
  #container = null;
  #filterView = null;

  constructor ({container, model}) {
    this.#container = container;
    this.#model = model;
    this.init();
    this.#model.addObserver(this.#onModelChange);
  }

  init() {
    this.#renderFilters(this.#model);
  }

  #renderFilters({ filters, currentFilter }) {
    const prevFilterView = this.#filterView;

    this.#filterView = new FilterView({
      filters,
      currentFilter,
      container: this.#container,
      onFilterChange: this.#onFilterChange
    });

    if (prevFilterView === null) {
      return;
    }

    replace(this.#filterView, prevFilterView);
    prevFilterView.destroy();
  }

  #onFilterChange = (filterType) => {
    this.#model.setCurrentFilter(UpdateType.MAJOR, filterType);
  };

  #onModelChange = () => this.init();
}

