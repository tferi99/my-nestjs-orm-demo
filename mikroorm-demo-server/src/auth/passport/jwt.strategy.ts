import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth, JwtPayload, Role } from '@app/client-lib';
import { LoggerUtils } from '../../core/util/logger.utils';
import { LoginResult } from '../model/auth.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // JWT payload -> request.user as Auth
  // by JWT strategy
  async validate(payload: any): Promise<Auth> {
    LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '--> JwtStrategy.validate(): ' + JSON.stringify(payload));

    const jwtPayload = payload as JwtPayload;
    return {
      id: Number(jwtPayload.sub),
      name: jwtPayload.username,
      roles: jwtPayload.roles,
    };
  }

  // AuthModel -> JWT payload
  /**
   * It creates a JWT token from user and returns as object with 'access_token'.
   *
   * JWT token content:
   *    - user name (username)
   *    - user ID (sub)
   *    - roles (roles)
   * @param user
   */
  async createJwtForLogin(auth: Partial<Auth>): Promise<LoginResult> {
    LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '--> createJwtForlogin() from ' + JSON.stringify(auth));
    const roles: Role[] = [Role.User];
    const isAdmin = auth.roles.includes(Role.Admin);
    if (isAdmin) {
      roles.push(Role.Admin);
    }
    const payload = { username: auth.name, sub: auth.id, roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
