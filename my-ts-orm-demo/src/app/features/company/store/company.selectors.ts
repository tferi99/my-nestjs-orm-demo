import {Company} from '@app/client-lib';
import {createSelector} from '@ngrx/store';

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
