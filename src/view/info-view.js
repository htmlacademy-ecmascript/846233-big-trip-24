import AbstractView from '../framework/view/abstract-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { displayDateTime } from '../utils/date.js';
import { DateFormats } from '../const/common.js';

const getTripInfoTemplate = ({ start, middle, end, dateFrom, dateTo, cost }) => `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${start} &mdash; ${middle} &mdash; ${end}</h1>

        <p class="trip-info__dates">${displayDateTime(dateFrom, DateFormats.DAY_MONTH)}
          &nbsp;&mdash;&nbsp;${displayDateTime(dateTo, DateFormats.DAY_MONTH)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>
  `;

export default class InfoView extends AbstractView {
  #info = null;

  constructor({ info, container }) {
    super();
    this.#info = info;
    render(this, container, RenderPosition.AFTERBEGIN);
  }

  get template() {
    return getTripInfoTemplate(this.#info);
  }

  destroy = () => remove(this);
}
