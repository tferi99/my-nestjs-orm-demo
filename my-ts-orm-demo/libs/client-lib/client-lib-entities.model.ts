export enum EmployeeType {
  WORKER = 'w',
  MANAGER = 'm',
  DIRECTOR = 'd',
}

export interface Company extends OrmIntTimestampEntity {
  id: number;
  name: string;
  established: Date;
  active: boolean;
  note?: string;
  workers: Person[];
}

export interface Person extends OrmIntTimestampEntity {
  name: string;
  email: string;
  birth: Date;
  employeeType: EmployeeType;
  rank: number;
  active: boolean;
  note?: string;
  company?: Company;
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

