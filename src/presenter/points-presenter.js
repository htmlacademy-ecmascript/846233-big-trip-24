import { isEmpty } from '../utils/common';
import SortView from '../view/sort-view';
import PointsView from '../view/points-view';
import LoadingView from '../view/loading-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import { UserAction, UpdateType, Message, DEFAULT_SORT_TYPE, DEFAULT_FILTER,
  TripEmptyMessage, UiBlockerConfig } from '../const/common';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import { getFiltered } from '../utils/filter';
import { getSorted } from '../utils/sort';

export default class PointsPresenter {
  #model = null;
  #container = null;
  #pointsView = null;
  #sortView = null;
  #loadingView = null;
  #isLoading = true;
  #isError = false;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #addButton = null;
  #uiBlocker = new UiBlocker(UiBlockerConfig);

  constructor({ container, model, addButton }) {
    this.#container = container;
    this.#model = model;
    this.#model.addObserver(this.#onModelChange);
    this.#addButton = addButton;
    this.#addButton.addEventListener('click', this.#onAddButtonClick);
    this.#setAddButtonDisabled(true);

    this.#pointsView = new PointsView({ container: this.#container });
    this.#newPointPresenter = new NewPointPresenter({
      model,
      container: this.#pointsView.element,
      onDataChange: this.#onPointChange,
      onDestroy: this.#onNewPointClose
    });

    this.#renderPoints();
  }

  get points() {
    const filteredPoints = getFiltered(this.#model.points, this.#model.currentFilter);
    return getSorted(filteredPoints, this.#model.currentSort);
  }

  #renderSortView = () => {
    this.#sortView = new SortView({
      currentSort: this.#model.currentSort,
      container: this.#container,
      onSortTypeChange: this.#onSortTypeChange,
    });
  };

  #renderPointsView = (points) => {
    points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        model: this.#model,
        container: this.#pointsView.element,
        onPointChange: this.#onPointChange,
        onModeChange: this.#onPointModeChange,
      });
      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  };

  #renderLoadingView = () => {
    const getMessage = () => {
      switch (true) {
        case this.#isLoading:
          return Message.LOADING;
        case this.#isError:
          return Message.ERROR;
        case isEmpty(this.points):
          return TripEmptyMessage[this.#model.currentFilter];
        default:
          return '';
      }
    };

    const message = getMessage();
    if (message) {
      this.#loadingView = new LoadingView({ message, container: this.#container });
    }
    return Boolean(message);
  };


  #clearLoadingView = () => {
    if (this.#loadingView) {
      this.#loadingView.destroy();
    }
  };

  #renderPoints = () => {
    if (this.#renderLoadingView()) {
      return;
    }

    this.#renderSortView();
    this.#renderPointsView(this.points);
  };

  #clearPoints = (resetSortType = false) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenters.clear();
    if (this.#sortView) {
      this.#sortView.destroy();
    }
    if (resetSortType) {
      this.#model.currentSort = DEFAULT_SORT_TYPE;
    }
  };

  #setAddButtonDisabled = (disabled) => (this.#addButton.disabled = disabled);

  #onPointModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #onSortTypeChange = (sortType) => {
    this.#model.currentSort = sortType;
    this.#onModelChange(UpdateType.MINOR);
  };

  #onAddButtonClick = () => {
    this.#onPointModeChange();
    this.#model.currentSort = DEFAULT_SORT_TYPE;
    this.#model.setCurrentFilter(UpdateType.MAJOR, DEFAULT_FILTER);
    this.#newPointPresenter.init(this.#model);
    this.#clearLoadingView();
    this.#setAddButtonDisabled(true);
  };

  #onNewPointClose = () => {
    this.#setAddButtonDisabled(false);
    this.#renderLoadingView();
  };

  #onPointChange = async (actionType, updateType, data) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.ADD:
        this.#newPointPresenter.setSaving();
        try {
          await this.#model.addPoint(updateType, data);
        } catch(error) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.UPDATE:
        this.#pointPresenters.get(data.id).setSaving();
        try {
          await this.#model.updatePoint(updateType, data);
        } catch(error) {
          this.#pointPresenters.get(data.id).setAborting();
        }
        break;
      case UserAction.DELETE:
        this.#pointPresenters.get(data.id).setDeleting();
        try {
          await this.#model.deletePoint(updateType, data);
        } catch(error) {
          this.#pointPresenters.get(data.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #onModelChange = (updateType, data) => {
    this.#clearLoadingView();
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        this.#onPointModeChange();
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints(true);
        this.#renderPoints();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#setAddButtonDisabled(this.#isLoading);
        this.#loadingView.destroy();
        this.#renderPoints();
        break;
      case UpdateType.ERROR:
        this.#isError = true;
        this.#isLoading = false;
        this.#renderPoints();
        break;
    }
  };
}
