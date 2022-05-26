import { assign, Entity, Enum, ManyToOne, Property, EntityData } from '@mikro-orm/core';
import { Company } from '../../company/model/company.entity';
import { OrmIntTimestampEntity } from '../../../core/orm/entity';
import { EmployeeType } from '@app/client-lib';
import { PersonRepository } from '../person.repository';

@Entity({ customRepository: () => PersonRepository })
export class Person extends OrmIntTimestampEntity {
  @Property({ length: 64 })
  name: string;

  @Property({ length: 256 })
  email: string;

  @Property({ columnType: 'timestamp' })
  birth: Date;

  @Enum(() => EmployeeType)
  employeeType: EmployeeType;

  @Property()
  rank: number;

  @Property({ default: true })
  active: boolean;

  @Property({ length: 1024, nullable: true })
  note?: string;

  @ManyToOne({ entity: () => Company, nullable: true })
  company?: Company;

  constructor(obj?: EntityData<Person>) {
    super();
    this.active = true;
    assign(this, obj);
  }
}
