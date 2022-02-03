import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Company } from '../../company/model/company.entity';
import { OrmIntTimestampEntity } from '../../orm/orm.entity';
import { EmployeeType } from './employee-type';


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

  @Property({default: true})
  active: boolean;

  @Property({length: 1024, nullable: true})
  note?: string;

  @ManyToOne({ entity: () => Company })
  company: Company
}

