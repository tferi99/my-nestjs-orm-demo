import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppEvent } from './events.model';

@Injectable()
export class EventEmitterService {
  constructor(private eventEmitter: EventEmitter2) {}

  emit(event: AppEvent): boolean {
    return this.eventEmitter.emit(event.id, event);
  }

  async emitAsync(event: AppEvent): Promise<any[]> {
    return this.eventEmitter.emitAsync(event.id, event);
  }
}
