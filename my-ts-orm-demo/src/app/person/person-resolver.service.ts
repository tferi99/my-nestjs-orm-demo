import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PersonService} from './person.service';
import {Person} from '@app/client-lib';

@Injectable({
  providedIn: 'root'
})
export class PersonResolverService implements Resolve<Person> {
  constructor(
    private personService: PersonService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person> {
    const id = route.params.id;
    console.log('PersonResolverService id:' + id);
    return this.personService.get(id);
  }
}
