import { AnyEntity, EntityName, EntityRepository } from '@mikro-orm/core';
import { EntityData, FilterQuery, Primary } from '@mikro-orm/core/typings';
import { Company } from '../../../features/company/model/company.entity';
import { EntityManager } from '@mikro-orm/core/EntityManager';

export interface AssociatedParentEntity<C extends AnyEntity, P extends AnyEntity> {
  parentId: keyof C;
  parentEntity: EntityName<P>;
}

export interface AssociatedParentEntityExt<C extends AnyEntity, P extends AnyEntity> {
  parentIdName: string;
}

export interface CrudEntityRepositoryConfig<T extends AnyEntity<T>> {
  pkName: string; // this propeorty should be deleted if autoIncrement=true
  autoIncrement?: boolean; // ID of database table is auto-incremrented
  associatedParentEntities?: AssociatedParentEntity<T, any>[]; // parent keys: if these fields are not empty then parent entity should be associated during insert
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
  public config(): CrudEntityRepositoryConfig<T> {
    return {
      pkName: 'id',
      autoIncrement: true,
    };
  }

  crud(): Crud<T> {
    return this._crud;
  }

  getEm(): EntityManager {
    return this._em;
  }
}

class Crud<T extends AnyEntity<T>> {
  constructor(private repo: CrudEntityRepository<T>) {}

  async get(filter: FilterQuery<T>): Promise<T> {
    return this.repo.findOne(filter);
  }

  /**
   * Data can contain associated parents, but it be a parent ID.
   * If parents are described in CrudEntityRepositoryConfig these ID will
   * be replaced with entity references.
   *
   * @param data
   */
  async insert(data: EntityData<T>): Promise<T> {
    if (this.repo.config().autoIncrement) {
      delete data[this.repo.config().pkName];
    }
    // collect parent associations
    const parentAssociations = {};
    if (this.repo.config().associatedParentEntities) {
      this.repo.config().associatedParentEntities.forEach((parent) => {
        if (data[parent.parentId] !== undefined) {
          const parentIdName = parent.parentId as string;
          parentAssociations[parentIdName] = data[parent.parentId]; // save parent id
          delete data[parent.parentId]; // delete parent key from parent property
        }
      });
    }

    const obj = this.repo.create(data);

    Object.keys(parentAssociations).forEach((key) => {
      obj[key] = parentAssociations[key];
    });
    await this.repo.persist(obj);
    return obj;
  }

  async insertForParent(data: EntityData<T>, parentKey: keyof T, parent: any): Promise<T> {
    if (this.repo.config().autoIncrement) {
      delete data[this.repo.config().pkName];
    }

    const obj = this.repo.create(data);
    obj[parentKey] = parent;
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
