import {Injectable} from '@angular/core';
import {Person} from 'my-typeorm-demo-lib';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_CONTEXT_PATH} from '../general/app.constants';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(SERVER_API_CONTEXT_PATH + '/person-dm');
  }
}
