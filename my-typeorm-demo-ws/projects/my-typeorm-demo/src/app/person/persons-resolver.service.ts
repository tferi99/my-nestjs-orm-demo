import {Injectable} from '@angular/core';
import {Person} from 'my-typeorm-demo-lib';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PersonService} from './person.service';

@Injectable({
    providedIn: 'root'
})
export class PersonsResolverService implements Resolve<Person[]> {
  constructor(
    private personService: PersonService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person[]> {
    return this.personService.getAll();
  }

}
