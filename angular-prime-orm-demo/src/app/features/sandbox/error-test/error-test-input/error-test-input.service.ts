import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { LoginResult } from '../../../../auth/model/login-result';
import { ServiceBase } from '../../../../core/service/service.base';

@Injectable({
  providedIn: 'root'
})
export class ErrorTestInputService extends ServiceBase {
  constructor(private http: HttpClient) {
    super(http, '/company');
  }

  searchBadCatch(terms: Observable<KeyboardEvent>) {
    return terms.pipe(
      map(event => (event.target as HTMLInputElement).value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchCompany(term)),
      catchError(error => {
        console.log("Caught search error the wrong way!");
        return of({ results: null });
      })
    );
  }

  search(terms: Observable<KeyboardEvent>) {
    return terms.pipe(
      map(event => (event.target as HTMLInputElement).value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.searchCompany(term).pipe(
          catchError(error => {
            console.log("Caught search error the right way!");
            return of({ results: null });
          })
        )
      )
    );
  }

  private searchCompany(term: string) {
    let url = `https://swapi.co/api/people/?search=${term}`;
    if (term === "error") {
      url = `https://swapi.co/apix/people/?search=${term}`;
    }

    return this.http.post<Company>(this.getBasePath() + '/login', { username, password }).pipe(
      delay(1000)
    );

    return this.http.get<any>(url);
  }
}
