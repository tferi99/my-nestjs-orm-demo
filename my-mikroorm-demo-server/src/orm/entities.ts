import { Person } from '../person/person.entity';
import { Company } from '../company/company.entity';
import {
  OrmBaseEntity,
  OrmBigIntEntity,
  OrmBigIntTimestampEntity,
  OrmIntEntity,
  OrmIntTimestampEntity,
  OrmTimestampEntity, OrmUuidEntity, OrmUuidTimestampEntity,
} from './orm.entity';

export const BASE_ENTITIES = [
  OrmBaseEntity,
  OrmTimestampEntity,
  OrmIntEntity,
  OrmIntTimestampEntity,
  OrmBigIntEntity,
  OrmBigIntTimestampEntity,
  OrmUuidEntity,
  OrmUuidTimestampEntity,
];

export const ENTITIES = [Company];
//export const ENTITIES = [Company, Person];

