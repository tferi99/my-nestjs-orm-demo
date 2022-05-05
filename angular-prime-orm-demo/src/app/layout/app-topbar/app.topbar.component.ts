import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from '../app-main/app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { LogoutAction } from '../../auth/store/auth.actions';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  userMenuItems!: MenuItem[];

  constructor(
    public appMain: AppMainComponent,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userMenuItems = [
      {label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout()},
    ];
  }

  logout(): void {
    this.store.dispatch(LogoutAction());
  }
}
