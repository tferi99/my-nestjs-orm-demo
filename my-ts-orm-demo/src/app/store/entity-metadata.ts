import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import {companyEntityMetadata} from '../company/store/company.metadata';

const entityMetadata: EntityMetadataMap = {
  Company: companyEntityMetadata
};

const pluralNames = {
  Company: "Company"
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
