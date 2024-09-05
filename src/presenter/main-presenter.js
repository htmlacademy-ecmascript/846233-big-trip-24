import { render } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import DestinationPointView from '../view/destination-point-view.js';
import DestinationPointsView from '../view/destination-points-view.js';
import SortView from '../view/sort-view.js';


export default class MainPresenter {
  constructor({container, model}) {
    this.container = container;
    this.model = model;
  }

  init() {
    this.tripPoints = [...this.model.tripPoints];

    render(new SortView(), this.container);

    const tripPointList = new DestinationPointsView();
    render(tripPointList, this.container);
    render(new FormEditView(this.tripPoints[0]), tripPointList.element);

    this.tripPoints.forEach((tripPoint) => {
      const point = new DestinationPointView(tripPoint);

      render(point, tripPointList.element);
    });
  }
}
