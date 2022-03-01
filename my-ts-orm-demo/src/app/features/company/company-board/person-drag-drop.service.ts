import {Injectable} from '@angular/core';
import {DragDropItem} from '../../../core/drag-and-drop/drag-drop.model';
import {DragDropListServiceBase} from '../../../core/drag-and-drop/drag-drop-list.service-base';
import {NGXLogger} from 'ngx-logger';
import {Person} from '@app/client-lib';

@Injectable({
  providedIn: 'root'
})
export class PersonDragDropService extends DragDropListServiceBase<DragDropItem<Person>> {
  constructor(private logger: NGXLogger) {
    super(logger);
  }
}
