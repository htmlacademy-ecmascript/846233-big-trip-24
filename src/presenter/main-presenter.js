import { render } from '../framework/render.js';
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
  #destinationPointsView = new DestinationPointsView();
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

  #renderEmptyView() {
    render(
      new DestinationEmptyView({ filter: this.#model.filters[0]}), this.#container
    );
  }

  #renderSortView() {
    render(
      new SortView({
        sortTypes: this.#model.sortTypes, currentSortType: this.#model.sortTypes[0],
      }), this.#container
    );
  }

  #renderTripPoints() {
    if (isEmpty(this.#tripPoints)){
      this.#renderEmptyView();
      return;
    }

    this.#renderSortView();
    render(this.#destinationPointsView, this.#container);

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
  }

  #onDestinationPointChange = (updatedTripPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedTripPoint);
    this.#pointPresenters.get(updatedTripPoint.id).init(updatedTripPoint);
  };

  #onDestinationPointModeChange = () => this.#pointPresenters.forEach((presenter) => presenter.reset());
}
