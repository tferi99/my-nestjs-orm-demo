import { Person } from '@app/client-lib';
import { NGXLogger } from 'ngx-logger';

export enum DragDropAction {
  Delete = 'DELETE',
  Add = 'ADD'
}

export abstract class DragDropServiceBase<T> {
  dragged?: T;
  protected tracing = false;

  constructor(
    protected _logger: NGXLogger,
    tracing?: boolean
  ) {
    if (tracing != undefined) {
      this.tracing = tracing;
    }
  }

  dragStart(obj: T) {
    this.dragged = obj;
    if (this.tracing) {
      this._logger.info('dragStart', obj);
    }
  }

  dragEnd() {
    this.dragged = undefined;
    if (this.tracing) {
      this._logger.info('dragEnd');
    }
  }

  drop(action: DragDropAction) {
    if (this.tracing) {
      this._logger.info('drop[' + action + ']:', this.dragged);
    }
    if (this.dragged) {
      this.handleDrop(action, this.dragged);
      this.dragged = undefined;
    }
  }

  abstract handleDrop(action: DragDropAction, obj: T): void;
}
