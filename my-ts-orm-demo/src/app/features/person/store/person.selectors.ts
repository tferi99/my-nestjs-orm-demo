import {Company, Person} from '@app/client-lib';
import {createSelector} from '@ngrx/store';
import {EntityCollection, EntitySelectorsFactory} from '@ngrx/data';
import {AppState} from '../../../store/app.reducer';

const companySelectors = new EntitySelectorsFactory().create<Company>('Company');
const personSelectors = new EntitySelectorsFactory().create<Person>('Person');

/**
 * Company ID (number) is sent by backend instead of Company in Person.company.
 * So we can use it as ID in entities.
 */
export const selectPersonsWithCompany = createSelector<AppState, Person[], EntityCollection<Company>, Person[]>(
  personSelectors.selectEntities,
  companySelectors.selectCollection,
  (persons: Person[], companies: EntityCollection<Company>) => {
    //console.log('persons:', persons);
    //console.log('companies:', companies.entities);

    return persons.map(p => {
      const id: number = p.company as any;
      return {
        ...p,
        company: companies.entities[id],
      }
    })
  }
);
