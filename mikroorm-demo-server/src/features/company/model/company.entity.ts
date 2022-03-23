import { assign, Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Person } from '../../person/model/person.entity';
import { OrmIntTimestampEntity } from '../../../core/orm/entity';

@Entity()
export class Company extends OrmIntTimestampEntity {
  @PrimaryKey()
  id!: number;

  @Property({ length: 64 })
  @Unique()
  name: string;

  @Property()
  established: Date;

  @Property({ default: true })
  active: boolean = true;

  @Property({ length: 1024, nullable: true })
  note: string;

  @OneToMany({
    entity: () => Person,
    mappedBy: (person) => person.company,
  })
  workers = new Collection<Person>(this);

  constructor(obj?: Partial<Company>) {
    super();
    if (obj) {
      assign(this, obj);
    }
  }
}
