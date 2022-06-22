import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeComponent } from './layout/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';
import { LoggerModule } from 'ngx-logger';
import { HttpErrorInterceptor } from './core/error/http-error.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './auth/auth.module';
import { ValidatorErrorMessageDirective } from './core/directive/validator-error-message.directive';
import { ErrorMessageComponent } from './core/error/error-message/error-message.component';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './store/entity-metadata';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderComponent } from './layout/header/header.component';
import { CompanyModule } from './features/company/company.module';
import { CoreModule } from './core/core.module';
import { ModalModule } from "ngx-bootstrap/modal";
import { PersonModule } from './features/person/person.module';
import { appReducer } from './store/app.reducer';
import { MomentModule } from 'ngx-moment';
import { FooterComponent } from './layout/footer/footer.component';
import { NoteModule } from './features/note/note.module';
import * as fromNote from './features/note/store/note.reducer';
import { SandboxModule } from './features/sandbox/sandbox.module';

@NgModule({
  declarations: [
    AppComponent,
    ValidatorErrorMessageDirective,
    ErrorMessageComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    PopoverModule.forRoot(),
    LoggerModule.forRoot({
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false,
    }),
    AppRoutingModule,

    // ngx
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    MomentModule,

    /**
     * Store options
     *
     * If you want to save non-serialiable objects in store.
     * See also: https://nils-mehlhorn.de/posts/ngrx-store-unserializable-data
     */
    StoreModule.forRoot(appReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,    // otherwise Date cannot be used
        strictActionSerializability: false,   // otherwise Date cannot be used
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),

    // features
    CoreModule,
    AuthModule,
    CompanyModule,
    PersonModule,
    NoteModule,
    SandboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
