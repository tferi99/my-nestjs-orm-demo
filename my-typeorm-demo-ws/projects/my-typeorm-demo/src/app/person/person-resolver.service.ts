import {Injectable} from '@angular/core';
import {EmployeeType, PersonDto} from 'my-typeorm-demo-lib';
import {Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {delay} from 'rxjs/operators';
import {PersonService} from './person.service';

@Injectable({
  providedIn: 'root'
})
export class PersonResolverService implements Resolve<PersonDto> {
  constructor(
    private personService: PersonService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonDto> {
    const id = route.params.id;
    console.log('PersonResolverService id:' + id);
    return this.personService.get(id);
  }
}
