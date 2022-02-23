import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogResult, ModalResult} from '../form/modal/modal.model';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormValidatorService} from '../service/form-validator.service';

@Component({
  selector: 'app-modal-component-base',
  template: ``,
  styles: []
})
export abstract class ModalComponentBase<T, PK extends keyof T> implements OnInit {
  @Input() in!: T;
  @Input() autoHide = false;
  @Output() out = new EventEmitter<ModalResult<T>>();

  form!: FormGroup;
  isNew = false;

  constructor(
    public _bsModalRef: BsModalRef,
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
    //console.log('RESULT: ', data);
    this.out.emit({command: DialogResult.OK, isNew: this.isNew, data});
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this._formValidatorService.getFormControlErrorMessage(ctr);
  }

  onCancel() {
    this._bsModalRef.hide();
  }
}
