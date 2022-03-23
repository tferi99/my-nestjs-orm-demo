import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../../auth/store/auth.reducer';
import {LogoutAction} from '../../auth/store/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private store: Store<AuthState>,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.store.dispatch(LogoutAction());
  }
}
