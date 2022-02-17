import {Component, OnInit} from '@angular/core';
import {Person} from '@app/client-lib';
import {InitService} from './init/init.service';
import {LogoutAction} from './auth/store/auth.actions';
import {Store} from '@ngrx/store';
import {AuthState} from './auth/store/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-typeorm-demo';
  isCollapsed = true;
  isCollapsedMenu = true;

  constructor(private initService: InitService, private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.initService.init();
  }

  logout(): void {
    this.store.dispatch(LogoutAction());
  }
}
