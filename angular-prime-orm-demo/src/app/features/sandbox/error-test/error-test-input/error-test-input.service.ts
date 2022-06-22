import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorTestInputService {
  constructor(private http: HttpClient){}

  searchBadCatch(terms: Observable<KeyboardEvent>) {
    return terms.pipe(
      map(event => event.target!.),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchStarWarsNames(term)),
      catchError(error => {
        console.log("Caught search error the wrong way!");
        return of({ results: null });
      })
    );
  }

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.searchStarWarsNames(term).pipe(
          catchError(error => {
            console.log("Caught search error the right way!");
            return of({ results: null });
          })
        )
      )
    );
  }

  private searchStarWarsNames(term: string) {
    let url = `https://swapi.co/api/people/?search=${term}`;
    if (term === "error") {
      url = `https://swapi.co/apix/people/?search=${term}`;
    }

    return this.http.get<any>(url);
  }
}
