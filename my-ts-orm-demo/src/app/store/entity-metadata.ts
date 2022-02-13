import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Company: {}
};

const pluralNames = {
  Company: "Companies"
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
