import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../app-main/app.main.component';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { LogoutAction } from '../../auth/store/auth.actions';
import { ThemeService } from '../service/theme.service';
import { ConfigService } from '../service/app.config.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  userMenuItems!: MenuItem[];

  constructor(
    public appMain: AppMainComponent,
    private store: Store<AppState>,
    private configService: ConfigService,
    private themeService: ThemeService,
    private logger: NGXLogger,
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
    const cfg = this.configService.getConfig();
    return cfg.dark ? 'pi-sun' : 'pi-moon';
  }

  toggleDark(): void {
    const cfg = this.configService.getConfig();
    cfg.dark = !cfg.dark;
    this.logger.debug('Switching to dark theme:' + cfg.dark);
    const dark = this.themeService.switchToDefaultTheme(cfg.dark);
  }

  switchTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }

  dumpConfig() {
    console.log('CONFIG: ', this.configService.getConfig());
  }
}
