const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const CITIES = ['Moscow', 'Tokio', 'London', 'Paris', 'Roma'];
const DEFAULT_POINT_TYPE = 'Flight';
const FILTER_TYPES = ['Everything', 'Future', 'Present', 'Past'];
const SORT_TYPES = ['Day', 'Event', 'Time', 'Price', 'Offers'];
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

const BLANK_TRIP_POINT = {
  type: DEFAULT_POINT_TYPE,
  dateFrom: new Date(),
  dateTo: null,
  destination: null,
  price: 0,
  offers: [],
  isFavorite: false,
};

const DateFormats = {
  DATE_MONTH: 'MMM D',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATE_TIME_SYSTEM: 'YYYY-MM-DDTHH:mm',
  DATE_TIME: 'YY/MM/DD HH:mm',
  DAY: 'DD[d] HH[h] mm[m]',
  HOURS: 'HH[h] mm[m]',
  MINUTES: 'mm[m]'
};

export {
  BLANK_TRIP_POINT,
  POINT_TYPES,
  CITIES,
  DateFormats,
  FILTER_TYPES,
  DEFAULT_POINT_TYPE,
  SORT_TYPES,
  SELECTED_OFFERS_LIMIT,
  SOME_PICTURES_LIMIT,
  POINT_COUNT,
  MESSAGES,
  OFFERS,
  DESCRIPTIONS
};

