import { Entity, Property } from '@mikro-orm/core';
import { OrmIntTimestampEntity } from '../core/orm/entity';

@Entity()
export class Publisher extends OrmIntTimestampEntity {
  @Property()
  name: string;
}
