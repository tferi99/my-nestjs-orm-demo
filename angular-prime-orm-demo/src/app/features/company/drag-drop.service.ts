import { NGXLogger } from 'ngx-logger';
import { CompanyDataService } from './store/company-data.service';
import { PersonDataService } from '../person/store/person-data.service';
import { Company, Person } from '@app/client-lib';
import { Injectable } from '@angular/core';
import { DragDropAction, DragDropServiceBase } from './drag-drop-service.base';


@Injectable({
  providedIn: 'root'
})
export class DragDropService extends DragDropServiceBase<Person | Company> {
  constructor(
    private logger: NGXLogger,
    private companyDataService: CompanyDataService,
    private personDataService: PersonDataService
  ) {
    super(logger)
  }

  handleDrop(action: DragDropAction, obj: Person | Company): void {
    console.log('handleDrop: ' + action, obj);
  }
}
