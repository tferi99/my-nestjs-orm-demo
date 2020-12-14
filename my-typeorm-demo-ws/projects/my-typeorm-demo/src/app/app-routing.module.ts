import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './person/person.component';
import {PersonFormComponent} from './person/person-form/person-form.component';
import {PersonsResolverService} from './person/persons-resolver.service';
import {HomeComponent} from './home/home.component';
import {PersonResolverService} from './person/person-resolver.service';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'person', component: PersonComponent, resolve: {persons: PersonsResolverService}, runGuardsAndResolvers: 'always'},
  {path: 'person/new', component: PersonFormComponent},
  {path: 'person/:id/edit', component: PersonFormComponent, resolve: {person: PersonResolverService}},
  {path: '',   redirectTo: '/home', pathMatch: 'full' },   // default
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,                  // <-- debugging purposes only
      onSameUrlNavigation: 'reload',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
