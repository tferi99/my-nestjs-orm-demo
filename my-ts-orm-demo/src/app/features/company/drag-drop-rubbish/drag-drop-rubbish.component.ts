import {Component, Input, OnInit} from '@angular/core';
import {DndDropEvent} from 'ngx-drag-drop';
import {NGXLogger} from 'ngx-logger';
import {DragDropComponentBase} from '../../../core/drag-and-drop/drag-drop.model';
import {DragDropListService} from '../../../core/drag-and-drop/drag-drop-list.service';

@Component({
  selector: 'dd-drag-drop-rubbish',
  templateUrl: './drag-drop-rubbish.component.html',
  styleUrls: ['./drag-drop-rubbish.component.css']
})
export class DragDropRubbishComponent implements OnInit, DragDropComponentBase {
  @Input()
  id!: string;

  dropZoneDummyVal: string[] = [];

  constructor(
    private log: NGXLogger,
    private dragDropService: DragDropListService,
  ) { }

  ngOnInit(): void {
  }

  onDrop(event: DndDropEvent) {
    this.dragDropService.onDropRubbish(event);
  }

  getId(): string {
    return this.id;
  }
}
