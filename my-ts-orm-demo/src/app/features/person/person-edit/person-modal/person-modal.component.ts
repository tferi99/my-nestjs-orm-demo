import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Person, EmployeeType} from '@app/client-lib';
import {DialogResult, ModalResult} from '../../../../core/form/modal/modal.model';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {KeyValuePair, stringEnumToKeyValuePairArray} from '../../../../core/util/key-value-pair';
import {FormValidatorService} from '../../../../core/service/form-validator.service';

@Component({
  selector: 'app-Person-list-modal',
  templateUrl: './Person-modal.component.html',
  styleUrls: ['./Person-modal.component.scss']
})
export class PersonModalComponent implements OnInit {
  @Input() in!: Person;
  @Input() autoHide = false;
  @Output() out = new EventEmitter<ModalResult<Person>>();

  isNew = false;
  employeeTypes: KeyValuePair<string, string>[] = stringEnumToKeyValuePairArray(EmployeeType, true);

  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    employeeType: ['', Validators.required],
    birth: ['', Validators.required],
    rank: ['0', [Validators.required, Validators.min(1), Validators.max(10)]],
    note: [null, [Validators.maxLength(1024)]],
    active: [true]
  });

  // form controls (used in template here)
  name = this.form.controls.name as FormControl;
  email = this.form.controls.email as FormControl;
  employeeType = this.form.controls.employeeType as FormControl;
  rank = this.form.controls.rank as FormControl;
  birth = this.form.controls.birth as FormControl;
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
    const data: Person = this.form.getRawValue();
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
