import { BaseEntity, Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { PersonDto, EmployeeType } from 'my-ts-orm-demo-lib';

@Entity()
export class Person extends BaseEntity<Person, 'id'> implements PersonDto {
  @PrimaryKey()
  id: number;

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

