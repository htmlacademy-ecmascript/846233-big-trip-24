import InfoView from '../view/info-view';

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
    this.#renderSummary(this.#model);
  }

  #renderSummary({ info }) {
    this.#infoView = new InfoView({ info, container: this.#container });
  }

  #onModelChange = () => {
    if (this.#infoView) {
      this.#infoView.destroy();
    }
    this.init();
  };
}
