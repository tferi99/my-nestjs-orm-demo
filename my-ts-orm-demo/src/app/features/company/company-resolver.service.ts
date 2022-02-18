import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CompanyService} from './company.service';
import {Company} from '@app/client-lib';

@Injectable({
  providedIn: 'root'
})
export class CompanyResolverService implements Resolve<Company> {
  constructor(
    private service: CompanyService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company> {
    const id = route.params.id;
    console.log('CompanyResolverService id:' + id);
    return this.service.get(id);
  }
}
