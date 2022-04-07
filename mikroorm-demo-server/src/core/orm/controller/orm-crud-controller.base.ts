import { Body, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrudEntityRepository } from '../service/crud-entity-repository';
import { AnyEntity, FindOptions } from '@mikro-orm/core';
import { Primary } from '@mikro-orm/core/typings';
import { ControllerBase } from '../../controller/controller.base';

export interface OrmCrudControllerOptions<T extends AnyEntity<T>> {
  repository: CrudEntityRepository<T>;
  getAllOptions?: FindOptions<T>;
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

export abstract class OrmCrudControllerBase<T extends AnyEntity<T>> extends ControllerBase {
  protected _repo: CrudEntityRepository<T>;
  protected getAllOptions?: FindOptions<T>;

  enabledFeatures?: EnabledFeatures;

  protected constructor(options: OrmCrudControllerOptions<T>) {
    super();
    this._repo = options.repository;
    this.getAllOptions = options.getAllOptions;
  }

  public get repo() {
    return this._repo;
  }

  @Get()
  async getAll(): Promise<T[]> {
    if (this.enabledFeatures && !this.enabledFeatures.getAll) {
      throw new ForbiddenException('OrmCrudControllerBase.getAll()');
    }

    return this._repo.findAll(this.getAllOptions);
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: Primary<T>): Promise<T> {
    if (this.enabledFeatures && !this.enabledFeatures.get) {
      throw new ForbiddenException('OrmCrudControllerBase.get()');
    }

    return this._repo.crud.get(id);
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
  async update(@Param('id', ParseIntPipe) id: Primary<T>, @Body() dto: Partial<T>): Promise<T> {
    if (this.enabledFeatures && !this.enabledFeatures.update) {
      throw new ForbiddenException('OrmCrudControllerBase.update()');
    }

    const obj = await this._repo.crud.update(id, dto);
    await this._repo.flush();
    return obj;
  }

  @Put('/:id/native')
  async nativeUpdate(@Param('id', ParseIntPipe) id: Primary<T>, @Body() data: Partial<T>): Promise<number> {
    if (this.enabledFeatures && !this.enabledFeatures.nativeUpdate) {
      throw new ForbiddenException('OrmCrudControllerBase.nativeUpdate()');
    }

    return this._repo.crud.nativeUpdate(id, data);
  }

  @Delete('native')
  async nativeDeleteAll(): Promise<void> {
    if (this.enabledFeatures && !this.enabledFeatures.nativeDelete) {
      throw new ForbiddenException('OrmCrudControllerBase.nativeDelete()');
    }

    await this._repo.crud.nativeDelete({});
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

    return this._repo.crud.nativeDelete(id);
  }
}
