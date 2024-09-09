import AbstractView from '../framework/view/abstract-view.js';
import { DestinationEmptyMassages } from '../const.js';

const createEmptyTemplate = (filters) => `
  <p class="trip-events__msg">${DestinationEmptyMassages[filters]}</p>`;

export default class DestinationEmptyView extends AbstractView {
  #filter = '';

  constructor({filter}) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createEmptyTemplate(this.#filter);
  }
}
