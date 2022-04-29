import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {CompanyListComponent} from './features/company/company-list/company-list.component';
import {PersonListComponent} from './features/person/person-list/person-list.component';
import {CompanyBoardComponent} from './features/company/company-board/company-board.component';
import {SandboxComponent} from './features/sandbox/sandbox/sandbox.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  data: { title: 'Login Page' }},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: "companyBoard", component: CompanyBoardComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: "company", component: CompanyListComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: "person", component: PersonListComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
  { path: "sandbox", component: SandboxComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},

  {path: '',   redirectTo: '/home', pathMatch: 'full' },   // default
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,                  // <-- debugging purposes only
      onSameUrlNavigation: 'reload',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
