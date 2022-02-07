import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {KeyValuePair, stringEnumToKeyValuePairArray} from '../../core/util/key-value-pair';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company.service';
import {ToastrService} from 'ngx-toastr';
import {Company, EmployeeType} from '@app/my-ts-orm-demo-lib';
import {FormValidatorService} from '../../core/service/form-validator.service';


@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  isNew = false;
  @Input() in: Company;

  employeeTypes: KeyValuePair<string, string>[];

  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    established: ['', Validators.required],
    note: [null, [Validators.maxLength(1024)]],
    active: [true]
  });

  // form controls (used in template here)
  name = this.form.controls.name;
  established = this.form.controls.established;
  note = this.form.controls.note;
  active = this.form.controls.active;

  /*  get fc() {
      return this.form.controls;
    }*/

  constructor(
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private toastr: ToastrService
  ) {
    this.employeeTypes = stringEnumToKeyValuePairArray(EmployeeType, true);
  }

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
    const p: Company = this.form.getRawValue();
    console.log('SUBMIT isNew:' + this.isNew, p);

    if (this.isNew) {
      this.companyService.create(p).subscribe(
        result => {
          this.toastr.info(`Company[${result.id}] created.`);
          this.router.navigateByUrl('/company');
        }
      );
    } else {
      this.companyService.save(p.id, p).subscribe(
        result => {
          this.toastr.info(`Company[${result.id}] updated.`);
          this.router.navigateByUrl('/company');
        }
      );
    }
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this.formValidatorService.getFormControlErrorMessage(ctr);
  }

  onCancel(): void {
    this.router.navigateByUrl('/company');
  }
}


