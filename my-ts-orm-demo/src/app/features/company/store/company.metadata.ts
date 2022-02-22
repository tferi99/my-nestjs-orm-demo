import { Company } from '@app/client-lib';
import { EntityMetadata } from '@ngrx/data';

export const companyEntityMetadata: EntityMetadata<Company> = {
  entityName: 'Company',
  sortComparer: (a, b) => a.name.localeCompare(b.name),
  filterFn: (entities, pattern) =>
    entities.filter(
      (entity) =>
        entity.name?.includes(pattern) || entity.name?.includes(pattern)
    ),
  entityDispatcherOptions: {optimisticDelete: false}
};
