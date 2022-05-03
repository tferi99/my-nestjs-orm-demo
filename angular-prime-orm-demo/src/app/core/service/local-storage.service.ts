import { NGXLogger } from 'ngx-logger';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public static LOC_STORE_KEY_AUTH_TOKEN = 'myTsOrmDemoAuthToken';

  constructor(private logger: NGXLogger) {}

  // ------------------------------- JWT auth token ------------------------------------
  setAuthToken(token: string): void {
    localStorage.setItem(LocalStorageService.LOC_STORE_KEY_AUTH_TOKEN, token);
  }

  deleteAuthToken(): void {
    localStorage.removeItem(LocalStorageService.LOC_STORE_KEY_AUTH_TOKEN);
  }

  getAuthToken(): string | undefined {
    const u = localStorage.getItem(LocalStorageService.LOC_STORE_KEY_AUTH_TOKEN);
    if (u) {
      return u;
    }
    return undefined;
  }
}


