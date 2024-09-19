import { isEmpty } from '../view/utils/common.js';
import DestinationPointsView from '../view/destination-points-view.js';
import DestinationEmptyView from '../view/destination-empty-view.js';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { UserAction, UpdateType, SortTypes, FilterType } from '../const.js';

export default class MainPresenter {
  #model = null;
  #container = null;
  #destinationPointsView = null;
  #sortView = null;
  #destinationEmptyView = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #addButton = null;

  constructor({container, model, addButton}) {
    this.#container = container;
    this.#model = model;
    this.#model.addObserver(this.#onModelChange);
    this.#renderTripPoints();
    this.#addButton = addButton;
    this.#addButton.addEventListener('click', this.#onAddButtonClick);

    this.#destinationPointsView = new DestinationPointsView({ container: this.#container });
    this.#newPointPresenter = new NewPointPresenter({
      model,
      container: this.#destinationPointsView.element,
      onDataChange: this.#onDestinationPointChange,
      onDestroy: this.#onNewPointClose
    });

    this.#renderTripPoints();
  }

  get tripPoints() {
    return this.#model.tripPoints;
  }

  #renderSortView() {
    this.#sortView = new SortView({
      currentSort: this.#model.currentSort,
      container: this.#container,
      onSortTypeChange: this.#onSortTypeChange,
    });
  }

  #renderDestinationEmptyView() {
    this.#destinationEmptyView = new DestinationEmptyView({ filter: this.#model.currentFilter, container: this.#container });
  }

  #renderDestinationPointsView(tripPoints) {
    tripPoints.forEach((tripPoint) => {
      const pointPresenter = new PointPresenter({
        model: this.#model,
        container: this.#destinationPointsView.element,
        onTripEventChange: this.#onDestinationPointChange,
        onModeChange: this.#onTripPointModeChange,
      });
      pointPresenter.init(tripPoint);
      this.#pointPresenters.set(tripPoint.id, pointPresenter);
    });
  }

  #renderTripPoints() {
    const tripPoints = this.tripPoints;
    if (isEmpty(tripPoints)){
      this.#renderDestinationEmptyView();
      return;
    }

    this.#renderSortView();
    this.#renderDestinationPointsView(tripPoints);
  }

  #clearTripPoints({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenters.clear();
    if (this.#sortView) {
      this.#sortView.destroy();
    }
    if (this.#destinationEmptyView) {
      this.#destinationEmptyView.destroy();
    }
    if (resetSortType) {
      this.#model.currentSort = SortTypes.DAY;
    }
  }

  #setAddButtonDisabled = (disabled) => (this.#addButton.disabled = disabled);

  #onTripPointModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  };

  #onSortTypeChange = (sortType) => {
    this.#model.currentSort = sortType;
    this.#onModelChange(UpdateType.MINOR);
  };

  #onAddButtonClick = () => {
    this.#onTripPointModeChange();
    this.#model.currentSort = SortTypes.DAY;
    this.#model.setCurrentFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.#model);
    this.#setAddButtonDisabled(true);
  };

  #onNewPointClose = () => this.#setAddButtonDisabled(false);

  #onDestinationPointChange = (actionType, updateType, data) => {
    switch (actionType) {
      case UserAction.UPDATE:
        this.#model.updateTripEvent(updateType, data);
        break;
      case UserAction.ADD:
        this.#model.addTripEvent(updateType, data);
        break;
      case UserAction.DELETE:
        this.#model.deleteTripEvent(updateType, data);
        break;
    }
  };

  #onModelChange = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripPoints();
        this.#renderTripPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearTripPoints({resetSortType: true});
        this.#renderTripPoints();
        break;
    }
  };
}
