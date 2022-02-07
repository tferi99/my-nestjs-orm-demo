import {HttpClient} from '@angular/common/http';
import {AppInjector} from '../util/app-injector';
import {SERVER_API_CONTEXT_PATH} from '../../app.constants';

export class ServiceBase {
  apiBasePath: string;
  http?: HttpClient;

  constructor(
    apiBasePath: string,
  ) {
    this.apiBasePath = apiBasePath;
  }

  protected getHttpClient(): HttpClient {
    if (!this.http) {
      const injector = AppInjector.getInjector();
      if (!injector) {
        throw new Error('Injector is null!');
      }
      this.http = injector.get(HttpClient);
    }
    return this.http;
  }

  protected getBasePath(): string {
    return SERVER_API_CONTEXT_PATH + this.apiBasePath;
  }
}
