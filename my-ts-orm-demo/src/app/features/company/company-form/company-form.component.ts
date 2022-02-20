import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {KeyValuePair, stringEnumToKeyValuePairArray} from '../../../core/util/key-value-pair';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company.service';
import {ToastrService} from 'ngx-toastr';
import {Company, EmployeeType} from '@app/client-lib';
import {FormValidatorService} from '../../../core/service/form-validator.service';
import {FormSaveDto} from '../../../core/form/form.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  isNew = false;
  @Input() in!: Company;
  @Output() onSave = new EventEmitter<FormSaveDto<Company>>();
  @Output() onCancel = new EventEmitter<number>();

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

  /*  get fc() {
      return this.form.controls;
    }*/

  constructor(
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // retrieving input data
    // from router
    if (!this.in) {
      this.in = this.route.snapshot.data.company;
    }
    if (!this.in) {
      this.in = history.state;
    }
    this.isNew = this.in === undefined || this.in.id === undefined;

    if (this.in) {
      this.form.patchValue(this.in);
    }
  }

  onSubmit(): void {
    const company: Company = this.form.getRawValue();
    console.log('SUBMIT isNew:' + this.isNew, company);

    try {
      this.onSave.emit({
        data: company,
        isNew: this.isNew
      });
    } catch(err) {
      console.log('CATCHED: ', err);
    }

  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this.formValidatorService.getFormControlErrorMessage(ctr);
  }

  onCancelForm(): void {
    this.onCancel.emit(1)
  }
}


