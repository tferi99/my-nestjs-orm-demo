import {Company, Person} from '@app/client-lib';
import {createSelector} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {EntitySelectorsFactory} from '@ngrx/data';
import {DataEntity} from '../../../store/data-entity';
import {Dictionary} from '@ngrx/entity';
import {OneToManyAssociation} from '../../../core/store/store-utils';
import {COMPANY_ID_RUBBISH_BIN, COMPANY_ID_UNEMPLOYED} from '../company.constants';

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

    //return Array.from(companiesMap.values());
    return [...companiesMap.values()];
  });

export const selectCompaniesWithPersonsAssoc = createSelector<AppState, Dictionary<Company>, Person[], OneToManyAssociation<Company, Person>[]>(
  companySelectors.selectEntityMap,
  personSelectors.selectEntities,
  (companies: Dictionary<Company>, persons: Person[]) => {
    console.log('COMPANIES: ', companies);
    const resultMap: Map<string, OneToManyAssociation<Company, Person>> = new Map<string, OneToManyAssociation<Company, Person>>();
    for (let key in companies) {
      //console.log('ITER: ' + key,  companies[key]);
      const c: Company = companies[key] as Company;
      if (companies[key] !== undefined) {
        resultMap.set(key, {parent: c, children: []});
      }
    }
    console.log('COMPANIES_MAP: ', resultMap);

    const notAssigned: Person[] = [];
    persons.forEach(person => {
      if (person.company === undefined || person.company === null) {
        notAssigned.push(person);
      } else {
        const id = (person.company as any).toString();
        const target: OneToManyAssociation<Company, Person> = resultMap.get(id) as OneToManyAssociation<Company, Person>;
        console.log('ID: ' + id, target);
        if (target) {
          target.children.push(person);
        } else {
          notAssigned.push(person);
        }
      }
    });

    console.log('RESULT_MAP: ', resultMap);
    console.log('UN: ', notAssigned);
    const result = [...resultMap.values()];

    result.sort((a: OneToManyAssociation<Company, Person>, b: OneToManyAssociation<Company, Person>) => a.parent.name.toLocaleLowerCase().localeCompare(b.parent.name.toLocaleLowerCase()));

    // special targets
    const d = new Date();

    // Unemployed
    const unemployed: Company = { name: 'Unemployed', workers: [], id: COMPANY_ID_UNEMPLOYED, active: true, established: d, created: d, updated: d, note: ''};
    result.push({parent: unemployed, children: notAssigned});
    console.log('RESULT: ', result);
    return result;
  });
