import {Controller, Get, Logger, Post, Req, UseGuards} from '@nestjs/common';
import { OverrideGlobalGuard } from './passport/override-global-guard.decorator';
import { NoAuth } from './passport/no-auth.decorator';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { LoginResult } from './model/auth.model';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { LoggerUtils } from '../core/util/logger.utils';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private jwtStrategy: JwtStrategy,
  ) {}

  /**
   * Login for JWT
   * @param req
   */
  @OverrideGlobalGuard()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any): Promise<LoginResult> {
    LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '--> AuthController.login()');
    return this.jwtStrategy.createJwtForlogin(req.user);
  }

  @Post('logout')
  @NoAuth()
  async logout(@Req() req: any): Promise<void> {
    LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '--> AuthController.logout()');

    // TODO
    // some token cleanup (or removing token from IP bound JWT based on IP address)
  }

  @Post('renew')
  async renew(@Req() req: any): Promise<LoginResult> {
    LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', 'renew token for ' + req.user.name);
    return this.jwtStrategy.createJwtForlogin(req.user);
  }
}
