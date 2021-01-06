import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PersonService} from './person.service';
import {PersonDto} from 'my-ts-orm-demo-lib';

@Injectable({
  providedIn: 'root'
})
export class PersonsResolverService implements Resolve<PersonDto[]> {
  constructor(
    private personService: PersonService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonDto[]> {
    return this.personService.getAll();
  }
}
