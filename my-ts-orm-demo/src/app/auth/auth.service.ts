import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {LocalStorageService} from '../core/service/local-storage.service';
import jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {LoginResult} from './model/login-result';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from './store/auth.reducer';
import {AuthRoleTestAction, LoginErrorAction, LoginSuccessAction} from './store/auth.actions';
import {AppError} from '../core/error/app-error';
import {ServiceBase} from '../core/service/service.base';
import {Auth, AuthRoleTest, JwtPayload, Role} from '@app/client-lib';

/**
 * - login():
 *
 *  - isLoggedIn()
 *    - get token from local storage
 *    -
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ServiceBase {
  private authToken?: string;
  private currentAuth?: Auth;
  private testRefId = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private logger: NGXLogger,
    private router: Router,
    private store: Store<AuthState>
  ) {
      super('/auth');
      this.initAuth();
  }

  initAuth(): void {
    this.logger.debug('----------------- initAuth() -----------------');
    this.validateAuth(true);    // navigate if user found
  }

  getCurrentAuthenticationFromToken(): Auth | undefined {
    this.authToken = this.getAuthToken();
    if (!this.authToken) {
      this.currentAuth = undefined;
      return undefined;
    }

    if (this.currentAuth) {
      return this.currentAuth;
    }

    // parse JWT token
    const payload: JwtPayload = jwt_decode(this.authToken);
    // console.log('Decoded: ', payload);
    this.currentAuth = {
      id: Number(payload.sub),
      name: payload.username,
      roles: payload.roles
    };
    return this.currentAuth;
  }

  getAuthToken(): string | undefined {
    if (!this.authToken) {
      // not initialized/validated yet
      this.authToken = this.localStorageService.getAuthToken();
      // console.log('AuthToken from local store: ' + this.authToken);
    }
    return this.authToken;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    this.localStorageService.setAuthToken(token);
    this.currentAuth = undefined;
  }

  clearAuthentication(): void {
    this.authToken = undefined;
    this.currentAuth = undefined;
    this.localStorageService.deleteAuthToken();
  }

  login(username: string, password: string): Observable<LoginResult> {
    return this.getHttpClient().post<LoginResult>(this.getBasePath() + '/login', { username, password });
  }

  logout(): Observable<void> {
    return this.getHttpClient().post<void>(this.getBasePath() + '/logout', {});
  }

  testAuthRole(role: Role): Observable<AuthRoleTest> {
    this.testRefId++;
    const params = new HttpParams()
      .append('refIdx', this.testRefId);
    if (role === Role.None) {
      return this.getHttpClient().get<AuthRoleTest>(this.getBasePath() + '/testAnon', {params});     // for anonymous (no role)
    } else {
      if (role === Role.Admin) {
        return this.getHttpClient().get<AuthRoleTest>(this.getBasePath() + '/testAdmin', {params});
      } else if (role === Role.User) {
        return this.getHttpClient().get<AuthRoleTest>(this.getBasePath() + '/testTrader', {params});
      } else {
        throw new AppError(role + ' : unknow role');
      }
    }
  }

  private validateAuth(dispatch: boolean): void {
    const auth = this.getCurrentAuthenticationFromToken();
    // console.log('Auth from token:', auth);
    if (!auth) {
      this.logger.debug('Saved auth not found');
      return;
    }

    // call HTTP client indirectly otherwise you get circular DI problem
    // (Interceptor calls this service which calls HTTP in constructor which calls interceptor).
    setTimeout(() => {
      if (auth.roles.includes(Role.Admin)) {
        this.validateAdminToken(dispatch, auth);
      }
      else if (auth.roles.includes(Role.User)) {
        this.validateUserToken(dispatch, auth);
      }
    }, 100);
  }

  private validateAdminToken(dispatch: boolean, auth: Auth, navigateTarget?: string): void {
    this.logger.debug('Validating auth token (admin)');
    const successAction = LoginSuccessAction({auth, navigateTarget});
    const errorAction = LoginErrorAction({errorMessage: '?'});
    this.store.dispatch(AuthRoleTestAction({role: Role.Admin, onOkActions: [successAction], onErrorActions: [errorAction]}));
  }

  private validateUserToken(dispatch: boolean, auth: Auth, navigateTarget?: string): void {
    this.logger.debug('Validating auth token (user)');
    const successAction = LoginSuccessAction({auth, navigateTarget});
    const errorAction = LoginErrorAction({errorMessage: '?'});
    this.store.dispatch(AuthRoleTestAction({role: Role.User, onOkActions: [successAction], onErrorActions: [errorAction]}));
  }
}
