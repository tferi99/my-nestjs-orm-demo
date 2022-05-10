import {Component, OnInit} from '@angular/core';
import {Company} from '@app/client-lib';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../core/service/form-validator.service';
import {ModalComponentBase} from '../../../../core/component/modal.component.base';
import {NGX_DATE_FORMAT} from '../../../../core/core.constants';
import {faker} from '@faker-js/faker';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-company-modal-form-form',
  templateUrl: './company-modal-form.component.html',
  styleUrls: ['./company-modal-form.component.scss']
})
export class CompanyModalFormComponent extends ModalComponentBase<Company, any, 'id'> implements OnInit {
  NGX_DATE_FORMAT = NGX_DATE_FORMAT;

  constructor(
    public modalRef: DynamicDialogRef,
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
  ) {
    super(modalRef, formValidatorService);
  }

  override form = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    established: ['', Validators.required],
    note: [null, [Validators.maxLength(1024)]],
    active: [true]
  });

  // form controls (used in template here)
  name = this.form.controls['name'] as FormControl;
  established = this.form.controls['established'] as FormControl;
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
}


