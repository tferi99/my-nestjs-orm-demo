import { Injectable } from '@angular/core';
import { FormFocusDirective } from './directive/form-focus.directive';
import { ModalFormAdapterBase } from './component/modal-form-adapter.base';
import { ModalFormComponentBase } from './component/modal-form-component.base';
import { FormComponentBase } from './component/form-component.base';

@Injectable({
  providedIn: 'root'
})
export class CoreInitService {

  constructor() {}

  init(): void {
    this.initTracing();
  }

  private initTracing() {
    FormFocusDirective.tracing = true;
    FormComponentBase.tracing = true;
    ModalFormAdapterBase.tracing = true;
    ModalFormComponentBase.tracing = true;
  }
}
