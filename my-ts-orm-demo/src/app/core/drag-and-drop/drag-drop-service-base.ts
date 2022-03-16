import {DragDropAction, DragDropState} from './drag-drop.model';
import {DndDropEvent, DropEffect} from 'ngx-drag-drop';
import {NGXLogger} from 'ngx-logger';
import {Subject} from 'rxjs';

/**
 * These handler methods should be bound to the graggable item otherwise
 * action won't be created successfully or action won't contain all information
 * about drag-drop:
 *
 *    - onDragStart() to (dndStart)
 *    - on<EFFECT>() to (dnd<EFFECT>) - all allowed effect should be handled!
 *    - onDrop() to (dndDrop) of dndDropzone
 * OPTIONAL:
 *    - onDropRubbish() to (dndDrop) of the special rubbish-bin dndDropzone
 */
export abstract class DragDropServiceBase {
  action?: Partial<DragDropAction>;
  emitter: Subject<DragDropAction> = new Subject<DragDropAction>();
  protected tracing = false;

  constructor(
    protected _logger: NGXLogger
  ) {}

  /**
   * MANDATORY to bind!
   *
   * @param dragZoneId
   * @param event
   */
  onDragStart(dragZoneId: string, event: DragEvent) {
    if (this.tracing) {
      this._logger.info(`onDragStart(1) - DragZone[${dragZoneId}]`, event);
    }

    if (!dragZoneId) {
      return;
    }

    this.action = {
      dragEvent: event,
      dragZoneId: dragZoneId,
      state: DragDropState.Dragged
    }
    if (this.tracing) {
      this._logger.info('onDragStart(2) - [ACTION]:', this.action);
    }
  }

  onCopied(dragZoneId: string, event: DragEvent) {
    this.onDragged(dragZoneId, event, 'copy');
  }

  onLinked(dragZoneId: string, event: DragEvent) {
    this.onDragged(dragZoneId, event,'link');
  }

  onMoved(dragZoneId: string, event: DragEvent) {
    this.onDragged(dragZoneId, event,'move');
  }

  onCanceled(dragZoneId: string, event: DragEvent) {
    this.onDragged(dragZoneId, event,'none');
  }

  onDragged(dragZoneId: string, event: DragEvent, effect: DropEffect) {
    if (this.tracing) {
      this._logger.info(`onDragged(1) - DragZone[${dragZoneId}] - effect:${effect}`, event);
    }
    if (this.action) {
      this.action.effect = effect;

      if (this.action.effect === 'none') {
        this.action.state = DragDropState.Cancelled;

        this.emit('onDragged');
        return;
      }
    }
    if (this.tracing) {
      this._logger.info('onDragged(2) - [ACTION]:', this.action);
    }
  }

  onDragOver(dragZoneId: string, event: DragEvent): void {
    if (this.tracing) {
      this._logger.info(`onDragOver - zone[${dragZoneId}]`, event);
    }
  }

  onDragEnd(dragZoneId: string, event: DragEvent) {
    if (this.tracing) {
      this._logger.info(`onDragEnd - [${dragZoneId}]`, event);
    }
  }

  onDrop(dropZoneId: string, event: DndDropEvent) {
    if (this.tracing) {
      this._logger.info(`onDrop(1) - DropZone[${dropZoneId}]`, event);
    }

    if (this.action) {
      this.action.draggedData = event.data;
      this.action.dropZoneId = dropZoneId;
      this.action.dropEvent = event;
      this.action.effect = event.dropEffect;
      this.action.state = DragDropState.Dropped;

      this.emit('onDrop');
    }
  }

  onDropRubbish(event: DndDropEvent) {
    if (this.tracing) {
      this._logger.info('onDropRubbish: ', event);
    }
    if (!this.action) {
      return;
    }
    this.action.dropEvent = event;
    this.action.state = DragDropState.DroppedToRubbish;

    this.emit('onDropRubbish');
  }

  private emit(source: string) {
    if (this.tracing) {
      this._logger.info(`EMITTING from '${source}' - [ACTION]:`, this.action);
    }
    this.emitter.next(this.action as DragDropAction);
    delete this.action;
  }
}
