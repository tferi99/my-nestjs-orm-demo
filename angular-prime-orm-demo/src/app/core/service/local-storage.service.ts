import { NGXLogger } from 'ngx-logger';
import {Injectable} from '@angular/core';
import { AppConfig } from '../../layout/appconfig';
import { DEFAULT_CONFIG } from '../../layout/service/app.config.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public static LOC_STORE_KEY_AUTH_TOKEN = 'auth';
  public static LOC_STORE_KEY_APP_CONFIG = 'appConfig';

  constructor(private logger: NGXLogger) {}

  // ------------------------------- JWT auth token ------------------------------------
  setAuthToken(token: string): void {
    this.setValue(LocalStorageService.LOC_STORE_KEY_AUTH_TOKEN, token);
  }

  deleteAuthToken(): void {
    this.delete(LocalStorageService.LOC_STORE_KEY_AUTH_TOKEN);
  }

  getAuthToken(): string | undefined {
    return this.getValue(LocalStorageService.LOC_STORE_KEY_AUTH_TOKEN);
  }

  // ------------------------------- dark theme ------------------------------------
  setAppConfig(cfg: AppConfig): void {
    this.setValue(LocalStorageService.LOC_STORE_KEY_APP_CONFIG, JSON.stringify(cfg));
  }

  getAppConfig(): AppConfig {
    const cfgStr = this.getValue(LocalStorageService.LOC_STORE_KEY_APP_CONFIG);
    return cfgStr ? JSON.parse(cfgStr) : DEFAULT_CONFIG;
  }

  // ------------------------------- helpers ------------------------------------
  private getValue(key: string): string | undefined {
    const val = localStorage.getItem(key);
    return val ? val : undefined;
  }

  private setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private delete(key: string): void {
    localStorage.removeItem(key);
  }
}


