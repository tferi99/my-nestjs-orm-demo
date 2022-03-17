import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Company} from '@app/client-lib';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../core/service/form-validator.service';
import {ModalComponentBase} from '../../../../core/component/modal.component.base';

@Component({
  selector: 'app-company-modal-form-form',
  templateUrl: './company-modal-form.component.html',
  styleUrls: ['./company-modal-form.component.scss']
})
export class CompanyModalFormComponent extends ModalComponentBase<Company, any, 'id'> implements OnInit {
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
  ) {
    super(bsModalRef, formValidatorService);
  }

  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    established: ['', Validators.required],
    note: [null, [Validators.maxLength(1024)]],
    active: [true]
  });

  // form controls (used in template here)
  name = this.form.controls.name as FormControl;
  established = this.form.controls.established as FormControl;
  note = this.form.controls.note as FormControl;
  active = this.form.controls.active as FormControl;

  protected getForm(): FormGroup {
    return this.form;
  }

  protected getNameOfId(): 'id' {
    return 'id';
  }
}


