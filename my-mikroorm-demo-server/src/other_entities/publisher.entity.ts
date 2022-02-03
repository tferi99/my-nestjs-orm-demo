import { Entity, Property } from '@mikro-orm/core';
import { OrmIntTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Publisher extends OrmIntTimestampEntity {
  @Property()
  name: string;
}

