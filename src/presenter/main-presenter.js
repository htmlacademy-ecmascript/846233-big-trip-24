import { isEmpty } from '../view/utils/common.js';
import DestinationPointsView from '../view/destination-points-view.js';
import DestinationEmptyView from '../view/destination-empty-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from './presenter-utils.js';

export default class MainPresenter {
  #container = null;
  #model = null;
  #tripPoints = [];
  #destinationPointsView = null;
  #sortView = null;
  #destinationEmptyView = null;
  #pointPresenters = new Map();

  constructor({container, model}) {
    this.#container = container;
    this.#model = model;
  }

  init() {
    this.#tripPoints = [...this.#model.tripPoints];
    this.#clearTripPoints();
    this.#renderTripPoints();
  }

  #renderDestinationEmptyView() {
    this.#destinationEmptyView = new DestinationEmptyView({ filter: this.#model.currentFilter, container: this.#container });
  }


  #renderSortView({ sortTypes, currentSort }) {
    if (this.#sortView) {
      return;
    }

    this.#sortView = new SortView({
      sortTypes,
      currentSort,
      container: this.#container,
      onSortTypeChange: this.#onSortTypeChange,
    });
  }

  #renderTripPoints() {
    if (isEmpty(this.#tripPoints)){
      this.#renderDestinationEmptyView();
      return;
    }

    this.#renderSortView(this.#model);
    this.#destinationPointsView = new DestinationPointsView({ container: this.#container });

    this.#tripPoints.forEach((tripPoint) => {
      const pointPresenter = new PointPresenter({
        model: this.#model,
        container: this.#destinationPointsView.element,
        onDestinationPointChange: this.#onDestinationPointChange,
        onModeChange: this.#onDestinationPointModeChange,
      });
      pointPresenter.init(tripPoint);
      this.#pointPresenters.set(tripPoint.id, pointPresenter);
    });
  }

  #clearTripPoints() {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenters.clear();
    if (this.#destinationEmptyView) {
      this.#destinationEmptyView.destroy();
    }
  }

  #onDestinationPointChange = (updatedTripPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedTripPoint);
    this.#pointPresenters.get(updatedTripPoint.id).init(updatedTripPoint);
  };

  #onDestinationPointModeChange = () => this.#pointPresenters.forEach((presenter) => presenter.reset());

  #onSortTypeChange = (newSort) => {
    if (this.#model.currentSort === newSort) {
      return;
    }

    this.#model.currentSort = newSort;
    this.init();
  };
}
