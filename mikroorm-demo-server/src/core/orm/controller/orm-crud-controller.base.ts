import { Body, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrudEntityRepository } from '../service/crud-entity-repository';
import { AnyEntity, FindOptions, EntityData, FilterQuery, Primary } from '@mikro-orm/core';
import { ControllerBase } from '../../controller/controller.base';

export interface OrmCrudControllerOptions<T extends AnyEntity<T>> {
  repository: CrudEntityRepository<T>;
  defaultGetAllOptions?: FindOptions<T>;
}

export interface EnabledFeatures {
  get: boolean;
  getAll: boolean;
  insert: boolean;
  update: boolean;
  nativeUpdate: boolean;
  delete: boolean;
  nativeDelete: boolean;
  nativeDeleteAll: boolean;
}

export function EnabledFeatures(features: EnabledFeatures) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    constructor.prototype.enabledFeatures = features;
  };
}

/**
 * End-points:
 *
 *  GET     /                          : getAll
 *  GET     /ID                        : get(id)
 *  POST    /              body: data  : insert(data)
 *  PUT     /ID            body: data  : update(id, data)
 *  PUT     /ID/native     body: data  : nativeUpdate(id, data)
 *  DELETE  /native                    : nativeDeleteAll()
 *  DELETE  /ID                        : delete(id)
 *  DELETE  /ID/native                 : nativeDelete(id)
 */
export abstract class OrmCrudControllerBase<T extends AnyEntity<T>> extends ControllerBase {
  protected _repo: CrudEntityRepository<T>;
  protected defaultGetAllOptions?: FindOptions<T>;

  enabledFeatures?: EnabledFeatures;

  protected constructor(options: OrmCrudControllerOptions<T>) {
    super();
    this._repo = options.repository;
    this.defaultGetAllOptions = options.defaultGetAllOptions;
  }

  public get repo() {
    return this._repo;
  }

  @Get()
  async getAll(filter?: FilterQuery<T>, options?: FindOptions<T>): Promise<T[]> {
    if (this.enabledFeatures && !this.enabledFeatures.getAll) {
      throw new ForbiddenException('OrmCrudControllerBase.getAll()');
    }
    let opts = this.defaultGetAllOptions;
    if (options) {
      opts = { ...this.defaultGetAllOptions, ...options };
    }
    if (filter) {
      return this._repo.find(filter, opts);
    }
    return this._repo.findAll(opts);
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: Primary<T>): Promise<T> {
    if (this.enabledFeatures && !this.enabledFeatures.get) {
      throw new ForbiddenException('OrmCrudControllerBase.get()');
    }

    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    return this._repo.crud.get(filter);
  }

  @Post()
  async insert(@Body() data: T): Promise<T> {
    if (this.enabledFeatures && !this.enabledFeatures.insert) {
      throw new ForbiddenException('OrmCrudControllerBase.insert()');
    }

    //console.log('DTO:', data);
    const obj = await this._repo.crud.insert(data);
    await this._repo.flush();
    return obj;
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: Primary<T>, @Body() data: EntityData<T>): Promise<T> {
    if (this.enabledFeatures && !this.enabledFeatures.update) {
      throw new ForbiddenException('OrmCrudControllerBase.update()');
    }

    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    const obj = await this._repo.crud.update(filter, data);
    await this._repo.flush();
    return obj;
  }

  @Put('/:id/native')
  async nativeUpdate(@Param('id', ParseIntPipe) id: Primary<T>, @Body() data: EntityData<T>): Promise<number> {
    if (this.enabledFeatures && !this.enabledFeatures.nativeUpdate) {
      throw new ForbiddenException('OrmCrudControllerBase.nativeUpdate()');
    }

    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    return this._repo.crud.nativeUpdate(filter, data);
  }

  @Delete('native')
  async nativeDeleteAll(): Promise<void> {
    if (this.enabledFeatures && !this.enabledFeatures.nativeDelete) {
      throw new ForbiddenException('OrmCrudControllerBase.nativeDelete()');
    }

    await this._repo.crud.nativeDelete(this._repo.getEmptyFilterQuery());
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: Primary<T>): Promise<void> {
    if (this.enabledFeatures && !this.enabledFeatures.delete) {
      throw new ForbiddenException('OrmCrudControllerBase.delete()');
    }

    await this._repo.crud.delete(id);
    await this._repo.flush();
  }

  @Delete('/:id/native')
  async nativeDelete(@Param('id', ParseIntPipe) id: Primary<T>): Promise<number> {
    if (this.enabledFeatures && !this.enabledFeatures.nativeDelete) {
      throw new ForbiddenException('OrmCrudControllerBase.nativeDelete()');
    }
    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    return this._repo.crud.nativeDelete(filter);
  }
}
