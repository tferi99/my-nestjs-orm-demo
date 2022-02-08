import { EntityRepository } from '@mikro-orm/core';
import { AnyEntity, EntityData, Primary, PrimaryKeyType, PrimaryProperty } from '@mikro-orm/core/typings';

export abstract class CrudEntityRepository<T extends AnyEntity<T>> extends EntityRepository<T> {
  private _crud = new Crud<T>(this);
  crud(): Crud<T> {
    return this._crud;
  }
}

class Crud<T extends AnyEntity<T>, PK extends keyof T> {
  constructor(private repo: EntityRepository<T>) {}

  async get(id: Primary<T>): Promise<T> {
    return this.repo.findOne({ PrimaryProperty<T>: id });
  }

  async insert(data: EntityData<T>): Promise<T> {
    const obj = this.repo.create(data);
    await this.repo.persist(obj);
    return obj;
  }

  async update(id: Primary<T>, dto: Partial<T>): Promise<T> {
    const obj = await this.get(id);
    if (!obj) {
      return null;
    }
    await this.repo.assign(obj, dto);
    await this.repo.persist(obj);
    return obj;
  }

  async delete(id: Primary<T>) {
    const ref = this.repo.getReference(id);
    await this.repo.remove(ref);
  }
}
