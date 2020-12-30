import {Injectable} from '@angular/core';
import {PersonDto} from 'my-typeorm-demo-lib';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_CONTEXT_PATH} from '../general/app.constants';
import {CrudBaseService} from '../general/crud-base.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CrudBaseService<PersonDto, number> {
  constructor() {
    super('/person');
  }
}

