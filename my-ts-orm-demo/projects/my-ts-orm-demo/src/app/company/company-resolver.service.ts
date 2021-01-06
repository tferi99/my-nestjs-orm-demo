import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CompanyService} from './company.service';
import {CompanyDto} from 'my-ts-orm-demo-lib';

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
