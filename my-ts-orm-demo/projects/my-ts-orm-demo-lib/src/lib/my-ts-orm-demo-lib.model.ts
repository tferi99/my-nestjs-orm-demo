export enum EmployeeType {
  WORKER = 'w',
  MANAGER = 'm',
  DIRECTOR = 'd'
}

export interface PersonDto {
  id: number;
  name: string;
  email: string;
  birth: Date;
  employeeType: EmployeeType;
  rank: number;
  active: boolean;
  note?: string;
}

export interface CompanyDto {
  id: number;
  name: string;
  established: Date;
  workers: PersonDto[];
  active: boolean;
  note?: string;
}
