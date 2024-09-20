import AbstractView from '../framework/view/abstract-view.js';
import { render } from '../framework/render.js';

const getTripListTemplate = () => `
  <ul class="trip-events__list">
  </ul>`;

export default class TripView extends AbstractView {
  constructor ({ container }) {
    super();
    render(this, container);
  }

  get template() {
    return getTripListTemplate();
  }
}
