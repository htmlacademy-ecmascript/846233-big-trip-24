import { render, RenderPosition } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #container = null;
  #formEditView = null;
  #destinationPointChangeHandler = null;
  #destinationPointDestroyHandler = null;

  constructor({ container, onDataChange, onDestroy }) {
    this.#container = container;
    this.#destinationPointChangeHandler = onDataChange;
    this.#destinationPointDestroyHandler = onDestroy;
  }

  init({ offers, destinations }) {
    if (this.#formEditView !== null) {
      return;
    }

    this.#formEditView = new FormEditView({
      offers,
      destinations,
      onFormSubmit: this.#onFormSubmit,
      onFormCancel: this.#onFormCancel,
    });

    render(this.#formEditView, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  destroy() {
    if (this.#formEditView === null) {
      return;
    }

    this.#formEditView.destroy();
    this.#formEditView = null;
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#destinationPointDestroyHandler();
  }

  #onFormSubmit = (tripPoint) => {
    this.#destinationPointChangeHandler(UserAction.ADD, UpdateType.MAJOR, tripPoint);
    this.destroy();
  };

  #onFormCancel = () => this.destroy();

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      this.destroy();
    }
  };
}
