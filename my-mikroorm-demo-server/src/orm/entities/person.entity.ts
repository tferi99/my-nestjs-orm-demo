import { BaseEntity, Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { EmployeeType, IPerson } from '@lib/orm-types';
import { EntityBase } from './entity.base';

@Entity()
export class Person extends EntityBase implements IPerson {
  @Property({ length: 64})
  name: string;

  @Property({length: 256})
  email: string;

  @Property()
  birth: Date;

  @Enum(() => EmployeeType)
  employeeType: EmployeeType;

  @Property()
  rank: number;

  @Property()
  active: boolean;

  @Property({length: 1024, nullable: true})
  note?: string;

  /*@ManyToOne(() => Company, company => company.workers, {nullable: true})
  company: Company*/
}

