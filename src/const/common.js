const ONE_MINUTE_IN_MS = 60000;
const DEFAULT_POINT_TYPE = 'flight';
const DEFAULT_FILTER = 'everything';
const DEFAULT_SORT_TYPE = 'day';

const BLANK_POINT = {
  type: DEFAULT_POINT_TYPE,
  dateFrom: new Date(),
  dateTo: new Date(Date.now() + ONE_MINUTE_IN_MS),
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

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offers'
};

const SortInputTypes = [
  { type: SortTypes.DAY, sortable: true },
  { type: SortTypes.EVENT, sortable: false },
  { type: SortTypes.TIME, sortable: true },
  { type: SortTypes.PRICE, sortable: true },
  { type: SortTypes.OFFER, sortable: false },
];

const Filters = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const DateFormats = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM D',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATE_TIME_SYSTEM: 'YYYY-MM-DDTHH:mm',
  DATE_TIME: 'DD/MM/YY HH:mm',
  FLATPICKR: 'd/m/y H:i',
  DAY: 'DD[d] HH[h] mm[m]',
  HOUR: 'HH[h] mm[m]',
  MINUTE: 'mm[m]',
};

const ButtonTypes = {
  SAVE: 'Save',
  SAVING: 'Saving...',
  DELETE: 'Delete',
  DELETING: 'Deleting...',
  CANCEL: 'Cancel',
};

const DefaultFlatpickrConfig = {
  dateFormat: DateFormats.FLATPICKR,
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

const Messages = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information'
};

const Prefix = {
  FILTER: 'filter-',
  SORT: 'sort-'
};


export {
  BLANK_POINT,
  POINT_TYPES,
  DEFAULT_FILTER,
  DEFAULT_SORT_TYPE,
  SortTypes,
  SortInputTypes,
  Filters,
  DateFormats,
  ButtonTypes,
  DefaultFlatpickrConfig,
  UserAction,
  UpdateType,
  FormMode,
  Messages,
  Prefix
};
