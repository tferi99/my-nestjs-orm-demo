import {Person} from '@app/client-lib';
import {createSelector} from '@ngrx/store';

export const selectPersons = createSelector<Person[], Person[], Person[]>(
  (persons) => persons,
  (persons: Person[]) =>
    persons.reduce<Person[]>(
      (prev, cur) => {
        prev.push(cur);
        // add persons here
        //prev[cur.column].sort((a, b) => a.order - b.order);
        return prev;
      },
      []
));
