import EditView from '../view/edit-view.js';
import PointView from '../view/point-view.js';
import { replace } from '../framework/render.js';
import { UserAction, UpdateType, FormMode } from '../const/common.js';
import { isDatesEqual } from '../utils/date.js';

export default class PointPresenter {
  #point = null;
  #model = null;
  #container = null;
  #pointView = null;
  #editView = null;
  #pointChangeHandler = null;
  #changeModeHandler = null;
  #mode = FormMode.VIEW;

  constructor({ model, container, onPointChange, onModeChange }) {
    this.#model = model;
    this.#container = container;
    this.#pointChangeHandler = onPointChange;
    this.#changeModeHandler = onModeChange;
  }

  get mode() {
    return this.#mode;
  }

  set mode(newMode) {
    if (this.mode === newMode) {
      return;
    }

    switch (newMode) {
      case FormMode.VIEW:
        this.#switchToViewMode();
        break;
      case FormMode.EDIT:
        this.#switchToEditMode();
        break;
    }
    this.#mode = newMode;
  }

  init = (point) => {
    this.#point = point;
    this.#renderPoint(point);
  };

  destroy = () => {
    this.#pointView.destroy();
    this.#editView.destroy();
    this.#removeListeners();
  };

  resetView = () => {
    this.mode = FormMode.VIEW;
  };

  setSaving = () => {
    if (this.#mode === FormMode.EDIT) {
      this.#editView.updateElement({ isSaving: true });
    }
  };

  setDeleting = () => {
    if (this.#mode === FormMode.EDIT) {
      this.#editView.updateElement({ isDeleting: true });
    }
  };

  setAborting = () => {
    if (this.#mode === FormMode.VIEW) {
      this.#pointView.shake();
      return;
    }

    const resetFormState = () => {
      this.#editView.updateElement({
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editView.shake(resetFormState);
  };


  #renderPoint = (tripEvent) => { //?
    const offers = this.#model.offers;
    const destinations = this.#model.destinations;

    const prevPointView = this.#pointView;
    const prevEditView = this.#editView;

    this.#pointView = new PointView({
      tripEvent,
      offers,
      destinations,
      container: this.#container,
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#editView = new EditView({ //?
      tripEvent,
      offers,
      destinations,
      onFormSubmit: this.#onFormSubmit,
      onFormDelete: this.#onFormDelete,
      onFormCancel: this.#onFormCancel,
    });

    if (prevPointView === null || prevEditView === null) {
      return;
    }

    if (this.mode === FormMode.EDIT) {
      replace(this.#editView, prevEditView);
    }

    if (this.mode === FormMode.VIEW) {
      this.#editView.reset(tripEvent);
      replace(this.#pointView, prevPointView);
    }

    prevPointView.destroy();
    prevEditView.destroy();
  };

  #switchToEditMode = () => {
    replace(this.#editView, this.#pointView);
    this.#addListeners();
    this.#changeModeHandler();
  };

  #switchToViewMode = () => {
    this.#editView.reset(this.#point);
    replace(this.#pointView, this.#editView);
    this.#removeListeners();
  };

  #onEditClick = () => {
    this.mode = FormMode.EDIT;
  };

  #onFormCancel = () => {
    this.mode = FormMode.VIEW;
  };

  #addListeners = () => document.addEventListener('keydown', this.#onEscKeydown);
  #removeListeners = () => document.removeEventListener('keydown', this.#onEscKeydown);

  #onFormDelete = (point) => {
    this.#pointChangeHandler(UserAction.DELETE, UpdateType.MINOR, point);
  };

  #onFormSubmit = (point) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, point.dateFrom) ||
      !isDatesEqual(this.#point.dateTo, point.dateTo) ;
    this.#pointChangeHandler(UserAction.UPDATE, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, point);
  };

  #onFavoriteClick = () => this.#pointChangeHandler(UserAction.UPDATE, UpdateType.PATCH,
    { ...this.#point, isFavorite: !this.#point.isFavorite }
  );

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      this.mode = FormMode.VIEW;
    }
  };
}
