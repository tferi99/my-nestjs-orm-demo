import { Component } from '@angular/core';
import { FormValidatorService } from '../service/form-validator.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormComponentBase } from './form-component.base';

@Component({
  selector: 'app-modal-edit-component-base',
  template: ``,
  styles: []
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class ModalFormComponentBase<T, A, PK extends keyof T> extends FormComponentBase<T, A, PK> {
  _modalRef: DynamicDialogRef;
  _modalConfig: DynamicDialogConfig;

  constructor(
    modalRef: DynamicDialogRef,
    modalConfig: DynamicDialogConfig,
    formValidatorService: FormValidatorService,
  ) {
    super(formValidatorService);
    this._modalRef = modalRef;
    this._modalConfig = modalConfig;
  }

  onCancel() {
    this.trace('onCancel()');
    this._modalRef.close();
  }

  override initForm(): void {
    this.formDataConfig = this._modalConfig.data;
    super.initForm();
  }

  protected override trace(msg: string, ...data: any[]) {
    if (ModalFormComponentBase.tracing) {
      console.log('[MODAL FORM]: ' + msg, data);
    }
  }
}
