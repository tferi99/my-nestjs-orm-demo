import {Company, Person} from '@app/client-lib';
import {createSelector} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {EntitySelectorsFactory} from '@ngrx/data';
import {DataEntity} from '../../../store/data-entity';
import {Dictionary} from '@ngrx/entity';
import * as _ from 'lodash';


const factory = new EntitySelectorsFactory();

const companySelectors = factory.create<Company>(DataEntity.Company);

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

export const selectCompaniesMod = createSelector<AppState, Company[], Company[]>(
  companySelectors.selectEntities,
  (companies: Company[]) => {
    const companies2 = [...companies].map(item => ({...item}));
    companies2.forEach(company => {
      company.name += ' X';
      console.log('C: ', company);
    });
    return companies2;
  }
);

export interface CompanyView {
  [key: string]: Company;
}

export const selectCompaniesWithPersons = createSelector<AppState, Dictionary<Company>, Person[], Company[]>(
  companySelectors.selectEntityMap,
  personSelectors.selectEntities,
  (companies: Dictionary<Company>, persons: Person[]) => {
    console.log('COMPANIES: ', companies);
    const companiesMap = new Map<string, Company>();
    for (let key in companies) {
      //console.log('ITER: ' + key,  companies[key]);
      const c: Company = companies[key] as Company;
      if (companies[key] !== undefined) {
        companiesMap.set(key, {...c});
      }
    }
    console.log('COMPANIES_MAP: ', companiesMap);

    const notAssigned: Person[] = [];
    persons.forEach(person => {
      if (person.company === undefined || person.company === null) {
        notAssigned.push(person);
      } else {
        const id = (person.company as any).toString();
        const target: Company = companiesMap.get(id) as Company;
        console.log('ID: ' + id, target);
        if (target) {
          if (target.workers === undefined) {
            target.workers = [];
          }
          target.workers.push(person);
        } else {
          notAssigned.push(person);
        }
      }
    });

    if (notAssigned.length > 0) {
      const d = new Date();
      const noCompany: Company = { name: 'Unemployed', workers: notAssigned, id: 0, active: true, established: d, created: d, updated: d, note: ''};
      companiesMap.set('u', noCompany);
    }
    console.log('RESULT: ', companiesMap);
    console.log('UN: ', notAssigned);

    return Array.from(companiesMap.values());
  });

