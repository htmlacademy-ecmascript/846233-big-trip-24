const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Moscow', 'Tokio', 'London', 'Paris', 'Roma'];
const DEFAULT_POINT_TYPE = 'Flight';
const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const OFFERS = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'];
const SELECTED_OFFERS_LIMIT = 3;
const SOME_PICTURES_LIMIT = 3;
const POINT_COUNT = 4;
const MESSAGES = [
  '«There are no past events now»',
  '«Failed to load latest route information»',
  '«Loading...»'
];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

const BlankTripPoint = {
  type: DEFAULT_POINT_TYPE,
  dateFrom: new Date(),
  dateTo: null,
  destination: null,
  price: 0,
  offers: [],
  isFavorite: false,
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const DestinationEmptyMassages = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no past events now',
  [FilterType.PAST]: 'There are no past events now',
};

const DateFormats = {
  DATE: 'YYYY-MM-DD',
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM D',
  TIME: 'HH:mm',
  DATE_TIME_SYSTEM: 'YYYY-MM-DDTHH:mm',
  DATE_TIME: 'DD/MM/YY HH:mm',
  DAY: 'DD[d] HH[h] mm[m]',
  HOURS: 'HH[h] mm[m]',
  MINUTES: 'mm[m]',
  FLATPICKR: 'd/m/y H:i',
};

const DefaultFlatpickrConfig = {
  dateFormat: DateFormats.FLATPICKR,
  enableTime: true,
};

const Mode = {
  VIEW: 'View',
  EDIT: 'Edit',
};

const ButtonTypes = {
  SAVE: 'Save',
  SAVING: 'Saving',
  DELETE: 'Delete',
  DELETING: 'Deleting',
  CANCEL: 'Cancel',
};

export {
  BlankTripPoint,
  DateFormats,
  FilterType,
  SortTypes,
  DestinationEmptyMassages,
  Mode,
  ButtonTypes,
  DefaultFlatpickrConfig,
  POINT_TYPES,
  CITIES,
  FILTER_TYPES,
  DEFAULT_POINT_TYPE,
  SELECTED_OFFERS_LIMIT,
  SOME_PICTURES_LIMIT,
  POINT_COUNT,
  MESSAGES,
  OFFERS,
  DESCRIPTIONS
};

