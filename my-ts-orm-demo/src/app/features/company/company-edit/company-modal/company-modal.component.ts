import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Company, EmployeeType} from '@app/client-lib';
import {DialogResult, ModalResult} from '../../../../core/form/modal/modal.model';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {KeyValuePair, stringEnumToKeyValuePairArray} from '../../../../core/util/key-value-pair';
import {FormValidatorService} from '../../../../core/service/form-validator.service';

@Component({
  selector: 'app-company-list-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.scss']
})
export class CompanyModalComponent implements OnInit {
  @Input() in!: Company;
  @Input() autoHide = false;
  @Output() out = new EventEmitter<ModalResult<Company>>();

  isNew = false;
  employeeTypes: KeyValuePair<string, string>[] = stringEnumToKeyValuePairArray(EmployeeType, true);

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

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
  ) { }

  ngOnInit(): void {
    this.isNew = this.in === undefined || this.in.id === undefined;

    if (this.in) {
      this.form.patchValue(this.in);
    }
  }

  onSubmit(): void {
    const data: Company = this.form.getRawValue();
    //console.log('RESULT: ', data);
    this.out.emit({command: DialogResult.OK, isNew: this.isNew, data});
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this.formValidatorService.getFormControlErrorMessage(ctr);
  }

  onCancel() {
    this.bsModalRef.hide();
  }
}