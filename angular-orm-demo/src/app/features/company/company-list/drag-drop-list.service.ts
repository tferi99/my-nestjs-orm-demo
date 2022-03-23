import {Injectable} from '@angular/core';
import {DragDropItem} from '../../../core/drag-and-drop/drag-drop.model';
import {DragDropListServiceBase} from '../../../core/drag-and-drop/drag-drop-list.service-base';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class DragDropListService extends DragDropListServiceBase<DragDropItem<String>> {
  constructor(private logger: NGXLogger) {
    super(logger);
  }
}
