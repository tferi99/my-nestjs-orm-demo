import {Person} from '@app/client-lib';
import {EntityMetadata} from '@ngrx/data';

export const personEntityMetadata: EntityMetadata<Person> = {
  entityName: 'Person',
  sortComparer: (a, b) => a.name.localeCompare(b.name),
  filterFn: (entities, pattern) =>
    entities.filter(
      (entity) =>
        entity.name?.includes(pattern) || entity.name?.includes(pattern)
    ),
};
