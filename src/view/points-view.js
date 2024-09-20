import AbstractView from '../framework/view/abstract-view';
import { render } from '../framework/render';

const getPointsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointsView extends AbstractView {
  constructor ({ container }) {
    super();
    render(this, container);
  }

  get template() {
    return getPointsListTemplate();
  }
}
