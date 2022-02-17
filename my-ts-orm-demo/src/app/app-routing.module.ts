import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './person/person.component';
import {PersonFormComponent} from './person/person-form/person-form.component';
import {PersonsResolverService} from './person/persons-resolver.service';
import {HomeComponent} from './home/home.component';
import {PersonResolverService} from './person/person-resolver.service';
import {CompanyResolverService} from './company/company-resolver.service';
import {CompanyFormComponent} from './company/company-form/company-form.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {CompanyBoardComponent} from './company/company-board/company-board.component';
import {CompanyComponent} from './company/company.component';
import {CompaniesResolverService} from './company/companies-resolver.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  data: { title: 'Login Page' }},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: "person", runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
    {path: '', component: PersonComponent, resolve: {persons: PersonsResolverService}},
    {path: 'new', component: PersonFormComponent},
    {path: ':id/edit', component: PersonFormComponent, resolve: {person: PersonResolverService}},
  ]},
  { path: "company", runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
    {path: '', component: CompanyComponent, resolve: {companies: CompaniesResolverService}, runGuardsAndResolvers: 'always'},
    {path: 'new', component: CompanyFormComponent},
    {path: ':id/edit', component: CompanyFormComponent, resolve: {company: CompanyResolverService}},
  ]},
  {path: 'company-board', component: CompanyBoardComponent},
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
