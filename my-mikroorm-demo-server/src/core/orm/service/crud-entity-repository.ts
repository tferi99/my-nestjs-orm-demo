import { AnyEntity, EntityRepository } from '@mikro-orm/core';
import { EntityData, FilterQuery, Primary } from '@mikro-orm/core/typings';

export interface CrudEntityRepositoryConfig {
  pkName: string;
  autoIncrement?: boolean;
}

/**
 * This is an extended EntityRepository which provides compact CRUD operations.
 */
export abstract class CrudEntityRepository<T extends AnyEntity<T>> extends EntityRepository<T> {
  private _crud: Crud<T> = new Crud<T>(this);

  /**
   * To describes crud behavior.
   * Override to change default behavior.
   *
   * By default:
   *  - PK name is: id
   *  - ID generated automatically in database (should be removed from input data)
   */
  public config(): CrudEntityRepositoryConfig {
    return {
      pkName: 'id',
      autoIncrement: true,
    };
  }

  crud(): Crud<T> {
    return this._crud;
  }
}

class Crud<T extends AnyEntity<T>> {
  constructor(private repo: CrudEntityRepository<T>) {}

  async get(filter: FilterQuery<T>): Promise<T> {
    return this.repo.findOne(filter);
  }

  /**
   * Primary key property
   * @param data
   */
  async insert(data: EntityData<T>): Promise<T> {
    console.log('CFG:', this.repo.config());
    if (this.repo.config()?.autoIncrement) {
      delete data[this.repo.config().pkName];
    }

    const obj = this.repo.create(data);
    await this.repo.persist(obj);
    return obj;
  }

  async update(filter: FilterQuery<T>, data: Partial<T>): Promise<T> {
    const obj = await this.repo.findOne(filter);
    if (!obj) {
      return null;
    }
    await this.repo.assign(obj, data);
    await this.repo.persist(obj);
    return obj;
  }

  async nativeUpdate(filter: FilterQuery<T>, data: Partial<T>): Promise<number> {
    return this.repo.nativeUpdate(filter, data);
  }

  async delete(id: Primary<T>): Promise<void> {
    const ref = this.repo.getReference(id);
    await this.repo.remove(ref);
  }

  async nativeDelete(filter: FilterQuery<T>): Promise<number> {
    return this.repo.nativeDelete(filter);
  }
}
