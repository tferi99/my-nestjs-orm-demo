import {Injectable} from '@angular/core';
import {DragDropItem} from './drag-drop.model';
import {DragDropListServiceBase} from './drag-drop-list.service-base';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class DragDropListService extends DragDropListServiceBase<DragDropItem> {
  constructor(private logger: NGXLogger) {
    super(logger);
  }
}
