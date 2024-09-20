import AbstractView from '../framework/view/abstract-view';
import { render, remove } from '../framework/render';

const getLoadingTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class LoadingView extends AbstractView {
  #message = '';

  constructor ({ container, message }) {
    super();
    this.#message = message;
    render(this, container);
  }

  get template() {
    return getLoadingTemplate(this.#message);
  }

  destroy = () => remove(this);
}

