import { getRandomArrayElement, getID, getRandomInt, getRandomBoolean, getDateWithRandomTime } from '../utils.js';
import { POINT_COUNT, POINT_TYPES } from '../consts.js';
import { getRandomDestination } from './destination.js';


const pointID = getID();

const createMockPoint = () => {
  const { id: destinationId } = getRandomDestination();
  const dateStart = getDateWithRandomTime();
  const dateEnd = getDateWithRandomTime(dateStart);

  return {
    id: pointID(),
    type: getRandomArrayElement(POINT_TYPES),
    dateFrom: dateStart,
    dateTo: dateEnd,
    destination: destinationId,
    price: getRandomInt(2000),
    isFavorite: getRandomBoolean(),
  };
};

const getMockedPoints = () => Array.from({ length: POINT_COUNT}, createMockPoint);


export { getMockedPoints };


