import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { NO_AUTH_KEY } from './no-auth.decorator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('--> LocalAuthGuard');

    const isPublic = this.reflector.getAllAndOverride<boolean>(NO_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
