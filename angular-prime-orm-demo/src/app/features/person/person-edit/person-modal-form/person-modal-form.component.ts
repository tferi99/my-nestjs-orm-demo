import { Component, OnInit } from '@angular/core';
import { EmployeeType, Person } from '@app/client-lib';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KeyValuePair, stringEnumToKeyValuePairArray } from '../../../../core/util/key-value-pair';
import { FormValidatorService } from '../../../../core/service/form-validator.service';
import { NG_DATE_FORMAT } from '../../../../core/core.constants';
import { faker } from '@faker-js/faker';
import { randomStringEnum } from '../../../../core/util/random-utils';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalFormComponentBase } from '../../../../core/component/modal-form-component.base';
import { PersonAdditionalData } from '../person-edit-adapter.component';

@Component({
  selector: 'app-person-modal-form-form',
  templateUrl: './person-modal-form.component.html',
  styleUrls: ['./person-modal-form.component.scss']
})
export class PersonModalFormComponent extends ModalFormComponentBase<Person, PersonAdditionalData, 'id'> implements OnInit {
  employeeTypes: KeyValuePair<string, string>[] = stringEnumToKeyValuePairArray(EmployeeType, false, true);

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
    email: ['', [Validators.required, Validators.email]],
    employeeType: ['', Validators.required],
    birth: ['', Validators.required],
    rank: ['0', [Validators.required, Validators.min(1), Validators.max(100)]],
    note: [null, [Validators.maxLength(1024)]],
    active: [true],
    company: [undefined],
  });

  // form controls (used in template here)
  name = this.form.controls['name'] as FormControl;
  email = this.form.controls['email'] as FormControl;
  employeeType = this.form.controls['employeeType'] as FormControl;
  rank = this.form.controls['rank'] as FormControl;
  birth = this.form.controls['birth'] as FormControl;
  note = this.form.controls['note'] as FormControl;
  active = this.form.controls['active'] as FormControl;
  company = this.form.controls['company'] as FormControl;

  protected getForm(): FormGroup {
    return this.form;
  }

  protected override getNameOfId(): 'id' {
    return 'id';
  }

  fillRandom() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    this.name.setValue(firstName + ' ' + lastName);
    this.email.setValue(faker.internet.email(firstName, lastName));
    this.employeeType.setValue(randomStringEnum(EmployeeType));
    this.rank.setValue(Math.ceil(Math.random() * 90));
    this.birth.setValue(faker.date.past(80));
    this.active.setValue(Math.random() > .5);
  }
}
