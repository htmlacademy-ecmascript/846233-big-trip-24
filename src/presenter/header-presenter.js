import { render } from '../render.js';
import FilterView from '../view/filter-view.js';
import InfoView from '../view/info-view.js';
import { RenderPosition } from '../render.js';

export default class HeaderPresenter {
  constructor ({ filterContainer, infoContainer }) {
    this.filterContainer = filterContainer;
    this.infoContainer = infoContainer;
  }

  init() {
    render(new FilterView(), this.filterContainer, RenderPosition.BEFOREEND);
    render(new InfoView(), this.infoContainer, RenderPosition.AFTERBEGIN);
  }
}
