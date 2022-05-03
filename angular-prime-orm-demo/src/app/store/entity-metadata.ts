import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import {companyEntityMetadata} from '../features/company/store/company.metadata';
import {personEntityMetadata} from '../features/person/store/person.metadata';
import {DataEntity} from './data-entity';

const entityMetadata: EntityMetadataMap = {
  Company: companyEntityMetadata,
  Person: personEntityMetadata
};

const pluralNames = {
  Company: DataEntity.Company,
  Person: DataEntity.Person,
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
