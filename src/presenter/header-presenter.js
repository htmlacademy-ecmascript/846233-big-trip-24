import { RenderPosition, render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import InfoView from '../view/info-view.js';

export default class HeaderPresenter {
  #model = null;
  #filterContainer = null;
  #infoContainer = null;

  constructor ({container, model}) {
    this.#filterContainer = container.filter;
    this.#infoContainer = container.info;
    this.#model = model;
  }

  init() {
    this.#renderSum(this.#model.tripPoints);
    this.#renderFilters(this.#model.filters);
  }

  #renderSum(tripPoints) {
    render(new InfoView(tripPoints), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilters(filters) {
    render(new FilterView({filters, currentFilter: filters[0]}), this.#filterContainer);

  }
}
