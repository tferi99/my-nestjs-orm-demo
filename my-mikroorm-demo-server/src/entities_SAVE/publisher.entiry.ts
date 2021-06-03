import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Publisher {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;
}

