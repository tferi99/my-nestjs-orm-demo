import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {EmployeeType, Person} from '@app/client-lib';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {KeyValuePair, stringEnumToKeyValuePairArray} from '../../../../core/util/key-value-pair';
import {FormValidatorService} from '../../../../core/service/form-validator.service';
import {ModalComponentBase} from '../../../../core/component/modal.component.base';
import {PersonAdditional} from '../person-edit.component';

@Component({
  selector: 'app-person-modal-form-form',
  templateUrl: './person-modal-form.component.html',
  styleUrls: ['./person-modal-form.component.scss']
})
export class PersonModalFormComponent extends ModalComponentBase<Person, PersonAdditional, 'id'> implements OnInit {
  employeeTypes: KeyValuePair<string, string>[] = stringEnumToKeyValuePairArray(EmployeeType, true);

  form = this.fb.group({
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
  name = this.form.controls.name as FormControl;
  email = this.form.controls.email as FormControl;
  employeeType = this.form.controls.employeeType as FormControl;
  rank = this.form.controls.rank as FormControl;
  birth = this.form.controls.birth as FormControl;
  note = this.form.controls.note as FormControl;
  active = this.form.controls.active as FormControl;
  company = this.form.controls.company as FormControl;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
  ) {
    super(bsModalRef, formValidatorService);
  }

  protected getForm(): FormGroup {
    return this.form;
  }

  protected getNameOfId(): 'id' {
    return 'id';
  }
}
