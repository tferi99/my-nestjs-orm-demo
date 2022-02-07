import { Entity, Property } from '@mikro-orm/core';
import { OrmIntTimestampEntity } from '../orm/entity';

@Entity()
export class Publisher extends OrmIntTimestampEntity {
  @Property()
  name: string;
}

