import { Component, OnInit } from '@angular/core';
import { Company } from '@app/client-lib';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from '../../../../core/service/form-validator.service';
import { ModalEditComponentBase } from '../../../../core/component/modal-edit-component.base';
import { NG_DATE_FORMAT } from '../../../../core/core.constants';
import { faker } from '@faker-js/faker';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-company-modal-form-form',
  templateUrl: './company-modal-form.component.html',
  styleUrls: ['./company-modal-form.component.scss']
})
export class CompanyModalFormComponent extends ModalEditComponentBase<Company, any, 'id'> implements OnInit {
  dateFormat = NG_DATE_FORMAT;

  constructor(
    public modalRef: DynamicDialogRef,
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    public modalConfig: DynamicDialogConfig,
  ) {
    super(modalRef, modalConfig, formValidatorService);
  }

  override form = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    established: ['', Validators.required],
//    created: ['', Validators.required],
    note: [null, [Validators.maxLength(1024)]],
    active: [true]
  });

  // form controls (used in template here)
  name = this.form.controls['name'] as FormControl;
  established = this.form.controls['established'] as FormControl;
  created = this.form.controls['created'] as FormControl;
  note = this.form.controls['note'] as FormControl;
  active = this.form.controls['active'] as FormControl;
  display: any;

  protected getForm(): FormGroup {
    return this.form;
  }

  protected getNameOfId(): 'id' {
    return 'id';
  }

  fillRandom() {
    this.name.setValue(faker.company.companyName());
    this.established.setValue(faker.date.past(100));
    this.active.setValue(Math.random() > .5);
  }

  onTest() {
    const d = new Date();
    console.log('TEST: ' + typeof d, d);
    console.log('TYPE: ' + typeof d);
    this.established.setValue(new Date());
  }

  onPopulate() {
    console.log('IN: ', this.in);
    console.log('TYPE: ' + typeof this.in.inputData?.established);
    this.established.setValue(this.in.inputData?.established);
  }
}


