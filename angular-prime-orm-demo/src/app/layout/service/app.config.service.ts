import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from '../appconfig';
import { LocalStorageService } from '../../core/service/local-storage.service';

export const DEFAULT_THEME = 'saga-blue';

export const DEFAULT_CONFIG: AppConfig = {
  theme: DEFAULT_THEME,
  dark: false,
  inputStyle: 'outlined',
  ripple: true,
};

@Injectable()
export class ConfigService {
  config!: AppConfig;

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.config = localStorageService.getAppConfig();
  }

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  updateConfig(config: AppConfig) {
    this.config = config;
    this.localStorageService.setAppConfig(config);
    this.configUpdate.next(config);
  }

  getConfig(): AppConfig {
    return this.config;
  }
}
