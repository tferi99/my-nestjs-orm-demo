import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

const MSG_KEY = 'global';

/**
 * It's a wrapper service to simulate ngx-toastr ToastrService
 * by PrimeNG MessageService.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(public service: MessageService) { }

  info(message?: string, title?: string): void {
    this.service.add({ key: MSG_KEY, severity: 'info', summary: title, detail: message });
  }

  warn(message?: string, title?: string): void {
    this.service.add({ key: MSG_KEY, severity: 'warn', summary: title, detail: message });
  }

  error(message?: string, title?: string): void {
    this.service.add({ key: MSG_KEY, severity: 'error', summary: title, detail: message });
  }

  success(message?: string, title?: string): void {
    this.service.add({ key: MSG_KEY, severity: 'success', summary: title, detail: message });
  }
}
