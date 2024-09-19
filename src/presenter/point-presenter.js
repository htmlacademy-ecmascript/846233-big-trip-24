import { replace } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import DestinationPointView from '../view/destination-point-view.js';
import { isEscapeKey } from '../view/utils/common.js';
import { Mode, UserAction, UpdateType} from '../const.js';
import { isDatesEqual } from '../view/utils/date.js';


export default class PointPresenter {
  #tripPoint = null;
  #model = null;
  #container = null;
  #destinationPointView = null;
  #formEditView = null;
  #destinationPointChangeHandler = null;
  #modeChangeHandler = null;
  #mode = Mode.VIEW;

  constructor({ model, container, onDestinationPointChange, onModeChange}) {
    this.#model = model;
    this.#container = container;
    this.#destinationPointChangeHandler = onDestinationPointChange;
    this.#modeChangeHandler = onModeChange;
  }

  get mode() {
    return this.#mode;
  }

  set mode(newMode) {
    if (this.mode === newMode) {
      return;
    }

    switch (newMode) {
      case Mode.VIEW:
        this.#switchToViewMode();
        break;
      case Mode.EDIT:
        this.#switchToEditMode();
        break;
    }
    this.#mode = newMode;
  }

  init(tripPoint) {
    this.#tripPoint = tripPoint;
    this.#renderTripPoint(tripPoint);
  }

  destroy() {
    this.#destinationPointView.destroy();
    this.#formEditView.destroy();
    this.#removeListeners();
  }

  reset() {
    this.mode = Mode.VIEW;
  }

  #renderTripPoint(tripPoint) {
    const offers = this.#model.offers;
    const destinations = this.#model.destinations;
    const prevDestinationPointView = this.#destinationPointView;
    const prevFormEditView = this.#formEditView;

    this.#destinationPointView = new DestinationPointView({
      tripPoint,
      offers,
      destinations,
      container: this.#container,
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#formEditView = new FormEditView({
      tripPoint,
      offers,
      destinations,
      onFormSubmit: this.#onFormSubmit,
      onFormDelete: this.#onFormDelete,
      onFormCancel: this.#onFormCancel,
    });

    if (prevDestinationPointView === null || prevFormEditView === null) {
      return;
    }

    if (this.mode === Mode.EDIT) {
      replace(this.#formEditView, prevFormEditView);
    }

    if (this.mode === Mode.VIEW) {
      this.#formEditView.reset(tripPoint);
      replace(this.#destinationPointView, prevDestinationPointView);
    }

    prevDestinationPointView.destroy();
    prevFormEditView.destroy();
  }

  #onFormSubmit = (tripPoint) => {
    const isMinorUpdate = !isDatesEqual(this.#tripPoint.dateFrom, tripPoint.dateFrom) ||
      !isDatesEqual(this.#tripPoint.dateTo, tripPoint.dateTo) ;
    this.#destinationPointChangeHandler(UserAction.UPDATE, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, tripPoint);
  };

  #onFormDelete = (tripPoint) => {
    if (tripPoint.id) {
      this.#destinationPointChangeHandler(
        UserAction.DELETE,
        UpdateType.MINOR,
        tripPoint
      );
    }
  };

  #onFavoriteClick = () => this.#destinationPointChangeHandler(
    UserAction.UPDATE,
    UpdateType.PATCH,
    { ...this.#tripPoint, isFavorite: !this.#tripPoint.isFavorite }
  );

  #switchToEditMode() {
    replace(this.#formEditView, this.#destinationPointView);
    this.#addListeners();
    this.#modeChangeHandler();
  }

  #switchToViewMode() {
    this.#formEditView.reset(this.#tripPoint);
    replace(this.#destinationPointView, this.#formEditView);
    this.#removeListeners();
  }

  #onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.mode = Mode.VIEW;
    }
  };

  #onEditClick = () => (this.mode = Mode.EDIT);
  #onFormCancel = () => (this.mode = Mode.VIEW);
  #addListeners = () => document.addEventListener('keydown', this.#onEscKeydown);
  #removeListeners = () => document.removeEventListener('keydown', this.#onEscKeydown);
}
