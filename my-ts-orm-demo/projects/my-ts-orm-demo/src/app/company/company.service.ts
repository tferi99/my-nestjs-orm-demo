import {Injectable} from '@angular/core';
import {CrudBaseService} from '../common/crud-base.service';
import {Company} from '@app/my-ts-orm-demo-lib';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends CrudBaseService<Company, number> {
  constructor() {
    super('/company');
  }
}

