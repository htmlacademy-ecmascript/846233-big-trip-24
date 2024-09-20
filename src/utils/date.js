import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { DateFormats } from '../const/common.js';

dayjs.extend(duration);

const getDateDiff = ({ dateFrom, dateTo }) => dayjs(dateTo).diff(dateFrom);

const displayDuration = (dateFrom, dateTo) => {
  const dateDelta = dayjs.duration(getDateDiff({ dateFrom, dateTo }));
  if (dateDelta.days()) {
    return dateDelta.format(DateFormats.DAY);
  }

  if (dateDelta.hours()) {
    return dateDelta.format(DateFormats.HOUR);
  }

  return dateDelta.format(DateFormats.MINUTE);
};

const isDatesEqual = (dateA, dateB) => ((dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D'));

const displayDateMonth = (date) => date ? dayjs(date).format(DateFormats.MONTH_DAY) : '';
const displayDate = (date) => date ? dayjs(date).format(DateFormats.DATE) : '';
const displayTime = (time) => time ? dayjs(time).format(DateFormats.TIME) : '';
const displayDateTime = (date, dateFormat = DateFormats.DATE_TIME_SYSTEM) => date ? dayjs(date).format(dateFormat) : '';

export { getDateDiff, isDatesEqual, displayDuration, displayDate, displayDateMonth, displayTime, displayDateTime };
