import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {LogoutAction, RenewAction} from '../../auth/store/auth.actions';
import {Observable} from 'rxjs';
import {selectAuthentication, selectIsAuthenticated} from '../../auth/store/auth.selectors';
import {Auth} from '@app/client-lib';
import {AppState} from '../../store/app.reducer';
import {CHANGE_DETECTION_STRATEGY} from '../../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class HeaderComponent implements OnInit {
  @Input() title = '?';

  authenticated$: Observable<boolean> = this.store.pipe(select(selectIsAuthenticated));
  auth$: Observable<Auth | undefined> = this.store.pipe(select(selectAuthentication));

  isCollapsed = true;
  isCollapsedMenu = true;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  logout(): void {
    this.store.dispatch(LogoutAction());
  }

  getDummy(): string {
    console.log('getDummy() - if you see this often then check CHANGE_DETECTION_STRATEGY');
    return 'dummy';
  }

  renew() {
    this.store.dispatch(RenewAction());
  }
}
