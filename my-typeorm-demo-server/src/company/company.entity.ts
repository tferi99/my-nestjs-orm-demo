import { CompanyDto } from 'my-ts-orm-demo-lib';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Company implements Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({type: 'date'})
  established: Date;

  @Column()
  active: boolean;

  @Column({length: 1024, nullable: true})
  note: string;

  @OneToMany(() => Person, person => person.company, {nullable: true})
  //@OneToMany(() => Person)
  workers: Person[];
}
