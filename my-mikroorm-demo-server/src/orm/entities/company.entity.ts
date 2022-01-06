import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { EntityBase } from './entity.base';

@Entity()
export class Company extends EntityBase {
  @Unique()
  @Property({ length: 64 })
  name: string;

  @Property()
  established: Date;

  @Property()
  active: boolean = true;

  @Property({ length: 1024, nullable: true })
  description?: string;
}
