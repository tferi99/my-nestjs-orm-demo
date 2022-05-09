import {HttpClient} from "@angular/common/http";
import {AppInjector} from "../util/app-injector";
import { SERVER_API_CONTEXT_PATH } from '../core.constants';

export class ServiceBase {
  protected apiBasePath: string;
  protected _http: HttpClient;

  constructor(
    http: HttpClient,
    apiBasePath: string,
  ) {
    this._http = http;
    this.apiBasePath = apiBasePath;
  }

/*  protected getHttpClient(): HttpClient {
    if (!this.http) {
      const injector = AppInjector.getInjector();
      if (!injector) {
        throw new Error('AppInjector is null!');
      }
      this.http = injector.get(HttpClient);
    }
    return this.http;
  }*/

  protected getBasePath(): string {
    return SERVER_API_CONTEXT_PATH + this.apiBasePath;
  }
}
