import {Injectable} from '@angular/core';
import {Company} from '@app/client-lib';
import {CrudServiceBase} from '../core/service/crud-service.base';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends CrudServiceBase<Company, number> {
  constructor() {
    super('/company');
  }
}

