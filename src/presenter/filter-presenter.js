import FilterView from '../view/filter-view';
import { replace } from '../framework/render';
import { UpdateType } from '../const/common';
import { getFiltered } from '../utils/filter';
import { isEmpty } from '../utils/common';

export default class FilterPresenter {
  #model = null;
  #container = null;
  #filterView = null;

  constructor ({ container, model }) {
    this.#container = container;
    this.#model = model;
    this.#model.addObserver(this.#onModelChange);
  }

  get filters() {
    const { filters, points } = this.#model;
    return filters.map((type) => ({
      type,
      disabled: isEmpty(getFiltered(points, type))
    }));
  }

  #renderFilters = ({ currentFilter }) => {
    const prevFilterView = this.#filterView;

    this.#filterView = new FilterView({
      filters: this.filters,
      currentFilter,
      container: this.#container,
      onFilterChange: this.#onFilterChange
    });

    if (prevFilterView === null) {
      return;
    }

    replace(this.#filterView, prevFilterView);
    prevFilterView.destroy();
  };

  #onFilterChange = (filterType) => this.#model.setCurrentFilter(UpdateType.MAJOR, filterType);
  #onModelChange = () => this.#renderFilters(this.#model);
}
