import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@app/client-lib';
import { NO_ROLE_KEY } from './no-role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('--> RolesGuard2.canActivate()');

    // @NoRole
    const noRole = this.reflector.getAllAndOverride<boolean>(NO_ROLE_KEY, [context.getHandler(), context.getClass()]);
    if (noRole) {
      console.log('--> @NoRole');
      return true;
    }
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    console.log('requiredRoles:', requiredRoles);
    if (!requiredRoles) {
      console.log('--> no roles');
      return true; // if no role specified this guard is ignored
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
