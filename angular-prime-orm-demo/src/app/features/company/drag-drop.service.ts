import { NGXLogger } from 'ngx-logger';
import { CompanyDataService } from './store/company-data.service';
import { PersonDataService } from '../person/store/person-data.service';
import { Company, Person } from '@app/client-lib';
import { Injectable } from '@angular/core';
import { DragDropAction, DragDropServiceBase } from './drag-drop-service.base';
import { COMPANY_ID_UNEMPLOYED } from './company.constants';


@Injectable({
  providedIn: 'root'
})
export class DragDropService extends DragDropServiceBase<Person | Company> {
  constructor(
    private logger: NGXLogger,
    private companyDataService: CompanyDataService,
    private personDataService: PersonDataService
  ) {
    super(logger, true);
  }

  handleDrop(type: string, action: DragDropAction, data: Person | Company, dragZoneId?: string, dropZoneId?: string): void {
    console.log(`handleDrop[${type}|${action}]: ${dragZoneId} => ${dropZoneId}`, data);

    if (type === 'person') {
      const d: Person = data as Person;
      this.handleDropPerson(action, d, dragZoneId, dropZoneId);
    }
  }

  private handleDropPerson(action: DragDropAction, data: Person, dragZoneId?: string, dropZoneId?: string): void {
    const person: Person = {...data};
    console.log(`>>>>>>>>>> handleDropPerson: ${action} ${dragZoneId} => ${dropZoneId}`, person);
    if (action === DragDropAction.Move) {
      const targetCompanyId: number = Number(dropZoneId);
      if (targetCompanyId === COMPANY_ID_UNEMPLOYED) {
        // @ts-ignore
        person.company = null;
      } else {
        // @ts-ignore
        person.company = targetCompanyId;
      }
      this.personDataService.update(person).subscribe();
    } else if (action === DragDropAction.Delete) {
      this.personDataService.delete(person).subscribe();
    }
  }
}
