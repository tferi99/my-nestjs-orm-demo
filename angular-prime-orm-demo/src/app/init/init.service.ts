import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';
import {AuthService} from '../auth/auth.service';
import {AppState} from '../store/app.reducer';
import { ToastrService } from '../prime-core/service/toastr.service';
import { TOASTR_DISTINCT_TIME } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  constructor(
    private logger: NGXLogger,
    private authService: AuthService,
    private toastrService: ToastrService,
    private store: Store<AppState>
  ) {}

  init() {
    this.logger.log('===================== APP INIT =====================');
    this.toastrService.config({
      distinctTime: TOASTR_DISTINCT_TIME
    })
    this.authService.init();
  }
}
