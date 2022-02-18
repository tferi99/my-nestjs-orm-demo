import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {select} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Company} from '@app/client-lib';
import {selectCompanies} from './company.selectors';

@Injectable({
  providedIn: 'root',
})
export class CompanyDataService extends EntityCollectionServiceBase<Company> {
  populatedCompanies$ = this.entities$.pipe(select(selectCompanies));

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Company', serviceElementsFactory);
  }
}
