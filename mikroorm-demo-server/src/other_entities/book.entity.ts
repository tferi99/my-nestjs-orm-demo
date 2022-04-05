import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Author } from './author.entity';
import { OrmIntTimestampEntity } from '../core/orm/entity';

class Publisher {}

@Entity()
export class Book extends OrmIntTimestampEntity {
  @Property({
    nullable: true,
  })
  title: string;

  @ManyToOne(() => Author) // when you provide correct type hint, ORM will read it for you
  author!: Author;

  @ManyToOne(() => Publisher) // or you can specify the entity as class reference or string name
  publisher?: Publisher;

  /*  @ManyToMany() // owning side can be simple as this!
  tags = new Collection<BookTag>(this);*/

  constructor(title: string, author: Author) {
    super();
    this.title = title;
    this.author = author;
  }
}
