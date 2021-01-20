import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {KeyValuePair, stringEnumToKeyValuePairArray} from '../../common/util/key-value-pair';
import {FormValidatorService} from '../../common/form-validator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../person.service';
import {ToastrService} from 'ngx-toastr';
import {EmployeeType, PersonDto} from 'my-ts-orm-demo-lib';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  isNew = false;

  @Input() in: PersonDto;

  employeeTypes: KeyValuePair<string, string>[];

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
  name = this.form.controls.name;
  email = this.form.controls.email;
  employeeType = this.form.controls.employeeType;
  rank = this.form.controls.rank;
  birth = this.form.controls.birth;
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
    private personService: PersonService,
    private toastr: ToastrService
  ) {
    this.employeeTypes = stringEnumToKeyValuePairArray(EmployeeType, true);
  }

  ngOnInit(): void {
    // retrieving input data
    // from router
    if (!this.in) {
      this.in = this.route.snapshot.data.person;
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
    const p: PersonDto = this.form.getRawValue();
    console.log('SUBMIT isNew:' + this.isNew, p);

    if (this.isNew) {
      this.personService.create(p).subscribe(
        result => {
          this.toastr.info(`Person[${result.id}] created.`);
          this.router.navigateByUrl('/person');
        }
      );
    } else {
      this.personService.save(p).subscribe(
        result => {
          this.toastr.info(`Person[${result.id}] updated.`);
          this.router.navigateByUrl('/person');
        }
      );
    }
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this.formValidatorService.getFormControlErrorMessage(ctr);
  }

  onCancel(): void {
    this.router.navigateByUrl('/person');
  }
}


