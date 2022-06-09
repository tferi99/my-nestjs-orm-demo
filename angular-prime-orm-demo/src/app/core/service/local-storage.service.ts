import { NGXLogger } from 'ngx-logger';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public static LOC_STORE_KEY_AUTH_TOKEN = 'myTsOrmDemoAuthToken';
  public static LOC_STORE_KEY_THEME_DARK = 'themeDark';

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
  setDark(dark: boolean): void {
    this.setValue(LocalStorageService.LOC_STORE_KEY_THEME_DARK, String(dark));
  }

  getDark(): boolean {
    return (this.getValue(LocalStorageService.LOC_STORE_KEY_THEME_DARK) === 'true');
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


