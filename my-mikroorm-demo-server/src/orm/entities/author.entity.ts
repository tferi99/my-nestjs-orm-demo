import {
  Collection, DateType,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { Book } from './book.entity';
import { EntityBase } from './entity.base';

@Entity()
export class Author extends EntityBase {
  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  age?: number;

  @Property()
  termsAccepted = false;

  @Property()
  identities?: string[];

  @Property()
  born?: Date;

  @OneToMany(() => Book, book => book.author)
  books = new Collection<Book>(this);

  @ManyToMany(() => Author)
  friends = new Collection<Author>(this);

  @ManyToOne()
  favouriteBook?: Book;

  @Property({ version: true })
  version!: number;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}
