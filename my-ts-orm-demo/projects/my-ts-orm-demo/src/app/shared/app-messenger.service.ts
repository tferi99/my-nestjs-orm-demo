import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {AppMessageType} from './app-message-type';
import {AppMessage} from './AppMessage';

@Injectable({
  providedIn: 'root'
})
export class AppMessengerService {
  private messenger: Subject<AppMessage> = new Subject<AppMessage>();

  constructor() { }

  emit(msg: AppMessage): void {
    console.log('AppMessage emitted', msg);

    this.messenger.next(msg);
  }

  getSubcriptionFactory(): Subject<AppMessage> {
    return this.messenger;
  }
}
