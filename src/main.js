import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import PointModel from './model/point-model.js';

const run = () => {
  const eventsElement = document.querySelector('.trip-events');
  const filtersElement = document.querySelector('.trip-controls__filters');
  const headerMainElement = document.querySelector('.trip-main');

  const pointModel = new PointModel();

  const headerPresenter = new HeaderPresenter({ filterContainer: filtersElement, infoContainer: headerMainElement });
  const mainPresenter = new MainPresenter({ container: eventsElement, model: pointModel });

  headerPresenter.init();
  mainPresenter.init();
};

run();
