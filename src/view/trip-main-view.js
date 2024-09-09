import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES } from '../const.js';

const createFilterItemTemplate = (type) => {
  const lowerType = type.toLowerCase();
  return `
    <div class="trip-filters__filter">
      <input id="filter-${lowerType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${lowerType}" checked>
      <label class="trip-filters__filter-label" for="filter-${lowerType}">${type}</label>
    </div>`;
};

const createFilterTemplate = () => `
<form class="trip-filters" action="#" method="get">
  ${FILTER_TYPES.map((type) => createFilterItemTemplate(type)).join('')}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>
`;

export default class TripMainView extends AbstractView{
  get template() {
    return createFilterTemplate();
  }
}
