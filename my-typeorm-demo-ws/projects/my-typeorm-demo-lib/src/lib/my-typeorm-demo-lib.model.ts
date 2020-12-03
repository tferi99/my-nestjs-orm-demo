export enum EmployeeType {
  WORKER = 'w',
  MANAGER = 'm',
  DIRECTOR = 'd'
}

export class Person {
  id: number;
  name: string;
  email: string;
  birth: Date;
  employeeType: EmployeeType;
  rank: number;
  active: boolean;
  note?: string;
}
