import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { EmployeeType } from '@lib/orm-types';
import { Company } from '../company/company.entity';
import { OrmIntTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Person extends OrmIntTimestampEntity {
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

  @ManyToOne({ entity: () => Company })
  company: Company
}

