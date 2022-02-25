import {Company, Person} from '@app/client-lib';
import {createSelector} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {EntitySelectorsFactory} from '@ngrx/data';
import {DataEntity} from '../../../store/data-entity';

const companySelectors = new EntitySelectorsFactory().create<Company>(DataEntity.Company);
const personSelectors = new EntitySelectorsFactory().create<Person>(DataEntity.Person);


export const selectCompanies = createSelector<Company[], Company[], Company[]>(
  (companies) => companies,
  (companies: Company[]) =>
    companies.reduce<Company[]>(
      (prev, cur) => {
        prev.push(cur);
        // add persons here
        //prev[cur.column].sort((a, b) => a.order - b.order);
        return prev;
      },
      []
));

/*export const selectCompaniesWithPersons = createSelector<AppState, Company[], Person[]>(
  companySelectors.selectEntities,
  personSelectors.selectEntities,
  (companies: Company[], persons: Person[]) => {
    persons.map(person => {

    });
    return
  }
);
*/
