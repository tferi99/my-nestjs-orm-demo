import {Component, Input, OnInit} from '@angular/core';
import {DragDropComponentBase, DragDropItem, DragDropListZone} from '../drag-drop.model';
import {ToastrService} from 'ngx-toastr';
import {DndDropEvent, DropEffect} from 'ngx-drag-drop';
import {NGXLogger} from 'ngx-logger';
import {DragDropListService} from '../drag-drop-list.service';
import {DragDropEventConsumerService} from '../drag-drop-event-consumer.service';

@Component({
  selector: 'dd-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent implements OnInit, DragDropComponentBase {
  @Input()
  id!: string;

  @Input()
  data?: DragDropListZone<DragDropItem>;

  dropZoneDummyVal: string[] = [];

  constructor(
    private toastr: ToastrService,
    private log: NGXLogger,
    private dragDropService: DragDropListService,
    private dragDropEventConsumerService: DragDropEventConsumerService    // to force instantiation
  ) {}

  ngOnInit(): void {
  }

  onDragStart(event: DragEvent) {
    this.dragDropService.onDragStart(this.data, event);
    this.toastr.info('Drag started!');
  }

  onDrop(event: DndDropEvent) {
    this.dragDropService.onDrop(this.data, event);
  }

  onDragged(item: any, effect: DropEffect) {
    this.dragDropService.onDragged(this.data, item, effect);
  }

  onDragEnd(event: DragEvent) {
    this.dragDropService.onDragEnd(this.data, event);
    this.toastr.info('Drag ended!');
  }

  getId(): string {
    if (!this.id) {
      this.id = this.data ? 'List-' + this.data.id : 'List-?';
    }
    return this.id;
  }
}

