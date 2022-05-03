import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './layout/components/dashboard/dashboard.component';
import { AppMainComponent } from './layout/app-main/app.main.component';
import { LoginComponent } from './layout/components/login/login.component';
import { ErrorComponent } from './layout/components/error/error.component';
import { NotfoundComponent } from './layout/components/notfound/notfound.component';
import { AccessComponent } from './layout/components/access/access.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './auth/auth.guard';

/*const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [{ path: '', component: DashboardComponent }],
  },
  { path: 'pages/login', component: LoginComponent },
  { path: 'pages/error', component: ErrorComponent },
  { path: 'pages/notfound', component: NotfoundComponent },
  { path: 'pages/access', component: AccessComponent },

  { path: '',   redirectTo: '/home', pathMatch: 'full' },   // default
  { path: '**', redirectTo: 'pages/notfound' },
];*/

const routes: Routes = [
  { path: 'login', component: LoginComponent,  data: { title: 'Login Page' }},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
/*  { path: "companyBoard", component: CompanyBoardComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: "company", component: CompanyListComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: "person", component: PersonListComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
  { path: "sandbox", component: SandboxComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},*/

  { path: '',   redirectTo: '/home', pathMatch: 'full' },   // default
];

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
