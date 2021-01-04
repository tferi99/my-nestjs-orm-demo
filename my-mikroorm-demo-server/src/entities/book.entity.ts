import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Author } from './author.entity';

class Publisher {
}

@Entity()
export class Book {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({
    nullable: true
  })
  title: string;

  @ManyToOne(() => Author) // when you provide correct type hint, ORM will read it for you
  author!: Author;

  @ManyToOne(() => Publisher) // or you can specify the entity as class reference or string name
  publisher?: Publisher;

/*  @ManyToMany() // owning side can be simple as this!
  tags = new Collection<BookTag>(this);*/

  constructor(title: string, author: Author) {
    this.title = title;
    this.author = author;
  }
}
