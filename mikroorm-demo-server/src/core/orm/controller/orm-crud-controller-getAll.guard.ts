import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OVERRIDE_GLOBAL_GUARD_KEY } from '../../../auth/passport/override-global-guard.decorator';
import { ORM_CRUD_CONTROLLER_FEATURES_KEY } from './features.decorator';

@Injectable()
export class OrmCrudControllerGetAllGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('--> OrmCrudControllerGetAllGuard.canActivate()');
    console.log('CTX:', context.getHandler().name);

    return true;
  }
}
