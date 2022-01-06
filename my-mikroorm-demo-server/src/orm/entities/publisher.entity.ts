import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { EntityBase } from './entity.base';

@Entity()
export class Publisher extends EntityBase {
  @Property()
  name: string;
}

