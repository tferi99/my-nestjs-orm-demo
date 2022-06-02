import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, OperatorFunction, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

const MSG_KEY = 'global';

export interface ToastrServiceConfig {
  distinctTime: number
}

interface Message {
  severity: string;
  title?: string;
  message?: string;
}

/**
 * It's a wrapper service to simulate ngx-toastr ToastrService
 * by PrimeNG MessageService.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  messenger: Subject<Message> = new Subject<Message>();
  lastMsgTime = 0;
  lastMsg?: Message;

  private cfg: ToastrServiceConfig = {
    distinctTime: 0             // distinct check disabled
  }

  constructor(public service: MessageService) {
    this.messenger.subscribe(
      msg => {
        if (!this.isDistinct(msg)) {
          return;
        }
        console.log('MESSAGE:', msg, this.cfg);
        this.service.add({ key: MSG_KEY, severity: msg.severity, summary: msg.title, detail: msg.message })
      }
    );
  }

  config(cfg: ToastrServiceConfig): void {
    this.cfg = cfg;
  }

  info(message?: string, title?: string): void {
    this.messenger.next({ severity: 'info', message, title });
  }

  warn(message?: string, title?: string): void {
    this.messenger.next({ severity: 'warn', message, title });
  }

  error(message?: string, title?: string): void {
    console.log("################## error")
    this.messenger.next({ severity: 'error', message, title });
  }

  success(message?: string, title?: string): void {
    this.messenger.next({ severity: 'success', message, title });
  }

  private compareMessage(msg: Message, lastMsg: Message): boolean {
    if(msg.message !== lastMsg.message || msg.title !== lastMsg.title || msg.severity !== lastMsg.severity) {
      return false;
    }
    return true;
  }

  private isDistinct(msg: Message) {
    if (!this.cfg.distinctTime) {
      return true;            // distinct check not active, at all
    }
    const now = Date.now();

    // saving last values and re-init last values
    const lastMsg = this.lastMsg;
    const lastMsgTime = this.lastMsgTime;
    this.lastMsg = msg;
    this.lastMsgTime = now;

    if (!lastMsg || now - lastMsgTime > this.cfg.distinctTime) {
      return true;
    }

    return !this.compareMessage(msg, this.lastMsg);
  }
}
