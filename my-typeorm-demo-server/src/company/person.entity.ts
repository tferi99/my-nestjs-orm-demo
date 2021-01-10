import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonDto, EmployeeType } from 'my-ts-orm-demo-lib';
import { Company } from './company.entity';

@Entity()
export class Person implements PersonDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 64})
  name: string;

  @Column({length: 256})
  email: string;

  @Column({type: 'date'})
  birth: Date;

  @Column({
    type: "enum",
    enum: EmployeeType,
    default: EmployeeType.WORKER
  })
  employeeType: EmployeeType;

  @Column({nullable: true})
  rank: number;

  @Column()
  active: boolean;

  @Column({length: 1024, nullable: true})
  note: string;

  @ManyToOne(() => Company, company => company.workers, {nullable: true})
  company: Company
}

