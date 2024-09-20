import { render, RenderPosition } from '../framework/render.js';
import EditView from '../view/edit-view.js';
import { UserAction, UpdateType } from '../const/common.js';

export default class NewPointPresenter {
  #container = null;
  #editView = null;
  #pointChangeHandler = null;
  #pointDestroyHandler = null;

  constructor({ container, onDataChange, onDestroy }) {
    this.#container = container;
    this.#pointChangeHandler = onDataChange;
    this.#pointDestroyHandler = onDestroy;
  }

  init({ offers, destinations }) {
    if (this.#editView !== null) {
      return;
    }

    this.#editView = new EditView({
      offers,
      destinations,
      onFormSubmit: this.#onFormSubmit,
      onFormCancel: this.#onFormCancel,
    });

    render(this.#editView, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  destroy() {
    if (this.#editView === null) {
      return;
    }

    this.#editView.destroy();
    this.#editView = null;
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#pointDestroyHandler();
  }

  #onFormSubmit = (point) => {
    this.#pointChangeHandler(UserAction.ADD, UpdateType.MAJOR, point);
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
