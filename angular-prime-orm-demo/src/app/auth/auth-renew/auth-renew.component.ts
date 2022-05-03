import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AppState} from '../../store/app.reducer';
import {Action, Store} from '@ngrx/store';
import {LoginSuccessAction, LogoutAction, RenewAction, RenewSuccessAction} from '../store/auth.actions';
import {CHANGE_DETECTION_STRATEGY} from '../../app.constants';
import {Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {AuthWithExpiration} from '../model/auth-with-expiration';
import {map, tap} from 'rxjs/operators';

const RENEW_RATIO = 0.8;

/**
 * Put this component OUTSIDE of other OnPush root components.
 */
@Component({
  selector: 'app-auth-renew',
  template: ``,
  styles: [],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class AuthRenewComponent implements OnInit, OnDestroy {
  @Input() trace = false;

  authSuccessActionsSub?: Subscription;
  authLogoutActionSub?: Subscription;
  waitTime = 0;
  active = false;

  loop = 0; // inactive
  constructor(
    private store: Store<AppState>,
    private actions$: Actions<Action>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSuccessActionsSub = this.actions$.pipe(
      ofType(LoginSuccessAction, RenewSuccessAction),
      map(action => action.auth),
      tap(auth => this.callRenew(auth))
    ).subscribe();

    this.authLogoutActionSub = this.actions$.pipe(
      ofType(LogoutAction),
      tap(auth => {
        this.active = false;
        if (this.trace) {
          console.log('Renew deactivated');
        }
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    if (this.authSuccessActionsSub) {
      this.authSuccessActionsSub.unsubscribe();
      this.authSuccessActionsSub = undefined;
    }
    if (this.authLogoutActionSub) {
      this.authLogoutActionSub.unsubscribe();
      this.authLogoutActionSub = undefined;
    }
  }

  callRenew(auth: AuthWithExpiration): void {
    this.active = true;
    this.waitTime = (auth.expiration - Date.now()) * RENEW_RATIO;
    if (this.trace) {
      console.log('Renew wait: ' + this.waitTime);
    }
    setTimeout(() => {
      if (this.active) {
        if (this.trace) {
          console.log('--> renew');
        }
        this.store.dispatch(RenewAction());
      } else {
        if (this.trace) {
          console.log('ignoring renew (logged out)');
        }
      }
    }, this.waitTime);
  }
}
