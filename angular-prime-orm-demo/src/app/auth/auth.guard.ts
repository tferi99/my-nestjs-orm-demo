import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {LocalStorageService} from '../core/service/local-storage.service';
import {AuthService} from './auth.service';
import {AuthState} from './store/auth.reducer';
import {Store} from '@ngrx/store';
import {selectIsAuthenticated} from './store/auth.selectors';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class  AuthGuard implements CanActivate {
  inited = false;

  constructor(
    private router: Router,
    private logger: NGXLogger,
    private store: Store<AuthState>,
    private authService: AuthService
  ) {}

  canActivate(): boolean | Observable<boolean> {
    if (this.inited) {
      this.logger.info('AuthGuard?');
    }
    //return true;

    this.logger.info('AuthGuard?');
    return this.store.select(selectIsAuthenticated).pipe(
      tap(authenticated => this.logger.log('Authenticated: ', authenticated)),
      map(authenticated => {
        if (!authenticated) {
          if (!this.authService.init()) {
            this.router.navigateByUrl('/login');
            return false;
          }
        }
        return true;
      })
    );
  }

/*  private fallbackFromLocalStorege(): boolean {
    const token = this.authService.valid
  }*/
}

