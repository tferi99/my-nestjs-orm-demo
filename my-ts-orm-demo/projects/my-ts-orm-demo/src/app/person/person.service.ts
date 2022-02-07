import {Injectable} from '@angular/core';
import {Person} from '@app/my-ts-orm-demo-lib';
import {CrudServiceBase} from '../core/service/crud-service.base';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CrudServiceBase<Person, number> {
  constructor() {
    super('/person');
  }
}

