import {Injectable} from '@angular/core';
import {CrudBaseService} from '../common/crud-base.service';
import {PersonDto} from 'my-ts-orm-demo-lib';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CrudBaseService<PersonDto, number> {
  constructor() {
    super('/person');
  }
}

