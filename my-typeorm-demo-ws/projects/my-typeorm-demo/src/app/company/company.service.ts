import {Injectable} from '@angular/core';
import {CrudBaseService} from '../general/crud-base.service';
import {CompanyDto} from 'my-typeorm-demo-lib';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends CrudBaseService<CompanyDto, number> {
  constructor() {
    super('/company');
  }
}

