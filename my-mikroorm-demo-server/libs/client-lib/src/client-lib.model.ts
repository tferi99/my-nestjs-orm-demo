//!!!!!!!!!!!!!!!!!! GENARATED BY createModelInterface.sh - DON'T CHANGE IT !!!!!!!!!!!!!!!!!!

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

export interface Company extends OrmIntTimestampEntity {
  id: number;
  name: string;
  established: Date;
  active?: boolean;
  note: string;
  workers = new Person[];
}

export interface Person extends OrmIntTimestampEntity {
  name: string;
  email: string;
  birth: Date;
  employeeType: EmployeeType;
  rank: number;
  active?: boolean;
  note?: string;
  company?: Company;
}

export interface Author extends OrmIntTimestampEntity {
  name: string;
  email: string;
  age?: number;
  termsAccepted = false;
  identities?: string[];
  born?: Date;
  books = new Book[];
  friends = new Author[];
  favouriteBook?: Book;
  version: number;
}

export interface Book extends OrmIntTimestampEntity {
  title: string;
  author: Author;
  publisher?: Publisher;
}

export interface Publisher extends OrmIntTimestampEntity {
  name: string;
}
