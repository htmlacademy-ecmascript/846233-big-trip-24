import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DateFormats } from './consts.js';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const calculateDuration = (dateFrom, dateTo) => {
  const dateDelta = dayjs.duration(dayjs(dateTo).diff(dateFrom));
  if (dateDelta.days()) {
    return dateDelta.format(DateFormats.DAY);
  }

  if (dateDelta.hours()) {
    return dateDelta.format(DateFormats.HOURS);
  }

  return dateDelta.format(DateFormats.MINUTES);
};

const displayDateMonth = (date) => date ? dayjs(date).format(DateFormats.DATE_MONTH) : '';
const displayDate = (date) => date ? dayjs(date).format(DateFormats.DATE) : '';
const displayTime = (time) => time ? dayjs(time).format(DateFormats.TIME) : '';
const displayDateTime = (date, dateFormat = DateFormats.DATE_TIME_SYSTEM) => date ? dayjs(date).format(dateFormat) : '';

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomBoolean = () => Math.random() < 0.5;
const getRandomInt = (max) => Math.round(Math.random() * max);
const getID = () => {
  let count = 1;

  return () => {
    count++;
    return count;
  };
};
const getDateWithRandomTime = (date) => dayjs(date).add(getRandomInt(500), 'minute');


export {
  calculateDuration,
  displayDate,
  displayDateMonth,
  displayTime,
  displayDateTime,
  getRandomArrayElement,
  getRandomBoolean,
  getRandomInt,
  getID,
  getDateWithRandomTime,
  isEscapeKey
};
