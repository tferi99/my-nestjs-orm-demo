import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PersonDto} from 'my-typeorm-demo-lib';
import {SERVER_API_CONTEXT_PATH} from './app.constants';
import {Injector} from '@angular/core';
import {AppInjector} from './app-injector';

export class CrudBaseService<T, IDT> {
  apiBasePath: string;
  http: HttpClient;

  constructor(
    apiBasePath: string,
  ) {
    this.apiBasePath = apiBasePath;

    const injector = AppInjector.getInjector();
    this.http = injector.get(HttpClient);
  }

  get(id: IDT): Observable<T> {
    return this.http.get<T>(SERVER_API_CONTEXT_PATH + this.apiBasePath + '/' + id);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(SERVER_API_CONTEXT_PATH + this.apiBasePath);
  }

  create(dto: T): Observable<T> {
    return this.http.post<T>(SERVER_API_CONTEXT_PATH + this.apiBasePath, dto);
  }

  save(dto: T): Observable<T> {
    return this.http.put<T>(SERVER_API_CONTEXT_PATH + this.apiBasePath, dto);
  }

  delete(id: IDT): Observable<any> {
    return this.http.delete<IDT>(SERVER_API_CONTEXT_PATH + this.apiBasePath + '/' + id);
  }
}
