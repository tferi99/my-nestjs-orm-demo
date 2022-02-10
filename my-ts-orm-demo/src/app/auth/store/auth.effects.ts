import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../auth.service';
import {
  AuthRoleTestAction,
  AuthRoleTestErrorAction,
  AuthRoleTestOkAction,
  LoginAction,
  LoginErrorAction,
  LoginSuccessAction,
  LogoutAction
} from './auth.actions';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {LocalStorageService} from '../../core/service/local-storage.service';
import jwt_decode from 'jwt-decode';
import {from, of} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ErrorMessageUtils} from '../../core/error/error-message-utils';
import {NGXLogger} from 'ngx-logger';
import {Auth, JwtPayload} from '@app/client-lib';
import {InitLoadAction} from '../../init/store/init.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastr: ToastrService,
    private logger: NGXLogger,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(LoginAction),
    exhaustMap(action => this.authService.login(action.username, action.password).pipe(
      map(result => {
          console.log('Result: ', result);
          const payload: JwtPayload = jwt_decode(result.access_token);
          console.log('Decoded token: ', payload);
          this.localStorageService.setAuthToken(result.access_token);
          const auth: Auth = {
            id: Number(payload.sub),
            name: payload.username,
            roles: payload.roles
          };
          // return login success action with the user represented as payload from the action
          return LoginSuccessAction({auth});
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
      return InitLoadAction();
      // return DummyAction();
    })
  ));

  loginError$ = createEffect(() => this.actions$.pipe(
    ofType(LoginErrorAction),
    map(msg => {
      this.authService.clearAuthentication();
    })
  ), {
    dispatch: false
  });


  logout$ = createEffect(() => this.actions$.pipe(
    ofType(LogoutAction),
    tap( () => this.authService.clearAuthentication()),
    exhaustMap(action => this.authService.logout().pipe()),
    tap(() => this.router.navigateByUrl('/login'))
  ), {
    dispatch: false
  });

  authRoleTest$ = createEffect(() => this.actions$.pipe(
    ofType(AuthRoleTestAction),
    exhaustMap(action => this.authService.testAuthRole(action.role).pipe(
      switchMap(result => {
          this.logger.log('Role validation: OK');
          if (action.onOkActions && action.onOkActions.length > 0) {
            // console.log('>>> use custom OK action:', action.onErrorActions);
            return action.onOkActions;
          }
          // console.log('>>> use default OK action');
          return [
            AuthRoleTestOkAction({role: result.role})
          ];
        }
      ),
      catchError(err => {
        this.logger.log('Role validation: ERROR');
        if (action.onErrorActions && action.onErrorActions.length > 0) {
          // console.log('>>> use custom ERROR action:', action.onErrorActions);
          return from(action.onErrorActions);
        }
        // console.log('>>> use default ERROR action');
        return of(AuthRoleTestErrorAction({
          message: ErrorMessageUtils.getErrorMessage('[AuthTestAdmin]', err),
          role: action.role
        }));
      })
    ))
  ));

  AuthRoleTestOk$ = createEffect(() => this.actions$.pipe(
    ofType(AuthRoleTestOkAction),
    tap(action => this.toastr.success('Auth Role Test for: ' + action.role + ' - SUCCESSFUL'))
  ), {dispatch: false});

  AuthRoleTestError$ = createEffect(() => this.actions$.pipe(
    ofType(AuthRoleTestErrorAction),
    tap(action => this.toastr.error('Auth Role Test for:' + action.role + ' - FAILED (message:' + action.message + ')'))
  ), {dispatch: false});

  Dummy$ = createEffect(() => this.actions$.pipe(
    ofType(AuthRoleTestOkAction),
    tap(() => console.log('DUMMY ACTION !!!'))
  ), {dispatch: false});
}
