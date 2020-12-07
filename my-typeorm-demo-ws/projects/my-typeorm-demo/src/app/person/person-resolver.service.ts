import {Injectable} from '@angular/core';
import {EmployeeType, Person} from 'my-typeorm-demo-lib';
import {Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {delay} from 'rxjs/operators';
import {PersonService} from './person.service';

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
/*    const persons: Person[] = [
      {
        id: 0,
        name: 'Dummy',
        birth: new Date(),
        email: 'a@b.c',
        employeeType: EmployeeType.MANAGER,
        rank: 3,
        active: true
      }
    ];
    return of(persons).pipe(
      delay(1000)
    );*/
  }
}
