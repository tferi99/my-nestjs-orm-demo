import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormValidatorService } from '../service/form-validator.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogInput, DialogOutput } from '../form/modal/modal.model';


@Component({
  selector: 'app-modal-component-base',
  template: ``,
  styles: []
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class ModalComponentBase<T, A, PK extends keyof T> implements OnInit {
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
    this.in = this._modalConfig.data;
    console.log('DIALOG INPUT: ', this.in);

    this.isNew = this.in.isNew === undefined || this.in.data?[this.getNameOfId()] == undefined;
    if (this.in) {
      this.form.patchValue(this.in);
    }
  }

  onSubmit(): void {
    const data: T = this.form.getRawValue();
    console.log('FORM DATA: ', data);
    const result: DialogOutput<T> = {
      data,
      isNew: this.isNew
    };
    console.log('DIALOG OUTPUT: ', data);
    this._modalRef.close(data);
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this._formValidatorService.getFormControlErrorMessage(ctr);
  }

  onCancel() {
    this._modalRef.close();
  }
}
