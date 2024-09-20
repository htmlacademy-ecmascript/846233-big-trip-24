import { BLANK_POINT, POINT_TYPES, DateFormat, ButtonType, DefaultFlatpickrConfig } from '../const/common';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { displayDateTime } from '../utils/date';
import { remove } from '../framework/render';
import { firstLetterUpperCase, getIsCheckedAttr, getIsDisabledAttr, getInteger,
  addItem, removeItem, isEmpty } from '../utils/common';
import { getDestination, getPointOffers } from '../model/utils/common';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const getTypeItemTemplate = (type, isChecked) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${getIsCheckedAttr(isChecked)}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${firstLetterUpperCase(type)}</label>
  </div>
`;

const getTypesTemplate = (type) => `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${POINT_TYPES.map((pointType) => getTypeItemTemplate(pointType, type === pointType)).join('')}
      </fieldset>
    </div>
  </div>
`;

const getPointDestination = (type, { name: destinationName = '' } = {}, destinations) => `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinations.map((destination) => `<option value="${he.encode(destination.name)}"></option>`).join('')}
    </datalist>
  </div>`;


const getTimePeriodTemplate = (dateFrom, dateTo) => `
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${displayDateTime(dateFrom, DateFormat.DATE_TIME)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">From</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${displayDateTime(dateTo, DateFormat.DATE_TIME)}">
  </div>
`;

const getPriceTemplate = (price) => `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(price.toString())}">
  </div>
`;

const getRollupButtonTemplate = (isAdding) => !isAdding
  ? `<button class="event__rollup-btn" type="button"}>
      <span class="visually-hidden">Open event</span>
    </button>`
  : '';

const getButtonsTemplate = (isAdding, isSaving, isDeleting) => {
  const saveCaption = isSaving ? ButtonType.SAVING : ButtonType.SAVE;
  const deleteCaption = isDeleting ? ButtonType.DELETING : ButtonType.DELETE;
  const resetCaption = isAdding ? ButtonType.CANCEL : deleteCaption;

  return `
    <button class="event__save-btn  btn  btn--blue" type="submit" ${getIsDisabledAttr(isSaving)}>${saveCaption}</button>
    <button class="event__reset-btn" type="reset" ${getIsDisabledAttr(isDeleting)}>${resetCaption}</button>
    ${getRollupButtonTemplate(isAdding)}`;
};

const getOfferItemTemplate = ({id, title, price, type, isSelected}) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox"
      name="event-offer-${type}" data-offer-id=${id} ${getIsCheckedAttr(isSelected)}>
    <label class="event__offer-label" for="event-offer-${type}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`;

const getOffersTemplate = (offers) => !offers.length ? '' : `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers.map((offer) => getOfferItemTemplate(offer)).join('')}
    </div>
  </section>`;

const getPhotoTapeTemplate = (pictures) => !pictures.length ? '' : `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
    </div>
  </div>`;

const getDestinationTemplate = (destination) => {
  if (!destination) {
    return '';
  }
  const { description, pictures } = destination;
  return !description && isEmpty(pictures) ? '' : `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${getPhotoTapeTemplate(pictures)}
    </section>`;
};

const getEditTemplate = (point, offers, destinations) => {
  const { type, dateFrom, dateTo, basePrice, isAdding, isSaving, isDeleting } = point;
  const destination = getDestination(destinations, point.destination);
  const { offers: pointOffers } = getPointOffers(offers, type);
  const tripOffers = pointOffers.map((offer) => ({
    ...offer,
    type: type,
    isSelected: point.offers.includes(offer.id)
  }));

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${getTypesTemplate(type)}
        ${getPointDestination(type, destination, destinations)}
        ${getTimePeriodTemplate(dateFrom, dateTo)}
        ${getPriceTemplate(basePrice)}
        ${getButtonsTemplate(isAdding, isSaving, isDeleting)}
      </header>
      <section class="event__details">
        ${getOffersTemplate(tripOffers)}
        ${getDestinationTemplate(destination)}
      </section>
    </form>
  </li>`;
};

export default class EditView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #submitButtonHandler = null;
  #deleteButtonHandler = null;
  #cancelButtonHandler = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({tripEvent = BLANK_POINT, offers, destinations, onFormSubmit, onFormDelete, onFormCancel}) {
    super();
    this._setState(EditView.parsePointToState(tripEvent));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#submitButtonHandler = onFormSubmit;
    this.#deleteButtonHandler = onFormDelete;
    this.#cancelButtonHandler = onFormCancel;

    this._restoreHandlers();
  }

  get template() {
    return getEditTemplate(this._state, this.#offers, this.#destinations);
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onResetButtonClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);

    const availableOffersElement = this.element.querySelector('.event__available-offers');
    if (availableOffersElement) {
      availableOffersElement.addEventListener('change', this.#onOffersChange);
    }
    const rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    if (rollupButtonElement) {
      rollupButtonElement.addEventListener('click', this.#onRollupButtonClick);
    }

    this.#setDatePickers({
      startTimeElement: this.element.querySelector('#event-start-time-1'),
      endTimeElement: this.element.querySelector('#event-end-time-1')
    });
  }

  reset = (point) => this.updateElement(point);
  destroy = () => remove(this);

  removeElement = () => {
    super.removeElement();
    this.#dateFromPicker.destroy();
    this.#dateToPicker.destroy();
  };

  #setDatePickers({ startTimeElement, endTimeElement }) {
    this.#dateFromPicker = flatpickr(
      startTimeElement,
      {
        ...DefaultFlatpickrConfig,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onClose: this.#onDateFromChange,
      },
    );

    this.#dateToPicker = flatpickr(
      endTimeElement,
      {
        ...DefaultFlatpickrConfig,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#onDateToChange,
      },
    );
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#submitButtonHandler(EditView.parseStateToPoint(this._state));
  };

  #onDeleteForm = (evt) => {
    evt.preventDefault();
    this.#deleteButtonHandler(EditView.parseStateToPoint(this._state));
  };

  #onCancelForm = (evt) => {
    evt.preventDefault();
    this.#cancelButtonHandler();
  };

  #onRollupButtonClick = (evt) => this.#onCancelForm(evt);
  #onResetButtonClick = (evt) => this._state.isAdding ? this.#onCancelForm(evt) : this.#onDeleteForm(evt);

  #onTypeChange = (evt) => {
    const type = evt.target.value;
    if (this._state.type === type) {
      return;
    }
    this.updateElement({ type, offers: [] });
  };

  #onDestinationChange = (evt) => {
    const destination = this.#destinations.find(({ name }) => name === evt.target.value);
    if (!destination || this._state.destination === destination.id) {
      return;
    }
    this.updateElement({ destination: destination.id });
  };

  #onPriceInput = (evt) => {
    evt.target.value = getInteger(evt.target.value);
  };

  #onPriceChange = (evt) => this._setState({ basePrice: getInteger(evt.target.value) });
  #onDateFromChange = ([dateFrom]) => this.updateElement({ dateFrom });
  #onDateToChange = ([dateTo]) => this.updateElement({ dateTo });


  #onOffersChange = (evt) => {
    const { dataset: { offerId }, checked } = evt.target;
    const offers = checked
      ? addItem(this._state.offers, offerId)
      : removeItem(this._state.offers, offerId);

    this._setState({ offers });
  };

  static parsePointToState = (point) => ({
    ...point,
    isAdding: !point.id,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    delete point.isAdding;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  };
}
