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
import {AppError} from '../core/error/app-error';
import {ServiceBase} from '../core/service/service.base';
import {AuthRoleTest, DateTimeUtils, JwtPayload, Role} from '@app/client-lib';
import {AuthWithExpiration} from './model/auth-with-expiration';

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
  private currentAuth?: AuthWithExpiration;
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

  initAuth(): boolean {
    this.logger.debug('----------------- initAuth() -----------------');
    return this.validateAuth();
  }

  getCurrentAuthenticationFromToken(): AuthWithExpiration | undefined {
    // if Auth already stored
    if (this.currentAuth) {
      if (this.currentAuth.expiration < Date.now()) {
        this.logger.warn('Auth expired: ' + JSON.stringify(this.currentAuth));
        this.currentAuth = undefined;
        return undefined;
      }
      return this.currentAuth;
    }

    // then check local storage
    this.authToken = this.getAuthToken();
    if (!this.authToken) {
      this.currentAuth = undefined;
      return undefined;
    }

    // parse JWT token and store into 
    const payload: JwtPayload = jwt_decode(this.authToken);
    console.log('Decoded JWT: ', payload);
    console.log('   Issued: ' + DateTimeUtils.formatTimestamp(payload.iat) + ', expired: ' + DateTimeUtils.formatTimestamp(payload.exp));
    this.currentAuth = {
      id: Number(payload.sub),
      name: payload.username,
      roles: payload.roles,
      expiration: payload.exp,
      issued:  payload.iat,
    };
    return this.currentAuth;
  }

  getAuthToken(): string | undefined {
    if (!this.authToken) {
      // not initialized/validated yet
      this.authToken = this.localStorageService.getAuthToken();
      console.log('AuthToken from local store: ' + this.authToken);
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

  private validateAuth(): boolean {
    const auth = this.getCurrentAuthenticationFromToken();
    // console.log('Auth from token:', auth);
    if (!auth) {
      this.logger.debug('Saved Auth not found');
      return false;
    }

    if (auth.expiration < Date.now()) {
      this.logger.warn('Saved Auth expired at: ' + DateTimeUtils.formatTimestamp(auth.expiration));
      return false;
    }
    return true;
    // call HTTP client indirectly otherwise you get circular DI problem
    // (Interceptor calls this service which calls HTTP in constructor which calls interceptor).
/*    setTimeout(() => {
      if (auth.roles.includes(Role.Admin)) {
        this.validateAdminToken(dispatch, auth);
      }
      else if (auth.roles.includes(Role.User)) {
        this.validateUserToken(dispatch, auth);
      }
    }, 300);

    // validate...Token() will check token
    // on error store/local storage will be cleaned + navigate to login page

    return true;*/
  }

/*  private validateAdminToken(dispatch: boolean, auth: Auth, navigateTarget?: string): void {
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
  }*/
}
