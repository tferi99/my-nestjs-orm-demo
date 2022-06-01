import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {DragDropServiceBase} from '../../../core/drag-and-drop/drag-drop-service-base';
import {PersonDataService} from '../../person/store/person-data.service';
import {Company, Person} from '@app/client-lib';
import {COMPANY_ID_RUBBISH_BIN, COMPANY_ID_UNEMPLOYED} from '../company.constants';
import {DragDropAction, DragDropState} from '../../../core/drag-and-drop/drag-drop.model';
import {CompanyDataService} from '../store/company-data.service';

/**
 * This is a drag-and-drop handler and consumer service, too.
 */
@Injectable({
  providedIn: 'root'
})
export class DragDropService extends DragDropServiceBase {
  constructor(
    private logger: NGXLogger,
    private companyDataService: CompanyDataService,
    private personDataService: PersonDataService
  ) {
    super(logger);
    this.tracing = true;
    this.emitter.subscribe(
      action => {
        logger.log('>>>>>>>>>>>>>>>>>>>> DRAG-DROP - [ACTION]:', action);
        if (action.type === 'person') {
          this.handleDropPerson(action);
        } else if (action.type === 'company') {
          this.handleDropCompany(action);
        }
      }
    );
  }

  private handleDropCompany(action: DragDropAction): void {
    const company: Company = action.draggedData;
    if (action.state === DragDropState.DroppedToRubbish) {
      this.companyDataService.delete(company).subscribe();
    }
  }

  private handleDropPerson(action: DragDropAction): void {
    console.log(`>>>>>>>>>> handleDropPerson: ${action.type} ${action.dragZoneId} => ${action.dropZoneId}`, action.draggedData);
    const person: Person = action.draggedData;
    if (action.state === DragDropState.Dropped) {
      const targetCompanyId: number = Number(action.dropZoneId);
      if (targetCompanyId === COMPANY_ID_UNEMPLOYED) {
        // @ts-ignore
        person.company = null;
      } else {
        // @ts-ignore
        person.company = targetCompanyId;
      }
      this.personDataService.update(person).subscribe();
    } else if (action.state === DragDropState.DroppedToRubbish) {
      this.personDataService.delete(person).subscribe();
    }
  }
}
