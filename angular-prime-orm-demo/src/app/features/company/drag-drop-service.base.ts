import { NGXLogger } from 'ngx-logger';

export enum DragDropAction {
  Delete = 'DELETE',
  Move = 'MOVE',
  Copy = 'COPY'
}

const DRAG_DROP_TRACE_PREFIX = 'DRAG_DROP: '

export abstract class DragDropServiceBase<T> {
  type?: string
  dragZoneId?: string;
  dropZoneId?: string;
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

  dragStart(type: string, dragZoneId: string, data: T) {
    this.type = type;
    this.dragZoneId = dragZoneId;
    this.dragged = data;

    this.trace(`dragStart[${type}] ${dragZoneId} => ...`, data);
    if (!type || !dragZoneId || data === undefined) {
      throw new Error("Bad ")
    }
  }

  dragEnd() {
    this.type = undefined;
    this.dragged = undefined;
    this.dragZoneId = undefined;
    this.dropZoneId = undefined;

    this.trace('dragEnd');
  }

  drop(dropZoneId: string, action: DragDropAction) {
    this.dropZoneId = dropZoneId;
    this.trace(`drop[${this.type}|${action}]: ${this.dragZoneId} => ${this.dropZoneId}`, this.dragged);

    if (this.dragged) {
      this.handleDrop(this.type ? this.type : '', action, this.dragged, this.dragZoneId, this.dropZoneId);
      this.dragged = undefined;
    }
  }

  abstract handleDrop(type: string, action: DragDropAction, data: T, dragZoneId?: string, dropZoneId?: string): void;

  private trace(msg: string, data?: any) {
    if (!this.tracing) {
      return;
    }
    if (msg) {
      this._logger.info(DRAG_DROP_TRACE_PREFIX + msg, data);
    } else {
      this._logger.info(DRAG_DROP_TRACE_PREFIX + msg);
    }
  }
}
