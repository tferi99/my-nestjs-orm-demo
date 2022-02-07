import {Injectable} from '@angular/core';
import {CrudBaseService} from '../common/crud-base.service';
import {Person} from '@app/my-ts-orm-demo-lib';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CrudBaseService<Person, number> {
  constructor() {
    super('/person');
  }
}

