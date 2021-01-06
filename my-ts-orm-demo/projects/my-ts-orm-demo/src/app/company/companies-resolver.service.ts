import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CompanyService} from './company.service';
import {CompanyDto} from 'my-ts-orm-demo-lib';

@Injectable({
  providedIn: 'root'
})
export class CompaniesResolverService implements Resolve<CompanyDto[]> {
  constructor(
    private service: CompanyService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompanyDto[]> {
    return this.service.getAll();
  }
}
