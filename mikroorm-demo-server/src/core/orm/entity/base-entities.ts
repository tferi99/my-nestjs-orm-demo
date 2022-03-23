import { OrmBaseEntity, OrmBigIntEntity, OrmBigIntTimestampEntity, OrmIntEntity, OrmIntTimestampEntity, OrmTimestampEntity, OrmUuidEntity, OrmUuidTimestampEntity } from './index';
import { AnyEntity, EntityName } from '@mikro-orm/core';

export const BASE_ENTITIES: EntityName<AnyEntity<any>>[] = [
  OrmBaseEntity,
  OrmTimestampEntity,
  OrmIntEntity,
  OrmIntTimestampEntity,
  OrmBigIntEntity,
  OrmBigIntTimestampEntity,
  OrmUuidEntity,
  OrmUuidTimestampEntity,
];
