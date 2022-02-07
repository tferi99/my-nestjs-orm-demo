import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CompanyService} from './company.service';
import {Company} from '@app/my-ts-orm-demo-lib';

@Injectable({
  providedIn: 'root'
})
export class CompaniesResolverService implements Resolve<Company[]> {
  constructor(
    private service: CompanyService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company[]> {
    return this.service.getAll();
  }
}
