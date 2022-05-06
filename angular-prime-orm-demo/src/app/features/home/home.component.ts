import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../../auth/store/auth.reducer';
import {LogoutAction} from '../../auth/store/auth.actions';
import {CHANGE_DETECTION_STRATEGY} from '../../app.constants';
import { ToastrService } from '../../prime-core/service/toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class HomeComponent implements OnInit {

  constructor(
    private store: Store<AuthState>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.store.dispatch(LogoutAction());
  }

  info() {
    this.toastrService.info('This is info Toastr');
  }
}
