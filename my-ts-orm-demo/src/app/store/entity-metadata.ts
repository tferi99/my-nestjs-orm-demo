import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import {companyEntityMetadata} from '../features/company/store/company.metadata';
import {personEntityMetadata} from '../features/person/store/person.metadata';

const entityMetadata: EntityMetadataMap = {
  Company: companyEntityMetadata,
  Person: personEntityMetadata
};

const pluralNames = {
  Company: 'Company',
  Person: 'Person',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
