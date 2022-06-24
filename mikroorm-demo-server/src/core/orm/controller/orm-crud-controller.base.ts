import { Body, Delete, ForbiddenException, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrudEntityRepository } from '../service/crud-entity-repository';
import { AnyEntity, FindOptions, EntityData, FilterQuery, Primary } from '@mikro-orm/core';
import { ControllerBase } from '../../controller/controller.base';
import { Reflector } from '@nestjs/core';
import {
  ORM_CRUD_CONTROLLER_FEATURE_VALIDATOR,
  OrmCrudControllerFeatureValidatorService
} from '../service/orm-crud-controller-feature-validator.service';

export interface OrmCrudControllerOptions<T extends AnyEntity<T>> {
  repository: CrudEntityRepository<T>;
  defaultGetAllOptions?: FindOptions<T>;
}

export interface EnabledFeatures {
  get: boolean;
  getAll: boolean;
  getAllFiltered: boolean;
  insert: boolean;
  update: boolean;
  nativeUpdate: boolean;
  delete: boolean;
  nativeDelete: boolean;
  nativeDeleteAll: boolean;
}

export interface FeatureConfig {
  defaultPolicy?: EnabledFeatures;
  features: Partial<EnabledFeatures>;
}

const OPTIMISTIC_FEATURE_POLICY: EnabledFeatures = {
  get: true,
  getAll: true,
  getAllFiltered: true,
  insert: true,
  update: false,
  nativeUpdate: true,
  delete: true,
  nativeDelete: true,
  nativeDeleteAll: true,
};

const PESSIMISTIC_FEATURE_POLICY: EnabledFeatures = {
  get: false,
  getAll: false,
  getAllFiltered: false,
  insert: false,
  update: false,
  nativeUpdate: false,
  delete: false,
  nativeDelete: false,
  nativeDeleteAll: false,
};

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
  protected _reflector: Reflector;

  enabledFeatures: EnabledFeatures = PESSIMISTIC_FEATURE_POLICY;

  @Inject(ORM_CRUD_CONTROLLER_FEATURE_VALIDATOR) featureValidator: OrmCrudControllerFeatureValidatorService;

  protected constructor(options: OrmCrudControllerOptions<T>, reflector: Reflector) {
    super();
    this._repo = options.repository;
    this.defaultGetAllOptions = options.defaultGetAllOptions;
    this._reflector = reflector;
  }

  public get repo() {
    return this._repo;
  }

  @Get()
  async getAll(filter?: FilterQuery<T>, options?: FindOptions<T>): Promise<T[]> {
    if (!filter) {
      this.featureValidator.validate(this.enabledFeatures, 'getAll');
    } else {
      this.featureValidator.validate(this.enabledFeatures, 'getAllFiltered');
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
    if (!this.enabledFeatures.get) {
      throw new ForbiddenException('OrmCrudControllerBase.get()');
    }

    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    return this._repo.crud.get(filter);
  }

  @Post()
  async insert(@Body() data: T): Promise<T> {
    if (!this.enabledFeatures.insert) {
      throw new ForbiddenException('OrmCrudControllerBase.insert()');
    }

    //console.log('DTO:', data);
    const obj = await this._repo.crud.insert(data);
    await this._repo.flush();
    return obj;
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: Primary<T>, @Body() data: EntityData<T>): Promise<T> {
    if (!this.enabledFeatures.update) {
      throw new ForbiddenException('OrmCrudControllerBase.update()');
    }

    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    const obj = await this._repo.crud.update(filter, data);
    await this._repo.flush();
    return obj;
  }

  @Put('/:id/native')
  async nativeUpdate(@Param('id', ParseIntPipe) id: Primary<T>, @Body() data: EntityData<T>): Promise<number> {
    if (!this.enabledFeatures.nativeUpdate) {
      throw new ForbiddenException('OrmCrudControllerBase.nativeUpdate()');
    }

    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    return this._repo.crud.nativeUpdate(filter, data);
  }

  @Delete('native')
  async nativeDeleteAll(): Promise<void> {
    if (!this.enabledFeatures.nativeDelete) {
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
    if (!this.enabledFeatures.nativeDelete) {
      throw new ForbiddenException('OrmCrudControllerBase.nativeDelete()');
    }
    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    return this._repo.crud.nativeDelete(filter);
  }
}
