import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {select} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Company} from '@app/client-lib';
import {selectCompanies} from './company.selectors';
import {DataEntity} from '../../../store/data-entity';

@Injectable({
  providedIn: 'root',
})
export class CompanyDataService extends EntityCollectionServiceBase<Company> {
  populatedCompanies$ = this.entities$.pipe(select(selectCompanies));

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(DataEntity.Company, serviceElementsFactory);
  }
}
