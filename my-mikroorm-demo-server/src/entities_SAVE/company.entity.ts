import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Company {
  @PrimaryKey()
  id!: number;

/*  @Column()
  name: string;

  @Column({type: 'date'})
  established: Date;

  @Column()
  active: boolean;

  @Column({length: 1024, nullable: true})
  note: string;

  @OneToMany(() => Person, person => person.company, {nullable: true})
  //@OneToMany(() => Person)
  workers: Person[];*/
}
