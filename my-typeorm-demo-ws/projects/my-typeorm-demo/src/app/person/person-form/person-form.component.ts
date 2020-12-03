import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmployeeType, Person} from 'my-typeorm-demo-lib';
import {KeyValuePair, stringEnumToKeyValuePairArray} from '../../general/util/key-value-pair';
import {FormValidatorService} from '../../general/form-validator.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  @Input() in: Person;
  @Output() out = new EventEmitter<Person>();
  employeeTypes: KeyValuePair<string, string>[];

  form = this.fb.group({
    id: [0],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    employeeType: ['', Validators.required],
    birth: ['', Validators.required],
    rank: ['0', [Validators.required, Validators.min(1), Validators.max(10)]],
    active: [true]
  });

  // form controls (used in template here)
  firstName = this.form.controls.firstName;
  lastName = this.form.controls.lastName;
  email = this.form.controls.email;
  employeeType = this.form.controls.employeeType;
  rank = this.form.controls.rank;
  birth = this.form.controls.birth;
  active = this.form.controls.active;

  /*  get fc() {
      return this.form.controls;
    }*/

  constructor(
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private route: ActivatedRoute
  ) {
    this.employeeTypes = stringEnumToKeyValuePairArray(EmployeeType, true);
  }

  ngOnInit(): void {
    if (!this.in) {
      const id = this.route.snapshot.params.id;
      this.in = {
        id,
        firstName: 'f',
        lastName: 'l',
        active: true,
        birth: new Date(),
        rank: 2,
        employeeType: EmployeeType.DIRECTOR,
        email: 'fl@a.b'
      };
    }
    this.form.patchValue(this.in);
  }

  onSubmit(): void {
    const p: Person = this.form.getRawValue();
    console.log('SUBMIT:', p);
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this.formValidatorService.getFormControlErrorMessage(ctr);
  }
}

