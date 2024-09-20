import ApiService from './framework/api-service.js';
import { ApiMethod, ApiRoute } from './const/api.js';
import { toCamelCaseKeys, toSnakeCaseKeys } from './utils/api.js';

export default class TripApiService extends ApiService {
  getPoints = async () => ApiService.parseResponse(
    await this._load({ url: ApiRoute.POINTS, method: ApiMethod.GET })
  );

  addPoint = async (point) => {
    const response = await this._load({
      url: ApiRoute.POINTS,
      method: ApiMethod.POST,
      body: TripApiService.adaptToServer(point),
      headers: this.#getHeader()
    });
    return TripApiService.adaptToClient(await ApiService.parseResponse(response));
  };

  updatePoint = async (point) => {
    const response = await this._load({
      url: this.#getRoutePointId(point),
      method: ApiMethod.PUT,
      body: TripApiService.adaptToServer(point),
      headers: this.#getHeader()
    });
    return TripApiService.adaptToClient(await ApiService.parseResponse(response));
  };

  deletePoint = async (point) => await this._load({ url: this.#getRoutePointId(point), method: ApiMethod.DELETE });

  getOffers = async () => ApiService.parseResponse(
    await this._load({ url: ApiRoute.OFFERS, method: ApiMethod.GET })
  );

  getDestinations = async () => ApiService.parseResponse(
    await this._load({ url: ApiRoute.DESTINATIONS, method: ApiMethod.GET })
  );

  #getRoutePointId = ({ id }) => `${ApiRoute.POINTS}/${id}`;
  #getHeader = () => new Headers({'Content-Type': 'application/json'});

  static adaptToServer = (point) => JSON.stringify(toSnakeCaseKeys(point));

  static adaptToClient = (point) => {
    const { dateFrom, dateTo, ...rest } = toCamelCaseKeys(point);
    return {
      ...rest,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
    };
  };
}
