import { render, RenderPosition } from '../render.js';
import FormEditView from '../view/form-edit-view.js';
import DestinationPointView from '../view/destination-point-view.js';
import FilterView from '../view/filter-view.js';
import TripMainView from '../view/trip-main-view.js';
import SortView from '../view/sort-view.js';


export default class Presenter {
  constructor() {
    this.pageHeader = document.querySelector('.page-header');
    this.tripMain = this.pageHeader.querySelector('.trip-main');
    this.tripControlsFilters = this.pageHeader.querySelector('.trip-controls__filters');
    this.pageMain = document.querySelector('.page-main');
    this.tripEvents = this.pageMain.querySelector('.trip-events');

    this.destinationPointList = document.createElement('ul');
    this.destinationPointList.classList.add('trip-events__list');
    this.tripEvents.appendChild(this.destinationPointList);
  }


  renderTripMain() {
    render(new TripMainView(), this.tripMain, RenderPosition.AFTERBEGIN);
  }


  renderFilter() {
    render(new FilterView(), this.tripControlsFilters);
  }


  renderSort() {
    render(new SortView(), this.tripEvents, RenderPosition.AFTERBEGIN);
  }


  renderDestinationPoint() {
    for (let i = 0; i < 3; i++) {
      render(new DestinationPointView(), this.destinationPointList);
    }
  }


  renderFormEdit() {
    render(new FormEditView(), this.destinationPointList, RenderPosition.AFTERBEGIN);
  }

  init() {
    this.renderTripMain();
    this.renderFilter();
    this.renderSort();
    this.renderDestinationPoint();
    this.renderFormEdit();
  }
}
