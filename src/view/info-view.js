import AbstractView from '../framework/view/abstract-view';
import { render, remove, RenderPosition } from '../framework/render';
import { displayDateTime } from '../utils/date';
import { DateFormat } from '../const/common';

const getInfoTemplate = ({ start, middle, end, dateFrom, dateTo, cost }) => {
  if (!start) {
    return '<section class="trip-main__trip-info  trip-info"></section>';
  }

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${start} ${middle ? `&mdash; ${middle} ` : ''} &mdash; ${end}</h1>

        <p class="trip-info__dates">${displayDateTime(dateFrom, DateFormat.DAY_MONTH)}
          &nbsp;&mdash;&nbsp;${displayDateTime(dateTo, DateFormat.DAY_MONTH)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`;
};

export default class InfoView extends AbstractView {
  #info = null;

  constructor({ info, container }) {
    super();
    this.#info = info;
    render(this, container, RenderPosition.AFTERBEGIN);
  }

  get template() {
    return getInfoTemplate(this.#info);
  }

  destroy = () => remove(this);
}
