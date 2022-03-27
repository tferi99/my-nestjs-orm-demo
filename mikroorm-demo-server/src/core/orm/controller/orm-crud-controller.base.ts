import { Body, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrudEntityRepository } from '../service/crud-entity-repository';
import { AnyEntity, FindOptions } from '@mikro-orm/core';
import { Primary } from '@mikro-orm/core/typings';
import { ControllerBase } from '../../controller/controller.base';

export abstract class OrmCrudControllerBase<T extends AnyEntity<T>> extends ControllerBase {
  protected _repo: CrudEntityRepository<T>;
  protected getAllOptions?: FindOptions<T>;

  constructor(
      repo: CrudEntityRepository<T>,
      getAllOptions?: FindOptions<T>) {
    super();
    this._repo = repo;
    this.getAllOptions = getAllOptions;
  }

  @Get()
  async getAll(): Promise<T[]> {
    return this._repo.findAll(this.getAllOptions);
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: Primary<T>): Promise<T> {
    return this._repo.crud().get(id);
  }

  @Post()
  async insert(@Body() data: T): Promise<T> {
    //console.log('DTO:', data);
    const obj = await this._repo.crud().insert(data);
    await this._repo.flush();
    return obj;
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: Primary<T>, @Body() dto: Partial<T>): Promise<T> {
    const obj = await this._repo.crud().update(id, dto);
    await this._repo.flush();
    return obj;
  }

  @Put('/:id/native')
  async nativeUpdate(@Param('id', ParseIntPipe) id: Primary<T>, @Body() data: Partial<T>): Promise<number> {
    return this._repo.crud().nativeUpdate(id, data);
  }

  @Delete('native')
  async deleteAll(): Promise<void> {
    await this._repo.crud().nativeDelete({});
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: Primary<T>): Promise<void> {
    await this._repo.crud().delete(id);
    await this._repo.flush();
  }

  @Delete('/:id/native')
  async nativeDelete(@Param('id', ParseIntPipe) id: Primary<T>): Promise<number> {
    return this._repo.crud().nativeDelete(id);
  }
}
