import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Company} from '@app/client-lib';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../core/service/form-validator.service';
import {ModalComponentBase} from '../../../../core/component/modal.component.base';

@Component({
  selector: 'app-company-list-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.scss']
})
export class CompanyModalComponent extends ModalComponentBase<Company, 'id'> implements OnInit {
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


