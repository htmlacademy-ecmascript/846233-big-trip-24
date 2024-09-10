import AbstractView from '../framework/view/abstract-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { displayDateTime } from './utils/date.js';
import { DateFormats } from '../const.js';

const createInfoTemplate = ({start, middle, end, dateFrom, dateTo, cost}) => `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${end} &mdash; ${middle} &mdash; ${start}</h1>

        <p class="trip-info__dates">${displayDateTime(dateFrom, DateFormats.DAY_MONTH)}
          &nbsp;&mdash;&nbsp;${displayDateTime(dateTo, DateFormats.DAY_MONTH)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>
`;


export default class InfoView extends AbstractView{
  #tripInfo = null;

  constructor({ tripInfo, container }) {
    super();
    this.#tripInfo = tripInfo;
    render(this, container, RenderPosition.AFTERBEGIN);
  }

  get template() {
    return createInfoTemplate(this.#tripInfo);
  }
}

