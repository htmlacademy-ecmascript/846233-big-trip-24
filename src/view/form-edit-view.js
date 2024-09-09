import AbstractView from '../framework/view/abstract-view.js';
import { BlankTripPoint, POINT_TYPES, CITIES, DateFormats } from '../const.js';
import { displayDateTime } from '../utils/date.js';

const createPointTypeItemTemplate = (type) => {
  const lowerType = type.toLowerCase();
  return `
  <div class="event__type-item">
    <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerType}">
    <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${type}</label>
  </div>`;
};

const createPointTimePeriodTemplate = (dateFrom, dateTo) => `
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${displayDateTime(dateFrom, DateFormats.DATE_TIME)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">From</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${displayDateTime(dateTo, DateFormats.DATE_TIME)}">
  </div>
`;

const createOfferItemTemplate = ({type, title, price, selected}) => {
  const lowerType = type.toLowerCase();
  const checked = selected ? 'checked' : '';
  return `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${lowerType}-1" type="checkbox" name="event-offer-${lowerType}" ${checked}>
    <label class="event__offer-label" for="event-offer-${lowerType}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
};

const createOffersTemplate = (offers) => {
  if (!offers.length) {
    return '';
  }

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer) => createOfferItemTemplate(offer)).join('')}
      </div>
    </section>`;
};

const createPhotoTapeTemplate = (pictures) => {
  if (!pictures.length) {
    return '';
  }
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
      </div>
    </div>`;
};

const createDestinationTemplate = ({description, pictures}) => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    ${createPhotoTapeTemplate(pictures)}
  </section>
`;

const createCityOption = (city) => `
  <option value="${city}"></option>
`;

const createFormEditTemplate = (tripPoint) => {
  const { type, dateFrom, dateTo, destination, price, offers } = tripPoint;

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${POINT_TYPES.map((eventType) => createPointTypeItemTemplate(eventType)).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${CITIES.map((city) => createCityOption(city)).join('')}
          </datalist>
        </div>

        ${createPointTimePeriodTemplate(dateFrom, dateTo)}

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersTemplate(offers)}
        ${createDestinationTemplate(destination)}
      </section>
    </form>
  </li>`;
};

export default class FormEditView extends AbstractView{
  #tripPoint = null;
  #offers = null;
  #destinations = null;
  #submitHandler = null;
  #cancelHandler = null;

  constructor({tripPoint = BlankTripPoint, offers, destinations, onFormSubmit, onFormCancel}) {
    super();
    this.#tripPoint = tripPoint;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#submitHandler = onFormSubmit;
    this.#cancelHandler = onFormCancel;

    this.element.addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCancelForm);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCancelForm);
  }

  get template() {
    return createFormEditTemplate(this.#tripPoint, this.#offers, this.#destinations);
  }

  removeElement() {
    super.removeElement();
    this.element.removeEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__rollup-btn').removeEventListener('click', this.#onCancelForm);
    this.element.querySelector('.event__reset-btn').removeEventListener('click', this.#onCancelForm);
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#submitHandler();
  };

  #onCancelForm = (evt) => {
    evt.preventDefault();
    this.#cancelHandler();
  };
}

