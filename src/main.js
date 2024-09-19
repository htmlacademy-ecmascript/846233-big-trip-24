import FilterPresenter from './presenter/filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import PointModel from './model/point-model.js';


const run = () => {
  const pointsElement = document.querySelector('.trip-events');
  const filtersElement = document.querySelector('.trip-controls__filters');
  const headerMainElement = document.querySelector('.trip-main');
  const addButtonElement = document.querySelector('.trip-main__event-add-btn');

  const pointModel = new PointModel();

  new InfoPresenter({ container: headerMainElement, model: pointModel });
  new FilterPresenter({ container: filtersElement, model: pointModel });
  new MainPresenter({ container: pointsElement, model: pointModel, addButton: addButtonElement });

  pointModel.init();
};

run();
