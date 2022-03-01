import { Injectable } from '@angular/core';
import {DragDropListService} from '../../features/company/company-list/drag-drop-list.service';

@Injectable({
  providedIn: 'root'
})
export class DragDropEventConsumerService {

  constructor(private dds: DragDropListService) {
    dds.emitter.subscribe(
      dde => console.log('############################## DRAG-DROP ##############################', dde)
    );
  }
}
