import { UpdateType } from '../const.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #model = null;
  #container = null;
  #infoView = null;

  constructor ({ container, model }) {
    this.#container = container;
    this.#model = model;

    this.#model.addObserver(this.#onModelChange);
  }

  init() {
    this.#renderSum(this.#model);
  }

  #renderSum({ info }) {
    this.#infoView = new InfoView({ info, container: this.#container });
  }

  #onModelChange = (updateType) => {
    if (updateType !== UpdateType.MAJOR) {
      return;
    }
    if (this.#infoView) {
      this.#infoView.destroy();
    }
    this.init();
  };
}
