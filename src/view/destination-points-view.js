import AbstractView from '../framework/view/abstract-view';

const createTripPointListTemplate = () => `
  <ul class="trip-events__list">
  </ul>`;

export default class DestinationPointsView extends AbstractView {
  get template() {
    return createTripPointListTemplate();
  }
}
