import {Injectable} from '@angular/core';
import {LocalStorageService} from '../core/service/local-storage.service';
import jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {LoginResult} from './model/login-result';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from './store/auth.reducer';
import {ServiceBase} from '../core/service/service.base';
import {JwtPayload} from '@app/client-lib';
import {AuthWithExpiration} from './model/auth-with-expiration';
import {AuthInitilizedAction} from './store/auth.actions';
import {HttpClient} from '@angular/common/http';

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
  /**
   *  cached JWT token
   */
  private authToken?: string;

  /**
   * Cached Auth (retrieved from JWT token)
   */
  private currentAuth?: AuthWithExpiration;

  //private testRefId = 0;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private logger: NGXLogger,
    private router: Router,
    private store: Store<AuthState>
  ) {
      super(http, '/auth');
  }

  /**
   * To initialize Auth for AuthGuard or during reloading application (F5).
   * It returns 'true' if Auth initialized successfully.
   *
   * It only uses local cached Auth, that:
   *  - cached by this service
   *  - created from JWT token stored into local storage
   */
  public init(): boolean {
    this.logger.debug('Auth initialication');
    const auth = this.getCurrentAuth();
    if (auth) {
      this.store.dispatch(AuthInitilizedAction({auth}));
      return true;
    }
    return false;
  }

  /**
   * It returns JWT Auth token from:
   *  - local cache
   *  - local storage
   */
  getAuthToken(): string | undefined {
    if (!this.authToken) {
      this.authToken = this.localStorageService.getAuthToken();
      //console.log('AuthToken from local store: ' + this.authToken);
    }
    return this.authToken;
  }

  /**
   * To get current cached Auth.
   *
   * It returns 'undefined' if no cached Auth found or it's expired.
   *
   */
  getCurrentAuth(): AuthWithExpiration | undefined {
    if (!this.currentAuth) {
      // if Auth not cached here get from cached token
      this.authToken = this.getAuthToken();
      if (!this.authToken) {
        // if not cached and not found in local storage then local cached Auth also will be deleted
        this.currentAuth = undefined;
        return undefined;
      }

      // JWT token found -> create Auth
      this.currentAuth = this.createAuthFromToken(this.authToken);
    }


    if (this.currentAuth.expiration < Date.now()) {
      this.logger.warn('Auth expired -> cleaned: ' + JSON.stringify(this.currentAuth));
      this.clearAuthentication();
      return undefined;
    }
    return this.currentAuth;
  }

  clearAuthentication(): void {
    this.authToken = undefined;
    this.currentAuth = undefined;
    this.localStorageService.deleteAuthToken();
  }

  login(username: string, password: string): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.getBasePath() + '/login', { username, password });
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.getBasePath() + '/logout', {});
  }

  /**
   * It parses JWT token and creates Auth.
   *
   * @param authToken
   * @private
   */
  private createAuthFromToken(authToken: string): AuthWithExpiration {
    const payload: JwtPayload = jwt_decode(authToken);
    //console.log('Decoded JWT: ', payload);
    const auth: AuthWithExpiration = {
      id: Number(payload.sub),
      name: payload.username,
      roles: payload.roles,
      expiration: payload.exp * 1000,
      issued:  payload.iat * 1000,
    };
    //console.log('   Issued: ' + DateTimeUtils.formatTimestamp(auth.issued) + ', expired: ' + DateTimeUtils.formatTimestamp(auth.expiration));
    //console.log('   NowTS: ' + DateTimeUtils.formatTimestamp(Date.now()) + ', NowDate: ' + DateTimeUtils.formatDate(new Date()));
    return auth;
  }
}
