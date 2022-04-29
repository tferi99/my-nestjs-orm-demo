import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './service/app.config.service';
import { AppMainComponent } from './app.main.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { MenuService } from './service/app.menu.service';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigComponent } from './app.config.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMenuComponent } from './app.menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ConfigService,
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
