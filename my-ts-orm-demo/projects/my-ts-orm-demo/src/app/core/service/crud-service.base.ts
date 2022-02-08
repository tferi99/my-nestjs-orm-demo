import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServiceBase} from './service.base';

export abstract class CrudServiceBase<T, IDT> extends ServiceBase {
  constructor(
    apiBasePath: string,
  ) {
    super(apiBasePath);
  }

  get(id: IDT, populated?: boolean): Observable<T> {
    if (populated === undefined) {
      populated = false;
    }
    const params = new HttpParams().set('populated', populated);
    return this.getHttpClient().get<T>(this.getBasePath() + '/' + id, {params});
  }

  getAll(populated?: boolean): Observable<T[]> {
    if (populated === undefined) {
      populated = false;
    }
    const params = new HttpParams().set('populated', populated);
    return this.getHttpClient().get<T[]>(this.getBasePath(), {params});
  }

  create(dto: T): Observable<T> {
    return this.getHttpClient().post<T>(this.getBasePath(), dto);
  }

  save(id: IDT, dto: T): Observable<T> {
    return this.getHttpClient().put<T>(this.getBasePath() + '/' + id, dto);
  }

  delete(id: IDT): Observable<any> {
    return this.getHttpClient().delete<IDT>(this.getBasePath() + '/' + id);
  }
}
