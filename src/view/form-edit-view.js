import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { BlankTripPoint, POINT_TYPES, DateFormats, ButtonTypes, DefaultFlatpickrConfig } from '../const.js';
import { displayDateTime } from './utils/date.js';
import { firstLetterUpperCase, getIsCheckedAttr } from './utils/common.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const createPointTypeItemTemplate = (type, isCheсked) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${getIsCheckedAttr(isCheсked)}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${firstLetterUpperCase(type)}</label>
  </div>
`;


const createPointTypesTemplate = (type) => `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${POINT_TYPES.map((pointType) => createPointTypeItemTemplate(pointType, type === pointType)).join('')}
      </fieldset>
    </div>
  </div>
`;

const createPointDestination = (type, destinationName, destinations) => `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text"
     name="event-destination" value="${destinationName}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
    </datalist>
  </div>
`;

const createTimePeriodTemplate = (dateFrom, dateTo) => `
<div class="event__field-group  event__field-group--time">
  <label class="visually-hidden" for="event-start-time-1">From</label>
  <input class="event__input  event__input--time" id="event-start-time-1" type="text"
  name="event-start-time" value="${displayDateTime(dateFrom, DateFormats.DATE_TIME)}">
  &mdash;
  <label class="visually-hidden" for="event-end-time-1">To</label>
  <input class="event__input  event__input--time" id="event-end-time-1" type="text"
  name="event-end-time" value="${displayDateTime(dateTo, DateFormats.DATE_TIME)}">
</div>
`;

const createPriceTemplate = (price) => `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
  </div>
`;

const createButtonsTemplate = (saveButton, resetButton) => `
  <button class="event__save-btn  btn  btn--blue" type="submit">${saveButton}</button>
  <button class="event__reset-btn" type="reset">${resetButton}</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
`;

const createOfferItemTemplate = ({id, title, price, type, isSelected}) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${isSelected ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${type}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`;

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

const createDestinationTemplate = ({ description, pictures }) => !description || !pictures.length ? '' : `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createPhotoTapeTemplate(pictures)}
  </section>`;

const createFormEditTemplate = (tripPoint, offers, destinations) => {
  const { type, dateFrom, dateTo, price } = tripPoint;
  const destinationPoint = destinations.find((destination) => destination.id === tripPoint.destination);
  const { offers: typedOffers } = offers.find((offer) => offer.type === type);
  const tripOffers = typedOffers.map((offer) => ({
    ...offer,
    type: type,
    isSelected: tripPoint.offers.includes(offer.id)
  }));

  return `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createPointTypesTemplate(type)}
        ${createPointDestination(type, destinationPoint.name, destinations)}
        ${createTimePeriodTemplate(dateFrom, dateTo)}
        ${createPriceTemplate(price)}
        ${createButtonsTemplate(ButtonTypes.SAVE, ButtonTypes.DELETE)}
      </header>
      <section class="event__details">
        ${createOffersTemplate(tripOffers)}
        ${createDestinationTemplate(destinationPoint)}
      </section>
    </form>`;
};

export default class FormEditView extends AbstractStatefulView{
  #offers = null;
  #destinations = null;
  #submitHandler = null;
  #cancelHandler = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({tripPoint = BlankTripPoint, offers, destinations, onFormSubmit, onFormCancel}) {
    super();
    this._setState(tripPoint);
    this.#offers = offers;
    this.#destinations = destinations;
    this.#submitHandler = onFormSubmit;
    this.#cancelHandler = onFormCancel;
    this._restoreHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#offers, this.#destinations);
  }

  _restoreHandlers() {
    this.element.removeEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCancelForm);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCancelForm);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('#event-destination-1').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('#event-price-1').addEventListener('change', this.#onPriceChange);

    this.#setDatepicker();
  }

  reset(tripPoint) {
    this.updateElement(tripPoint);
  }

  removeElement() {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...DefaultFlatpickrConfig,
        defaultDate: this._state.dateFrom,
        maxDate: this._setState.dateTo,
        onChange: this.#onDateFromChange,
      },
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...DefaultFlatpickrConfig,
        defaultDate: this._setState.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#onDateToChange,
      },
    );
  }

  #onDateFromChange = ([date]) => {
    this.updateElement({
      dateFrom: date,
    });
  };

  #onDateToChange = ([date]) => {
    this.updateElement({
      dateTo: date,
    });
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#submitHandler(this._state);
  };

  #onCancelForm = (evt) => {
    evt.preventDefault();
    this.#cancelHandler();
  };

  #onTypeChange = (evt) => {
    const type = evt.target.value;
    if (this._state.type === type) {
      return;
    }
    this.updateElement({
      type,
      offers: [],
    });
  };

  #onDestinationChange = (evt) => {
    const destination = this.#destinations.find(({ name }) => name === evt.target.value);
    if (this._state.destination === destination.id) {
      return;
    }
    this.updateElement({
      destination: destination.id,
    });
  };

  #onPriceChange = (evt) => {
    const addedPrice = isNaN(evt.target.value) ? 0 : evt.target.value;
    this.updateElement({
      price: addedPrice,
    });
  };


}
