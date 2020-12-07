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
  get(id: number): Observable<Person> {
    return this.http.get<Person>(SERVER_API_CONTEXT_PATH + '/person-dm/' + id);
  }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(SERVER_API_CONTEXT_PATH + '/person-dm');
  }

  create(person: Person): Observable<Person> {
    return this.http.post<Person>(SERVER_API_CONTEXT_PATH + '/person-dm', person);
  }

  save(person: Person): Observable<Person> {
    return this.http.put<Person>(SERVER_API_CONTEXT_PATH + '/person-dm', person);
  }
}
