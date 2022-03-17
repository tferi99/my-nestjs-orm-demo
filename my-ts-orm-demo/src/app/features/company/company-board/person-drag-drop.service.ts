import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {DragDropServiceBase} from '../../../core/drag-and-drop/drag-drop-service-base';
import {PersonDataService} from '../../person/store/person-data.service';
import {Person} from '@app/client-lib';
import {COMPANY_ID_RUBBISH_BIN, COMPANY_ID_UNEMPLOYED} from '../company.constants';

/**
 * This is a drag-and-drop handler and consumer service, too.
 */
@Injectable({
  providedIn: 'root'
})
export class PersonDragDropService extends DragDropServiceBase {
  constructor(
    private logger: NGXLogger,
    private personDataService: PersonDataService
  ) {
    super(logger);
    this.tracing = true;
    this.emitter.subscribe(
      action => {
        logger.log('>>>>>>>>>>>>>>>>>>>> DRAG-DROP - [ACTION]:', action);
        const person: Person = action.draggedData;
        const targetCompanyId: number = Number(action.dropZoneId);

        if (targetCompanyId === COMPANY_ID_RUBBISH_BIN) {
          this.personDataService.delete(person).subscribe();
        } else {
          if (targetCompanyId === COMPANY_ID_UNEMPLOYED) {
            // @ts-ignore
            person.company = null;
          } else {
            // @ts-ignore
            person.company = targetCompanyId;
          }
          this.personDataService.update(person).subscribe();
        }
      }
    );
  }
}
