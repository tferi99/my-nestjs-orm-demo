import {DndDropEvent, DropEffect, EffectAllowed} from 'ngx-drag-drop';

//--------------------- for DragDropService ---------------------
export interface DragDropAction {
  dragEvent: DragEvent;
  dragZoneId: string;
  dragZoneType: string;
  dropEvent: DndDropEvent;
  dropZoneId: string;
  effect: DropEffect;
  draggedData: any;
  state: DragDropState;
  type: string;
}

export enum DragDropState {
  Dragged = 'Dragged',
  Dropped = 'Dropped',
  DroppedToRubbish = 'DroppedToRubbish',
  Cancelled = 'Cancelled'
}

//--------------------- for list management ---------------------
export interface DraggableItem {
  type?: string;    // if you want to specify type for typed dropzone
  content: any;     // a zone can contain any type of content (use type to identify content type)
  effectAllowed: EffectAllowed;
  disable: boolean;
  handle: boolean;  // you can start dragging of an element only by catching its sub-element with dndHandle
};

export interface DraggableItemList<D> {
  id: string;
  items: D[];
}
