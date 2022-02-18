import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {LogoutAction} from '../../auth/store/auth.actions';
import {AppState} from '../../store/app.state';
import {Observable} from 'rxjs';
import {selectAuthentication, selectIsAuthenticated} from '../../auth/store/auth.selectors';
import {Auth} from '@app/client-lib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
}
