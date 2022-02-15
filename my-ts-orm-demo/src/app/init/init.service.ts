import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  constructor(
    private logger: NGXLogger,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  init() {
    this.logger.log('===================== APP INIT =====================');
    this.authService.init();
  }
}
