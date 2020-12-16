import { CompanyDto } from "my-typeorm-demo-lib/lib/my-typeorm-demo-lib.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../person/person.entity';

@Entity()
export class Company implements CompanyDto {
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

  @OneToMany(() => Person, person => person.company, {nullable: false})
  workers: Person[];
}