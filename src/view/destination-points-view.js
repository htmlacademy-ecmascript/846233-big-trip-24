import { createElement } from '../render.js';

const createTripPointListTemplate = () => `
  <ul class="trip-events__list">
  </ul>`;

export default class DestinationPointsView {
  getTemplate() {
    return createTripPointListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
