import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CompanyDto, PersonDto} from 'my-typeorm-demo-lib';
import {PersonService} from '../person/person.service';
import {Observable} from 'rxjs';
import {CompanyService} from './company.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyResolverService implements Resolve<CompanyDto> {
  constructor(
    private service: CompanyService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompanyDto> {
    const id = route.params.id;
    console.log('CompanyResolverService id:' + id);
    return this.service.get(id);
  }
}
