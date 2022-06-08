import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { AuthState } from './auth/store/auth.reducer';
import { Title } from '@angular/platform-browser';
import { AppInitAction } from './init/store/init.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  menuMode = 'static';
  title = '[ My NestJs PrimeNG Demo ]';

  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store<AuthState>,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';

    this.store.dispatch(AppInitAction());
    this.titleService.setTitle(this.title);
  }
}
