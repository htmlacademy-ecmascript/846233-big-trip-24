const DEFAULT_POINT_TYPE = 'flight';
const DEFAULT_FILTER = 'everything';
const DEFAULT_SORT_TYPE = 'day';

const BLANK_POINT = {
  type: DEFAULT_POINT_TYPE,
  dateFrom: '',
  dateTo: '',
  destination: '',
  basePrice: 0,
  offers: [],
  isFavorite: false,
};

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offers'
};

const SortInputTypes = [
  { type: SortType.DAY, sortable: true },
  { type: SortType.EVENT, sortable: false },
  { type: SortType.TIME, sortable: true },
  { type: SortType.PRICE, sortable: true },
  { type: SortType.OFFER, sortable: false },
];

const Filter = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const TripEmptyMessage = {
  [Filter.EVERYTHING]: 'Click New Event to create your first point',
  [Filter.FUTURE]: 'There are no future events now',
  [Filter.PRESENT]: 'There are no present events now',
  [Filter.PAST]: 'There are no past events now',
};

const DateFormat = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM D',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATE_TIME_SYSTEM: 'YYYY-MM-DDTHH:mm',
  DATE_TIME: 'DD/MM/YY HH:mm',
  FLATPICKR: 'd/m/y H:i',
  HOUR: 'HH[h] mm[m]',
  MINUTE: 'mm[m]',
};

const ButtonType = {
  SAVE: 'Save',
  SAVING: 'Saving...',
  DELETE: 'Delete',
  DELETING: 'Deleting...',
  CANCEL: 'Cancel',
};

const DefaultFlatpickrConfig = {
  dateFormat: DateFormat.FLATPICKR,
  enableTime: true,
};

const UserAction = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  SORT: 'SORT',
  FILTER: 'FILTER',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  ERROR: 'ERROR',
  INIT: 'INIT',
};

const FormMode = {
  VIEW: 'View',
  EDIT: 'Edit',
};

const Message = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information'
};

const Prefix = {
  FILTER: 'filter-',
  SORT: 'sort-'
};

const UiBlockerConfig = {
  lowerLimit: 350,
  upperLimit: 1000
};


export {
  BLANK_POINT,
  POINT_TYPES,
  DEFAULT_FILTER,
  DEFAULT_SORT_TYPE,
  SortType,
  SortInputTypes,
  Filter,
  TripEmptyMessage,
  DateFormat,
  ButtonType,
  DefaultFlatpickrConfig,
  UserAction,
  UpdateType,
  FormMode,
  Message,
  Prefix,
  UiBlockerConfig
};
