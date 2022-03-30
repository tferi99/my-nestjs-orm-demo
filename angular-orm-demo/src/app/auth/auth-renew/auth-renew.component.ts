import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {RenewAction} from '../store/auth.actions';
import {CHANGE_DETECTION_STRATEGY} from '../../app.constants';

const RENEW_RATIO = 0.8;

/**
 * Put this component OUTSIDE of other OnPush root components.
 */
@Component({
  selector: 'app-auth-renew',
  templateUrl: './auth-renew.component.html',
  styleUrls: ['./auth-renew.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class AuthRenewComponent implements OnInit {
  @Input() trace = false;

  loop = 0; // inactive
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    const auth = this.authService.getCurrentAuth();
    if (auth) {
      this.loop = (auth.expiration - Date.now()) * RENEW_RATIO * 10;
    }
  }

  callRenew(): string {
    this.store.dispatch(RenewAction());
    if (this.trace) {
      return 'Renew interval: ' + this.loop;
    }
    return '';
  }
}
