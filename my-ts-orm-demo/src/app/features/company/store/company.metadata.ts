import { Company } from '@app/client-lib';
import { EntityMetadata } from '@ngrx/data';
import {DataEntity} from '../../../store/data-entity';

export const companyEntityMetadata: EntityMetadata<Company> = {
  entityName: DataEntity.Company,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
  filterFn: (entities, pattern) =>
    entities.filter(
      (entity) =>
        entity.name?.includes(pattern) || entity.name?.includes(pattern)
    ),
  entityDispatcherOptions: {optimisticDelete: false}
};
