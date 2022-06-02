import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../auth.service';
import {
  AuthInitilizedAction,
  LoginAction,
  LoginErrorAction,
  LoginSuccessAction,
  LogoutAction,
  RenewAction, RenewErrorAction, RenewSuccessAction
} from './auth.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {LocalStorageService} from '../../core/service/local-storage.service';
import { Observable, of } from 'rxjs';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {AppDataLoadAction} from '../../init/store/init.actions';
import {AuthWithExpiration} from '../model/auth-with-expiration';
import {PersonDataService} from '../../features/person/store/person-data.service';
import {CompanyDataService} from '../../features/company/store/company-data.service';
import { ToastrService } from '../../prime-core/service/toastr.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastr: ToastrService,
    private logger: NGXLogger,
    private personDataService: PersonDataService,
    private companyDataService: CompanyDataService
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(LoginAction),
    exhaustMap(action => this.authService.login(action.username, action.password).pipe(
      map(result => {
          // re-creating Auth in service
          // next authService.getCurrentAuth() will create Auth into service
          this.authService.clearAuthentication();
          // writing token into local storage
          this.localStorageService.setAuthToken(result.access_token);

          // retrieving Auth from service that initilizes it from token
          const auth: AuthWithExpiration | undefined = this.authService.getCurrentAuth();
          if (auth) {
            return LoginSuccessAction({auth});
          }
          const msg = 'Unexpected error during login: current Auth cannot be generated.';
          this.logger.error(msg);
          return LoginErrorAction({errorMessage: msg});
        }
      ),
      catchError(err => {
        this.toastr.error('Login error');
        this.logger.error('Login error:', err);
        return of (LoginErrorAction(err.message));
      })
    ))
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LoginSuccessAction),
    map(action => {
      this.router.navigateByUrl('/');
      return AppDataLoadAction();
    })
  ));

  loginError$ = createEffect(() => this.actions$.pipe(
    ofType(LoginErrorAction),
    map(msg => {
      this.authService.clearAuthentication();
      tap(() => this.router.navigateByUrl('/login'));
    })
  ), {
    dispatch: false
  });

  authInitilizedAction$ = createEffect(() => this.actions$.pipe(
    ofType(AuthInitilizedAction),
    map(action => AppDataLoadAction())
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(LogoutAction),
    tap( () => {
      this.authService.clearAuthentication();
      this.personDataService.clearCache();
      this.companyDataService.clearCache();
    }),
    tap(() => this.router.navigateByUrl('/login')),
    exhaustMap(action => this.authService.logout())
  ), {
    dispatch: false
  });

  renew$ = createEffect(() => this.actions$.pipe(
    ofType(RenewAction),
    exhaustMap(action => this.authService.renew().pipe(
      map(result => {
          // re-creating Auth in service
          // next authService.getCurrentAuth() will create Auth into service
          this.authService.clearAuthentication();
          // writing token into local storage
          this.localStorageService.setAuthToken(result.access_token);

          // retrieving Auth from service that initilizes it from token
          const auth: AuthWithExpiration | undefined = this.authService.getCurrentAuth();
          if (auth) {
            return RenewSuccessAction({auth});
          }
          return RenewErrorAction({errorMessage: 'Unexpected error during renew: current Auth cannot be generated.'});
        }
      ),
      catchError(err => {
        this.toastr.error('Renew error');
        this.logger.error('Renew error:', err);
        return of (RenewErrorAction(err.message));
      })
    ))
  ));

}
