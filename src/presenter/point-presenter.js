import { replace, remove } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import DestinationPointView from '../view/destination-point-view.js';
import { isEscapeKey } from '../view/utils/common.js';
import { Mode } from '../const.js';


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

  init(tripPoint) {
    this.#tripPoint = tripPoint;
    this.#renderTripPoint(tripPoint);
  }

  destroy() {
    remove(this.#destinationPointView);
    remove(this.#formEditView);
  }

  reset() {
    if (this.#mode !== Mode.VIEW) {
      this.#formEditView.reset(this.#tripPoint);
      this.#switchToViewMode();
    }
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
      onFormCancel: this.#onFormCancel,
    });

    if (prevDestinationPointView === null || prevFormEditView === null) {
      return;
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#formEditView, prevFormEditView);
    }

    if (this.#mode === Mode.VIEW) {
      this.#formEditView.reset(tripPoint);
      replace(this.#destinationPointView, prevDestinationPointView);
    }

    remove(prevDestinationPointView);
    remove(prevFormEditView);
  }

  #onFormSubmit = (tripPoint) => {
    this.#destinationPointChangeHandler(tripPoint);
    this.#switchToViewMode();
  };

  #onEditClick = () => this.#switchToEditMode();
  #onFormCancel = () => this.#switchToViewMode();

  #onFavoriteClick = () => this.#destinationPointChangeHandler({
    ...this.#tripPoint,
    isFavorite: !this.#tripPoint.isFavorite,
  });

  #switchToEditMode() {
    replace(this.#formEditView, this.#destinationPointView);
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#modeChangeHandler();
    this.#mode = Mode.EDIT;
  }

  #switchToViewMode() {
    replace(this.#destinationPointView, this.#formEditView);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.VIEW;
  }

  #onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#switchToViewMode();
    }
  };
}
