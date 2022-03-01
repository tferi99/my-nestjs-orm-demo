import {DndDropEvent, DropEffect, EffectAllowed} from 'ngx-drag-drop';

export interface DragDropItem<T> {
  content: T;
  effectAllowed: EffectAllowed;
  disable: boolean;
  handle: boolean;
};

export interface DragDropListZone<T> {
  id: string;
  items: T[];
}

export interface DragDropComponentBase {
  getId(): string;
}

export interface DragDropAction<Z, D> {
  dragEvent: DragEvent;
  dropEvent: DndDropEvent;
  sourceData: Z;
  destinationData: Z;
  effect: DropEffect;
  draggedData: D;
  state: DragDropState;
}

export enum DragDropState {
  Started = 'Started',
  Dropped = 'Dropped',
  DroppedToRubbish = 'DroppedToRubbish'
}
