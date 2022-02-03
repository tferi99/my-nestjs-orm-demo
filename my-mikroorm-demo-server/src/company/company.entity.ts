import { Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Person } from '../person/person.entity';
import { OrmIntTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Company extends OrmIntTimestampEntity {
  @PrimaryKey()
  id!: number;

  @Property({ length: 64 })
  @Unique()
  name: string;

  @Property()
  established: Date;

  @Property()
  active: boolean = true;

  @Property({length: 1024, nullable: true})
  note: string;

/*  @OneToMany({
    entity: () => Person,
    mappedBy: (person) => person.company,
  })
  workers: Person[];*/
}
