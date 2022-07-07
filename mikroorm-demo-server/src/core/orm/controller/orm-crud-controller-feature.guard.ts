import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OVERRIDE_GLOBAL_GUARD_KEY } from '../../../auth/passport/override-global-guard.decorator';
import { ORM_CRUD_CONTROLLER_FEATURES_KEY } from './features.decorator';

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

const OptimisticFeaturePolicy: EnabledFeatures = {
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

const PessimisticFeaturePolicy: EnabledFeatures = {
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

export const DEFAULT_ORM_CRUD_CONTROLLER_FEATURE_POLICY = PessimisticFeaturePolicy;
export const REQ_PARAM_ORM_CRUD_CONTROLLER_FEATURES = 'ReqParamOrmCrudControllerFeatures';

@Injectable()
export class OrmCrudControllerFeatureGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('--> OrmCrudControllerFeatureGuard.canActivate()');

    const features: EnabledFeatures = this.reflector.get<EnabledFeatures>(ORM_CRUD_CONTROLLER_FEATURES_KEY, context.getClass());
    console.log('FEATURES:', features);

    if (features) {
      const req = context.switchToHttp().getRequest();
      req[REQ_PARAM_ORM_CRUD_CONTROLLER_FEATURES] = features;
    }
    return true;
  }
}
