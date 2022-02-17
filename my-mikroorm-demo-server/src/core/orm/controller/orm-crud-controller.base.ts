import { Body, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrudEntityRepository } from '../service/crud-entity-repository';
import { AnyEntity, FindOptions } from '@mikro-orm/core';
import { Primary } from '@mikro-orm/core/typings';

export abstract class OrmCrudControllerBase<T extends AnyEntity<T>> {
  constructor(private getAllOptions?: FindOptions<T>) {}

  abstract getRepository(): CrudEntityRepository<T>;

  @Get()
  async getAll(): Promise<T[]> {
    return this.getRepository().findAll(this.getAllOptions);
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: Primary<T>): Promise<T> {
    return this.getRepository().crud().get(id);
  }

  @Post()
  async insert(@Body() data: T): Promise<T> {
    //console.log('DTO:', data);
    const obj = await this.getRepository().crud().insert(data);
    await this.getRepository().flush();
    return obj;
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: Primary<T>, @Body() dto: Partial<T>): Promise<T> {
    const obj = await this.getRepository().crud().update(id, dto);
    await this.getRepository().flush();
    return obj;
  }

  @Put('/:id/native')
  async nativeUpdate(@Param('id', ParseIntPipe) id: Primary<T>, @Body() data: Partial<T>): Promise<number> {
    return this.getRepository().crud().nativeUpdate(id, data);
  }

  @Delete('native')
  async deleteAll(): Promise<void> {
    await this.getRepository().crud().nativeDelete({});
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: Primary<T>): Promise<void> {
    await this.getRepository().crud().delete(id);
    await this.getRepository().flush();
  }

  @Delete('/:id/native')
  async nativeDelete(@Param('id', ParseIntPipe) id: Primary<T>): Promise<number> {
    return this.getRepository().crud().nativeDelete(id);
  }
}
