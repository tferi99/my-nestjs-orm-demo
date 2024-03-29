import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {Injectable} from '@angular/core';
import {Person} from '@app/client-lib';
import {DataEntity} from '../../../store/data-entity';

@Injectable({
  providedIn: 'root',
})
export class PersonDataService extends EntityCollectionServiceBase<Person> {
/*  //personOfCompany$ = this.entities$.pipe(select(selectCompanies));
  personOfCompany$ = this.selectors$.count$;*/
  //e = this.selectors$.

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(DataEntity.Person, serviceElementsFactory);
  }
}
