import {Injectable} from '@angular/core';
import {CrudBaseService} from '../common/crud-base.service';
import {CompanyDto} from 'my-ts-orm-demo-lib';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends CrudBaseService<CompanyDto, number> {
  constructor() {
    super('/company');
  }
}

