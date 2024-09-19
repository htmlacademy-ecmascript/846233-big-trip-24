import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DateFormats } from '../../const.js';


dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const getDateDiff = ({ dateFrom, dateTo }) => dayjs(dateTo).diff(dateFrom);

const calculateDuration = (dateFrom, dateTo) => {
  const dateDelta = dayjs.duration(getDateDiff({ dateFrom, dateTo}));
  if (dateDelta.days()) {
    return dateDelta.format(DateFormats.DAY);
  }

  if (dateDelta.hours()) {
    return dateDelta.format(DateFormats.HOURS);
  }

  return dateDelta.format(DateFormats.MINUTES);
};

const isDatesEqual = (dateA, dateB) => ((dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D'));

const displayDateMonth = (date) => date ? dayjs(date).format(DateFormats.MONTH_DAY) : '';
const displayDate = (date) => date ? dayjs(date).format(DateFormats.DATE) : '';
const displayTime = (time) => time ? dayjs(time).format(DateFormats.TIME) : '';
const displayDateTime = (date, dateFormat = DateFormats.DATE_TIME_SYSTEM) => date ? dayjs(date).format(dateFormat) : '';


export {
  calculateDuration,
  displayDate,
  displayDateMonth,
  displayTime,
  displayDateTime,
  getDateDiff,
  isDatesEqual
};
