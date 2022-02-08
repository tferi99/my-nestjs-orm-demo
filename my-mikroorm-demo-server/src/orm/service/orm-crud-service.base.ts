import { FilterQuery, Populate, Primary, PrimaryKeyType } from '@mikro-orm/core/typings';
import { EntityRepository } from '@mikro-orm/core';
import { QueryOrderMap } from '@mikro-orm/core/enums';
import { OrmBaseEntity } from '../entity';

export abstract class OrmCrudServiceBase<T extends OrmBaseEntity, PK extends keyof T> {
  abstract getEntityRepository(): EntityRepository<T>;

  async getAll(where: FilterQuery<T>, populate?: Populate<T>, order?: QueryOrderMap): Promise<T[]> {
    return this.getEntityRepository().find(where, [], { order });
  }

  async get(id: PK): Promise<T> {
    //const filter: FilterQuery<T> = { id: idField };
    return this.getEntityRepository().findOne({ PK: id });

    //AuthModel extends BaseEntity
    /*    const u = this.getEntityRepository().getReference(id);
    return u.init();*/
  }

  async create(dto: Partial<T>): Promise<T> {
    const obj = this.getEntityRepository().create(dto);
    await this.getEntityRepository().persistAndFlush(obj);
    return obj;
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
