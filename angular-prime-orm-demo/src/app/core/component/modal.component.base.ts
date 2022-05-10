import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogResult, ModalResult} from '../form/modal/modal.model';
import {AbstractControl, FormGroup} from '@angular/forms';
import {FormValidatorService} from '../service/form-validator.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-modal-component-base',
  template: ``,
  styles: []
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class ModalComponentBase<T, A, PK extends keyof T> implements OnInit {
  @Input() in!: T;
  @Input() additional!: A;
  @Input() autoHide = false;
  @Output() out = new EventEmitter<ModalResult<T>>();

  form!: FormGroup;
  isNew = false;

  constructor(
    public _modalRef: DynamicDialogRef,
    private _formValidatorService: FormValidatorService,
  ) {}

  protected abstract getNameOfId(): PK;
  protected abstract getForm(): FormGroup;

  ngOnInit(): void {
    this.isNew = this.in === undefined || this.in[this.getNameOfId()] === undefined;

    if (this.in) {
      this.form.patchValue(this.in);
    }
  }

  onSubmit(): void {
    const data: T = this.form.getRawValue();
    console.log('RESULT: ', data);
    this.out.emit({command: DialogResult.OK, isNew: this.isNew, data});
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this._formValidatorService.getFormControlErrorMessage(ctr);
  }

  onCancel() {
    this._modalRef.close();
  }
}
