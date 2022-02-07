import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PersonService} from './person.service';
import {PersonDto} from '../../../../my-ts-orm-demo-lib/src/lib/my-ts-orm-demo-lib.model';
import {Person} from '@app/my-ts-orm-demo-lib';

@Injectable({
  providedIn: 'root'
})
export class PersonsResolverService implements Resolve<Person[]> {
  constructor(
    private personService: PersonService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person[]> {
    return this.personService.getAll();
  }
}
