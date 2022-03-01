import { Component, OnInit } from '@angular/core';
import {DragDropItem, DragDropListZone} from '../../../core/drag-and-drop/drag-drop.model';

@Component({
  selector: 'dd-drag-drop-list-demo',
  templateUrl: './drag-drop-list-demo.component.html',
  styleUrls: ['./drag-drop-list-demo.component.css']
})
export class DragDropListDemoComponent implements OnInit {

  draggableListLeft: DragDropListZone<DragDropItem<String>> = {
    id: 'LEFT',
    items: [
      {
        content: 'Left',
        effectAllowed: 'move',
        disable: false,
        handle: false,
      },
      {
        content: 'Lefter',
        effectAllowed: 'move',
        disable: false,
        handle: false,
      },
      {
        content: 'Leftest',
        effectAllowed: 'copyMove',
        disable: false,
        handle: false
      },
      {
        content: 'Lefty',
        effectAllowed: 'move',
        disable: false,
        handle: true,
      }
    ]
  };

  draggableListRight: DragDropListZone<DragDropItem<String>> = {
    id: 'RIGHT',
    items: [
      {
        content: 'I was originally right',
        effectAllowed: 'move',
        disable: false,
        handle: false,
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
