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

    for (let i = 1; i < this.#tripPoints.length; i++) {
      render(new DestinationPointView(this.#tripPoints[i]), this.#destinationPointsComponent.element);
    }
  }
}
