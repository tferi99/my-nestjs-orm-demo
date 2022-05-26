import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './layout/components/dashboard/dashboard.component';
import { AppMainComponent } from './layout/app-main/app.main.component';
import { Login2Component } from './layout/components/login/login2.component';
import { ErrorComponent } from './layout/components/error/error.component';
import { NotfoundComponent } from './layout/components/notfound/notfound.component';
import { AccessComponent } from './layout/components/access/access.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { InputComponent } from './sandbox/components/input/input.component';
import { TestComponent } from './test/test.component';
import { CompanyListComponent } from './features/company/company-list/company-list.component';
import {
  CompanyModalFormComponent
} from './features/company/company-edit/company-modal-form/company-modal-form.component';
import { ModalTestComponent } from './sandbox/components/modal-test/modal-test.component';


const routes: Routes = [
  { path: '',   redirectTo: '/company', pathMatch: 'full' },   // default

  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AppMainComponent,
    canActivate: [AuthGuard],
    children: [

      { path: '', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: "company", component: CompanyListComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
      { path: 'input', component: InputComponent },
    ],
  },
  { path: 'pages/error', component: ErrorComponent },
  { path: 'pages/notfound', component: NotfoundComponent },
  { path: 'pages/access', component: AccessComponent },

  { path: 'sandbox/input', component: InputComponent },
  { path: 'sandbox/modaltest', component: ModalTestComponent },

  { path: '**', redirectTo: 'pages/notfound' },
];

/*const routes: Routes = [
  { path: 'login', component: LoginComponent,  data: { title: 'Login Page' }},
  {
    path: '',
    component: AppMainComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },
  { path: 'home2', component: HomeComponent, canActivate: [AuthGuard]},

  { path: '',   redirectTo: '/home', pathMatch: 'full' },   // default
];*/

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
