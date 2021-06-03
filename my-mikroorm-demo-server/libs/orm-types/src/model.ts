export declare enum EmployeeType {
  WORKER = "w",
  MANAGER = "m",
  DIRECTOR = "d"
}
export interface IPerson {
  id: number;
  name: string;
  email: string;
  birth: Date;
  employeeType: EmployeeType;
  rank: number;
  active: boolean;
  note?: string;
}
export interface ICompany {
  id: number;
  name: string;
  established: Date;
  workers: IPerson[];
  active: boolean;
  note?: string;
}

