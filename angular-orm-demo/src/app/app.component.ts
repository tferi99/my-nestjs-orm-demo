import {Component, OnInit} from '@angular/core';
import {Person} from '@app/client-lib';
import {InitService} from './init/init.service';
import {LogoutAction} from './auth/store/auth.actions';
import {Store} from '@ngrx/store';
import {AuthState} from './auth/store/auth.reducer';
import {AppInitAction} from './init/store/init.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-nestjs-orm-demo';

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.store.dispatch(AppInitAction());
  }
}
