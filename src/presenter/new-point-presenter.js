import { render, RenderPosition } from '../framework/render.js';
import EditView from '../view/edit-view.js';
import { UserAction, UpdateType } from '../const/common.js';
import { isEscKeydown } from '../utils/common.js';

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

  init = ({ offers, destinations }) => {
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
  };

  destroy = () => {
    if (this.#editView === null) {
      return;
    }

    this.#editView.destroy();
    this.#editView = null;
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#pointDestroyHandler();
  };

  setSaving = (isSaving = true) => this.#editView.updateElement({ isSaving });
  setAborting = () => this.#editView.shake(this.setSaving(false));

  #onFormSubmit = (point) => this.#pointChangeHandler(UserAction.ADD, UpdateType.MAJOR, point);
  #onFormCancel = () => this.destroy();

  #onEscKeydown = (evt) => {
    if (isEscKeydown(evt)) {
      evt.stopPropagation();
      this.destroy();
    }
  };
}
