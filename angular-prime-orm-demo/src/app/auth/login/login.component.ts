import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormValidatorService } from '../../core/service/form-validator.service';
import { environment } from '../../../environments/environment';
import { AuthState } from '../store/auth.reducer';
import { select, Store } from '@ngrx/store';
import { LoginAction } from '../store/auth.actions';
import { Observable } from 'rxjs';
import { selectAuthentication, selectIsAuthenticated } from '../store/auth.selectors';
import { Auth } from '@app/client-lib';
import { CHANGE_DETECTION_STRATEGY } from '../../app.constants';
import { Password } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastrService } from '../../prime-core/service/toastr.service';
import { selectLoading } from '../../store/app.selectors';
import { AppState } from '../../store/app.reducer';
import { LoadingAction } from '../../store/app.actions';

export interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('pwd') passwordComponent!: Password;

  authenticated$: Observable<boolean> = this.store.pipe(select(selectIsAuthenticated));
  currentAuth$: Observable<Auth|undefined> = this.store.pipe(select(selectAuthentication));

  loading$!: Observable<boolean>;

  form = this.fb.group({
    username: [environment.defaultUsername, Validators.required],
    password: [environment.defaultPassword, Validators.required],
  });

  username = this.form.controls['username'] as FormControl;
  password = this.form.controls['password'] as FormControl;

  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private formValidatorService: FormValidatorService,
    public messageService : MessageService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
  }

  onLogin(): void {
    const f: LoginData = this.form.getRawValue();
    console.log('Login: ', f);
    const {username, password} = f;
    this.store.dispatch(LoadingAction());
    this.store.dispatch(LoginAction({username, password}));
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this.formValidatorService.getFormControlErrorMessage(ctr);
  }

  ngAfterViewInit(): void {
    this.passwordComponent['cd'].detectChanges();
  }
}
