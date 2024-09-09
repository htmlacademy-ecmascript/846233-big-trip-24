import { render } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import DestinationPointView from '../view/destination-point-view.js';
import DestinationPointsView from '../view/destination-points-view.js';
import SortView from '../view/sort-view.js';


export default class MainPresenter {
  #container = null;
  #model = null;
  #destinationPointsComponent = new DestinationPointsView();
  #tripPoints = [];
  // сделать контейнер для сортировки? boardComponent = new BoardView();

  constructor({container, model}) {
    this.#container = container;
    this.#model = model;
  }

  init() {
    this.#tripPoints = [...this.#model.tripPoints];
    render(this.#destinationPointsComponent, this.#container);
    render(new SortView(), this.#container);
    render(new FormEditView(this.#tripPoints[0]), this.#destinationPointsComponent.element);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  }

  #renderTripPoint(task) {
    const tripPointComponent = new DestinationPointView(task);

    render(tripPointComponent, this.#destinationPointsComponent.element);
  }
}
