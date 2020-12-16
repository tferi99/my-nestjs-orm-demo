import {Injectable} from '@angular/core';
import {PersonDto} from 'my-typeorm-demo-lib';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PersonService} from './person.service';

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
