import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CompanyDto} from 'my-typeorm-demo-lib';
import {Observable} from 'rxjs';
import {CompanyService} from './company.service';

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
