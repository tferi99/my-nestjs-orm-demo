import { FilterQuery, Primary } from '@mikro-orm/core/typings';
import { BaseEntity, EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';

export abstract class MikroOrmCrudServiceBase<T extends BaseEntity<T, PK>, PK extends keyof T> {
  abstract getEntityRepository(): EntityRepository<T>;
  abstract newEntity(): T;

  async create(dto: T): Promise<T> {
    const obj = this.newEntity();
    wrap(obj).assign(dto);
    await this.getEntityRepository().persistAndFlush(obj);

    return obj;
  }

/*  async createAll(dto: T[]): Promise<T> {
    const obj = this.newEntity();
    wrap(obj).assign(dto);
    await this.getEntityRepository().persistAndFlush(obj);

    return obj;
  }*/

  async getAll(where?: FilterQuery<T>): Promise<T[]> {
    return this.getEntityRepository().find(where, [], { id: QueryOrder.ASC });
  }

  async get(id: PK): Promise<T> {
    //const filter: FilterQuery<T> = { id: idField };
    return this.getEntityRepository().findOne({});

    //AuthModel extends BaseEntity
/*    const u = this.getEntityRepository().getReference(id);
    return u.init();*/
  }

  /**
   * TODO: Now update always fetches entity to change. Try to eliminate this fetch.
   *
   * @param id
   * @param dto
   */
  async update(id: PK, dto: T): Promise<T> {
    const user = await this.get(id);
    if (!user) {
      return null;
    }
    await this.getEntityRepository().assign(user, dto);
    await this.getEntityRepository().flush();
    return user;
  }

  async delete(id: Primary<T>) {
    const u = this.getEntityRepository().getReference(id);
    await this.getEntityRepository().removeAndFlush(u);
  }
}
