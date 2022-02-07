import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PersonDto, EmployeeType } from 'my-ts-orm-demo-lib';

@Entity()
export class PersonAc extends BaseEntity implements PersonDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
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
}
