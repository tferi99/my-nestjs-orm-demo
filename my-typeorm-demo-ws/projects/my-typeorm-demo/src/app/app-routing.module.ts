import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './person/person.component';
import {PersonFormComponent} from './person/person-form/person-form.component';
import {PersonsResolverService} from './person/persons-resolver.service';
import {HomeComponent} from './home/home.component';
import {PersonResolverService} from './person/person-resolver.service';
import {CompanyComponent} from './company/company.component';
import {CompaniesResolverService} from './company/companies-resolver.service';
import {CompanyResolverService} from './company/company-resolver.service';
import {CompanyFormComponent} from './company/company-form/company-form.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: 'person', component: PersonComponent, resolve: {persons: PersonsResolverService}, runGuardsAndResolvers: 'always'},
  {path: 'person/new', component: PersonFormComponent},
  {path: 'person/:id/edit', component: PersonFormComponent, resolve: {person: PersonResolverService}},

  {path: 'company', component: CompanyComponent, resolve: {companies: CompaniesResolverService}, runGuardsAndResolvers: 'always'},
  {path: 'company/new', component: CompanyFormComponent},
  {path: 'company/:id/edit', component: CompanyFormComponent, resolve: {company: CompanyResolverService}},

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
