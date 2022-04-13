import { assign, Collection, Entity, OneToMany, PrimaryKey, Property, Unique, EntityData } from '@mikro-orm/core';
import { Person } from '../../person/model/person.entity';
import { OrmIntTimestampEntity } from '../../../core/orm/entity';
import { CompanyRepository } from '../company.repository';

@Entity({ customRepository: () => CompanyRepository })
export class Company extends OrmIntTimestampEntity {
  @PrimaryKey()
  id!: number;

  @Property({ length: 64 })
  @Unique()
  name: string;

  @Property()
  established: Date;

  @Property({ default: true })
  active: boolean;

  @Property({ length: 1024, nullable: true })
  note: string;

  @OneToMany({
    entity: () => Person,
    mappedBy: (person) => person.company,
  })
  workers = new Collection<Person>(this);

  constructor(obj?: EntityData<Company>) {
    super();
    this.active = true;
    if (obj) {
      assign(this, obj);
    }
  }
}
