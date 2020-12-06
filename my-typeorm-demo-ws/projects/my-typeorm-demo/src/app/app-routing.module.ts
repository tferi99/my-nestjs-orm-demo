import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './person/person.component';
import {PersonFormComponent} from './person/person-form/person-form.component';
import {PersonsResolverService} from './person/persons-resolver.service';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'person', component: PersonComponent, resolve: {persons: PersonsResolverService}},
  {path: 'person/new', component: PersonFormComponent},
  {path: 'person/:id/edit', component: PersonFormComponent},
  {path: '',   redirectTo: '/home', pathMatch: 'full' },   // default
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false })    // <-- debugging purposes only
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
