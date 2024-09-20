import PointsPresenter from './presenter/points-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointModel from './model/point-model';
import InfoPresenter from './presenter/info-presenter';

const run = async () => {
  const eventsElement = document.querySelector('.trip-events');
  const filtersElement = document.querySelector('.trip-controls__filters');
  const mainElement = document.querySelector('.trip-main');
  const addButtonElement = document.querySelector('.trip-main__event-add-btn');

  const pointModel = new PointModel();

  new InfoPresenter({ container: mainElement, model: pointModel });
  new FilterPresenter({ container: filtersElement, model: pointModel });
  new PointsPresenter({ container: eventsElement, model: pointModel, addButton: addButtonElement });

  await pointModel.init();
};

run();
