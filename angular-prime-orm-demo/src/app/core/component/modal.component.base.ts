import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormValidatorService } from '../service/form-validator.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogInput, DialogOutput, MODAL_TRACE, modalTraceLog } from '../form/modal/modal.model';


@Component({
  selector: 'app-modal-component-base',
  template: ``,
  styles: []
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class ModalComponentBase<T, A, PK extends keyof T> implements OnInit, AfterViewInit {
  in!: DialogInput<T, A>;
/*  @Input() additional!: A;
  @Input() autoHide = false;*/

  form!: FormGroup;
  isNew = false;

  constructor(
    public _modalRef: DynamicDialogRef,
    public _modalConfig: DynamicDialogConfig,
    private _formValidatorService: FormValidatorService,
  ) {}

  protected abstract getNameOfId(): PK;
  protected abstract getForm(): FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
  }

  onSubmit(): void {
    const data: T = this.form.getRawValue();
    modalTraceLog('onSubmit() FORM DATA: ', data);
    const result: DialogOutput<T> = {
      data,
      isNew: this.isNew
    };
    modalTraceLog('DIALOG OUTPUT: ', result);
    this._modalRef.close(result);
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this._formValidatorService.getFormControlErrorMessage(ctr);
  }

  onCancel() {
    modalTraceLog('onCancel()');
    this._modalRef.close();
  }

  private initForm(): void {
    this.in = this._modalConfig.data;
    modalTraceLog('ModalComponentBase DIALOG INPUT: ', this.in);

    if (!this.in) {
      this.isNew = true;
    } else if (!this.in.data) {
      this.isNew = true;
    } else {
      const data: T = this.in.data;
      this.isNew = data[this.getNameOfId()] === undefined;
      if (!this.isNew) {
        this.form.patchValue(data);
        modalTraceLog('ModalComponentBase Form patched:', this.form.value);
      }
    }
  }
}
