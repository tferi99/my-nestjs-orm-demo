import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NO_AUTH_KEY } from './no-auth.decorator';
import { Reflector } from '@nestjs/core';
import { OVERRIDE_GLOBAL_GUARD_KEY } from './override-global-guard.decorator';

/**
 * It calls JwtStrategy for auth.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('--> JwtAuthGuard.canActivate()');

    // @NoAuth
    const noAuth = this.reflector.getAllAndOverride<boolean>(NO_AUTH_KEY, [context.getHandler(), context.getClass()]);
    if (noAuth) {
      console.log('--> @NoAuth');
      return true;
    }

    // @OverrideGlobalGuard
    const isOverrideGlobalGuard = this.reflector.getAllAndOverride<boolean>(OVERRIDE_GLOBAL_GUARD_KEY, [context.getHandler(), context.getClass()]);
    if (isOverrideGlobalGuard) {
      console.log('--> @OverrideGlobalGuard');
      return true;
    }

    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  /*  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }*/
}
