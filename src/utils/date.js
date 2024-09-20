import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { DateFormat } from '../const/common';

dayjs.extend(duration);

const getDateDiff = ({ dateFrom, dateTo }) => dayjs(dateTo).diff(dateFrom);

const displayDuration = (dateFrom, dateTo) => {
  const dateDiff = dayjs.duration(getDateDiff({ dateFrom, dateTo }));

  if (dateDiff.days()) {
    const diffInDays = dayjs(dateTo).diff(dateFrom, 'day').toString().padStart(2, '0');
    return `${diffInDays}D ${dateDiff.format(DateFormat.HOUR)}`;
  }
  if (dateDiff.hours()) {
    return dateDiff.format(DateFormat.HOUR);
  }
  return dateDiff.format(DateFormat.MINUTE);
};

const displayDateMonth = (date) => date ? dayjs(date).format(DateFormat.MONTH_DAY) : '';
const displayDate = (date) => date ? dayjs(date).format(DateFormat.DATE) : '';
const displayTime = (time) => time ? dayjs(time).format(DateFormat.TIME) : '';
const displayDateTime = (date, dateFormat = DateFormat.DATE_TIME_SYSTEM) => date ? dayjs(date).format(dateFormat) : '';

export { getDateDiff, displayDuration, displayDate, displayDateMonth, displayTime, displayDateTime };
