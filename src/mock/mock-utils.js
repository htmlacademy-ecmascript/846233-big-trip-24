import dayjs from 'dayjs';

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
  getRandomArrayElement,
  getRandomBoolean,
  getRandomInt,
  getID,
  getDateWithRandomTime
};
