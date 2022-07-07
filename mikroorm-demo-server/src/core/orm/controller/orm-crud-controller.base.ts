import {
  Body,
  Delete,
  Get,
  Inject,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import { CrudEntityRepository } from '../service/crud-entity-repository';
import { AnyEntity, EntityData, FilterQuery, FindOptions, Primary } from '@mikro-orm/core';
import { ControllerBase } from '../../controller/controller.base';
import {
  EnabledFeatures,
  OrmCrudControllerFeatureGuard,
  REQ_PARAM_ORM_CRUD_CONTROLLER_FEATURES
} from './orm-crud-controller-feature.guard';
import {REQUEST} from "@nestjs/core";

export interface OrmCrudControllerOptions<T extends AnyEntity<T>> {
  repository: CrudEntityRepository<T>;
  defaultGetAllOptions?: FindOptions<T>;
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
@UseGuards(OrmCrudControllerFeatureGuard)
export abstract class OrmCrudControllerBase<T extends AnyEntity<T>> extends ControllerBase {
  protected _repo: CrudEntityRepository<T>;
  protected defaultGetAllOptions?: FindOptions<T>;

  protected constructor(options: OrmCrudControllerOptions<T>) {
    super();
    this._repo = options.repository;
    this.defaultGetAllOptions = options.defaultGetAllOptions;
  }

  public get repo() {
    return this._repo;
  }

  @Get()
  async getAll(@Req() req: any, filter?: FilterQuery<T>, options?: FindOptions<T>): Promise<T[]> {
    this.checkEnabledFeature(req, 'getAll');
/*    if (!filter) {
      this.featureValidator.validate(this.enabledFeatures, 'getAll');
    } else {
      this.featureValidator.validate(this.enabledFeatures, 'getAllFiltered');
    }*/
    console.log('-->OrmCrudControllerBase.getAll() - filter:', filter);

    let opts = this.defaultGetAllOptions;
    if (options) {
      opts = { ...this.defaultGetAllOptions, ...options };
    }
    if (filter) {
      console.log('Calling repo WITH filter');
      return this._repo.find(filter, opts);
    }
    console.log('Calling repo WITHOUT filter');
    return this._repo.findAll(opts);
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: Primary<T>): Promise<T> {
    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    return this._repo.crud.get(filter);
  }

  @Post()
  async insert(@Body() data: T): Promise<T> {
    //console.log('DTO:', data);
    const obj = await this._repo.crud.insert(data);
    await this._repo.flush();
    return obj;
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: Primary<T>, @Body() data: EntityData<T>): Promise<T> {
    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    const obj = await this._repo.crud.update(filter, data);
    await this._repo.flush();
    return obj;
  }

  @Put('/:id/native')
  async nativeUpdate(@Param('id', ParseIntPipe) id: Primary<T>, @Body() data: EntityData<T>): Promise<number> {
    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    return this._repo.crud.nativeUpdate(filter, data);
  }

  @Delete('native')
  async nativeDeleteAll(): Promise<void> {
    await this._repo.crud.nativeDelete(this._repo.getEmptyFilterQuery());
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: Primary<T>): Promise<void> {
    await this._repo.crud.delete(id);
    await this._repo.flush();
  }

  @Delete('/:id/native')
  async nativeDelete(@Param('id', ParseIntPipe) id: Primary<T>): Promise<number> {
    const filter: FilterQuery<T> = this._repo.getFilterQueryForId(id);
    return this._repo.crud.nativeDelete(filter);
  }

  private checkEnabledFeature(req: any, feature: keyof EnabledFeatures): void {
    const features: EnabledFeatures = req[REQ_PARAM_ORM_CRUD_CONTROLLER_FEATURES];
    if (!features) {
      throw new NotImplementedException('Feature not configured for feature: ' + feature);
    }
    if (!features[feature]) {
      throw new NotImplementedException(feature + ' : this feature not enabled for this controller');
    }
  }
}
