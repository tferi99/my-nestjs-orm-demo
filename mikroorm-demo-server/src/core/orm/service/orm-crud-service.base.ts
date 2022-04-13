import { EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { OrmBaseEntity } from '../entity';

export abstract class OrmCrudServiceBase<T extends OrmBaseEntity> {
  abstract getEntityRepository(): EntityRepository<T>;

/*  async getAll(where: FilterQuery<T>, populate: Populate<T>, order: QueryOrderMap): Promise<T[]> {
    return this.getEntityRepository().find(where, [], order);
  }

  async get(filter: FilterQuery<T>): Promise<T> {
    return this.getEntityRepository().findOne<T>(filter);
  }
*/
  async insert(data: RequiredEntityData<T>): Promise<T> {
    const obj = this.getEntityRepository().create(data);
    await this.getEntityRepository().persistAndFlush(obj);
    return obj;
  }

  /**
   * TODO: Now update always fetches entity to change. Try to eliminate this fetch.
   *
   * @param id
   * @param data
   */
/*  async update(filter: FilterQuery<T>, data: EntityData<T>): Promise<T> {
    const obj = await this.get(filter);
    if (!obj) {
      return null;
    }
    await this.getEntityRepository().assign(obj, data);
    await this.getEntityRepository().flush();
    return obj;
  }

  async delete(id: Primary<T>) {
    const u = this.getEntityRepository().getReference(id);
    await this.getEntityRepository().removeAndFlush(u);
  }*/
}
