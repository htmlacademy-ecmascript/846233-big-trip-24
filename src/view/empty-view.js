import AbstractView from '../framework/view/abstract-view.js';
import { render, remove } from '../framework/render.js';
import { TripEmptyMessages } from '../utils/filter.js';

const getEmptyTemplate = (filter) => `<p class="trip-events__msg">${TripEmptyMessages[filter]}</p>`;

export default class EmptyView extends AbstractView {
  #filter = '';

  constructor({ filter, container }) {
    super();
    this.#filter = filter;
    render(this, container);
  }

  get template() {
    return getEmptyTemplate(this.#filter);
  }

  destroy() {
    remove(this);
  }
}
