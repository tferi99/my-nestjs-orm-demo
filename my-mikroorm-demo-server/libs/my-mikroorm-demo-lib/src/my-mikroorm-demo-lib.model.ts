//!!!!!!!!!!!!!!!!!! GENARATED BY createModelInterface.sh - DON'T CHANGE IT !!!!!!!!!!!!!!!!!!

export interface Company extends OrmIntTimestampEntity {
  id: number;
  name: string;
  established: Date;
  active: boolean;
  note: string;

export interface Person extends OrmIntTimestampEntity {
  name: string;
  email: string;
  birth: Date;
  employeeType: EmployeeType;
  rank: number;
  active: boolean;
  note?: string;
  company?: Company;
  constructor(obj?: Partial<Person>) {
    super();
    assign(this, obj);
  }
}

export interface OrmBigIntEntity {
  id: number;
}

export interface OrmBigIntTimestampEntity extends OrmTimestampEntity {
  id: number;
}

export interface OrmIntEntity {
  id: number;
}

export interface OrmIntTimestampEntity extends OrmTimestampEntity {
  id: number;
}

export interface OrmTimestampEntity {
  updated?: Date;
  created?: Date;
}

export interface OrmUuidEntity {
  id?: string;
}

export interface OrmUuidTimestampEntity extends OrmTimestampEntity {
  id?: string;
}

export interface Author extends OrmIntTimestampEntity {

export interface Book extends OrmIntTimestampEntity {

export interface Publisher extends OrmIntTimestampEntity {
