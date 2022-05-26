import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppMainComponent } from './layout/app-main/app.main.component';
import { AppTopBarComponent } from './layout/app-topbar/app.topbar.component';
import { AppFooterComponent } from './layout/app-footer/app.footer.component';
import { AppConfigComponent } from './layout/app-config/app.config.component';
import { AppMenuComponent } from './layout/app-menu/app.menu.component';
import { AppMenuitemComponent } from './layout/app-menu/app.menuitem.component';

import { DashboardComponent } from './layout/components/dashboard/dashboard.component';
import { MenuService } from './layout/service/app.menu.service';
import { ConfigService } from './layout/service/app.config.service';
import { Login2Component } from './layout/components/login/login2.component';
import { ErrorComponent } from './layout/components/error/error.component';
import { NotfoundComponent } from './layout/components/notfound/notfound.component';
import { AccessComponent } from './layout/components/access/access.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './store/entity-metadata';
import { LoggerModule } from 'ngx-logger';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromNote from './features/note/store/note.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { appReducer } from './store/app.reducer';
import { MessageService } from 'primeng/api';
import { AuthModule } from './auth/auth.module';
import { InputComponent } from './sandbox/components/input/input.component';
import { NodeService } from './sandbox/service/nodeservice';
import { CountryService } from './sandbox/service/countryservice';

import { APP_PRIMENG_MODULES, APP_PRIMENG_PROVIDERS } from './layout/primeng-modules';
import { HttpErrorInterceptor } from './core/error/http-error.interceptor';
import { HomeComponent } from './features/home/home.component';
import { CompanyModule } from './features/company/company.module';
import { ModalTestComponent } from './sandbox/components/modal-test/modal-test.component';
import { ModalTestFormComponent } from './sandbox/components/modal-test/modal-test-form/modal-test-form.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LoggerModule.forRoot({
            colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
            level: environment.logLevel,
            serverLogLevel: environment.serverLogLevel,
            disableConsoleLogging: false,
        }),

        // PrimeNG
        APP_PRIMENG_MODULES,

        /**
         * Store options
         *
         * If you want to save non-serialiable objects in store.
         * See also: https://nils-mehlhorn.de/posts/ngrx-store-unserializable-data
         */
        StoreModule.forRoot({app: appReducer}, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictStateSerializability: false,    // otherwise Date cannot be used
                strictActionSerializability: false,   // otherwise Date cannot be used
                strictActionWithinNgZone: true,
                strictActionTypeUniqueness: true,
            }
        }),
        StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducer),
        StoreModule.forFeature(fromNote.notesFeatureKey, fromNote.reducer),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

        EffectsModule.forRoot([]),
        EffectsModule.forFeature(
            [
                AuthEffects,
            ]
        ),
        EntityDataModule.forRoot(entityConfig),

        // features
        AuthModule,
        CompanyModule,
        ReactiveFormsModule,
    ],
  declarations: [
    AppComponent,
    AppMainComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    DashboardComponent,
    Login2Component,
    ErrorComponent,
    NotfoundComponent,
    AccessComponent,
    HomeComponent,

    // sandbox
    InputComponent,
     ModalTestComponent,
     ModalTestFormComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    APP_PRIMENG_PROVIDERS,
    MessageService,

    MenuService,
    ConfigService,
    CountryService,
    NodeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
