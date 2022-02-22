import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './features/person/person.component';
import {PersonFormComponent} from './features/person/person-form/person-form.component';
import {HomeComponent} from './layout/home/home.component';
import {PersonResolverService} from './features/person/person-resolver.service';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {CompanyListComponent} from './features/company/company-list/company-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  data: { title: 'Login Page' }},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: "company", component: CompanyListComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },

  { path: "person", runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
    {path: '', component: PersonComponent},
    {path: 'new', component: PersonFormComponent},
    {path: ':id/edit', component: PersonFormComponent, resolve: {person: PersonResolverService}},
  ]},
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
