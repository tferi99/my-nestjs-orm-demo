import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/auth.model';
import { Auth, JwtPayload, Role } from '@app/client-lib';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT payload -> request.user as Auth
  // by JWT strategy
  async validate(payload: any): Promise<Auth> {
    console.log('--> JwtStrategy.validate()', payload);

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
  async createJwtForlogin(user: Partial<User>) {
    console.log('--> createJwtForlogin() from', user);
    const roles: Role[] = [Role.User];
    if (user.admin) {
      roles.push(Role.Admin);
    }
    const payload = { username: user.name, sub: user.id, roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
