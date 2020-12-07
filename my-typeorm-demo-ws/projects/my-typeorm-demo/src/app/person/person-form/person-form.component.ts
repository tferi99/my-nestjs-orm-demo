import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmployeeType, Person} from 'my-typeorm-demo-lib';
import {KeyValuePair, stringEnumToKeyValuePairArray} from '../../general/util/key-value-pair';
import {FormValidatorService} from '../../general/form-validator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppMessengerService} from '../../shared/app-messenger.service';
import {AppMessageType} from '../../shared/app-message-type';
import {PersonService} from '../person.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  isNew = false;

  @Input() in: Person;

  employeeTypes: KeyValuePair<string, string>[];

  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    employeeType: ['', Validators.required],
    birth: ['', Validators.required],
    rank: ['0', [Validators.required, Validators.min(1), Validators.max(10)]],
    active: [true]
  });

  // form controls (used in template here)
  name = this.form.controls.name;
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
    private route: ActivatedRoute,
    private router: Router,
    private personService : PersonService,
    private toastr: ToastrService
  ) {
    this.employeeTypes = stringEnumToKeyValuePairArray(EmployeeType, true);
  }

  ngOnInit(): void {
    if (!this.in) {
      this.in = this.route.snapshot.data.person;
    }
    this.isNew = this.in === undefined;

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
          this.toastr.info(`Person[${p}] created.`);
          this.router.navigateByUrl('/person');
        }
      );
    } else {
      this.personService.save(p).subscribe(
        result => {
          this.toastr.info(`Person[${p}] saved.`);
          this.router.navigateByUrl('/person');
        }
      );
    }
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this.formValidatorService.getFormControlErrorMessage(ctr);
  }
}


