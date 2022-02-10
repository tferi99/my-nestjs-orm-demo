import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {KeyValuePair, stringEnumToKeyValuePairArray} from '../../core/util/key-value-pair';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../person.service';
import {ToastrService} from 'ngx-toastr';
import {EmployeeType, Person} from '@app/client-lib';
import {FormValidatorService} from '../../core/service/form-validator.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  isNew = false;

  @Input() in!: Person;

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
  name = this.form.controls.name as FormControl;
  email = this.form.controls.email as FormControl;
  employeeType = this.form.controls.employeeType as FormControl;
  rank = this.form.controls.rank as FormControl;
  birth = this.form.controls.birth as FormControl;
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
    const p: Person = this.form.getRawValue();
    console.log('SUBMIT isNew:' + this.isNew, p);

    if (this.isNew) {
      this.personService.create(p).subscribe(
        result => {
          this.toastr.info(`Person[${result.id}] created.`);
          this.router.navigateByUrl('/person');
        }
      );
    } else {
      this.personService.save(p.id, p).subscribe(
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


