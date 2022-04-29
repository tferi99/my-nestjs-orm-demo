import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from './auth/store/auth.reducer';
import {AppInitAction} from './init/store/init.actions';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '[ My NestJs ORM Demo ]';

  constructor(
    private store: Store<AuthState>,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AppInitAction());
    this.titleService.setTitle(this.title);
  }
}
