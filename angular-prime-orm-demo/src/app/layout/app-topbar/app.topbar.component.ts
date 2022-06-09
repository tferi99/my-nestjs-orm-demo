import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from '../app-main/app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { LogoutAction } from '../../auth/store/auth.actions';
import { LocalStorageService } from '../../core/service/local-storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  userMenuItems!: MenuItem[];

  constructor(
    public appMain: AppMainComponent,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.userMenuItems = [
      {label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout()},
    ];
  }

  logout(): void {
    this.store.dispatch(LogoutAction());
  }

  getThemeIcon(): string {
    return this.localStorageService.getDark() ? 'pi-sun' : 'pi-moon';
  }

  toggleDark(): void {
    this.localStorageService.setDark(!this.localStorageService.getDark());
  }
}
