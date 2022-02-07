import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {FormValidatorService} from '../../core/service/form-validator.service';
import {environment} from '../../../environments/environment';
import {AuthState} from '../store/auth.reducer';
import {select, Store} from '@ngrx/store';
import {LoginAction} from '../store/auth.actions';
import {Observable} from 'rxjs';
import {selectAuthentication, selectIsAuthenticated} from '../store/auth.selectors';
import {Auth} from '@app/my-ts-orm-demo-lib';

export interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticated$: Observable<boolean> = this.store.pipe(select(selectIsAuthenticated));
  currentAuth$: Observable<Auth|undefined> = this.store.pipe(select(selectAuthentication));

  form = this.fb.group({
    username: [environment.defaultUsername, Validators.required],
    password: [environment.defaultPassword, Validators.required],
  });

  username = this.form.controls.username as FormControl;
  password = this.form.controls.password as FormControl;

  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AuthState>,
    private formValidatorService: FormValidatorService
  ) {}

  ngOnInit(): void {
  }

  onLogin(): void {
    const f: LoginData = this.form.getRawValue();
    // console.log('Login: ', f);
    const {username, password} = f;
    this.store.dispatch(LoginAction({username, password}));
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this.formValidatorService.getFormControlErrorMessage(ctr);
  }
}
