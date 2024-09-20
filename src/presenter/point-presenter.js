import EditView from '../view/edit-view';
import PointView from '../view/point-view';
import { replace } from '../framework/render';
import { UserAction, UpdateType, FormMode } from '../const/common';
import { isEscKeydown } from '../utils/common';


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
      this.#editView.updateElement({ isSaving: true, isDeleting: false });
    }
  };

  setDeleting = () => {
    if (this.#mode === FormMode.EDIT) {
      this.#editView.updateElement({ isDeleting: true, isSaving: false });
    }
  };

  setAborting = () => {
    if (this.#mode === FormMode.VIEW) {
      this.#pointView.shake();
      return;
    }

    const resetFormState = () => this.#editView.updateElement({ isSaving: false, isDeleting: false });
    this.#editView.shake(resetFormState);
  };


  #renderPoint = (point) => {
    const offers = this.#model.offers;
    const destinations = this.#model.destinations;

    const prevPointView = this.#pointView;
    const prevEditView = this.#editView;

    this.#pointView = new PointView({
      tripEvent : point,
      offers,
      destinations,
      container: this.#container,
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#editView = new EditView({
      tripEvent: point,
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
      this.#editView.reset(point);
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

  #addListeners = () => document.addEventListener('keydown', this.#onEscKeydown);
  #removeListeners = () => document.removeEventListener('keydown', this.#onEscKeydown);

  #onEditClick = () => {
    this.mode = FormMode.EDIT;
  };

  #onFormCancel = () => {
    this.mode = FormMode.VIEW;
  };

  #onFormDelete = (point) => this.#pointChangeHandler(UserAction.DELETE, UpdateType.MINOR, point);
  #onFormSubmit = (point) => this.#pointChangeHandler(UserAction.UPDATE, UpdateType.MINOR, point);

  #onFavoriteClick = () => this.#pointChangeHandler(UserAction.UPDATE, UpdateType.PATCH,
    { ...this.#point, isFavorite: !this.#point.isFavorite }
  );

  #onEscKeydown = (evt) => {
    if (isEscKeydown(evt)) {
      evt.stopPropagation();
      this.mode = FormMode.VIEW;
    }
  };
}
