import {Company, Person} from '@app/client-lib';
import {createSelector} from '@ngrx/store';
import {EntitySelectorsFactory} from '@ngrx/data';
import {AppState} from '../../../store/app.reducer';


const companySelectors = new EntitySelectorsFactory().create<Company>('Company');
const personSelectors = new EntitySelectorsFactory().create<Person>('Person');

export const selectPersonsWithCompany = createSelector<AppState, Person[], Company[], Person[]>(
  personSelectors.selectEntities,
  companySelectors.selectEntities,
  (persons: Person[], companies: Company[]) =>
    persons.map(p => ({
      ...p
//      company: companies[p!.company!.id],
    }))
);
