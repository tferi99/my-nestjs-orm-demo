import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OverrideGlobalGuard } from './passport/override-global-guard.decorator';
import { NoAuth } from './passport/no-auth.decorator';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { LoginResult } from './model/auth.model';
import { LocalAuthGuard } from './passport/local-auth.guard';


@Controller('auth')
export class AuthController {
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
    console.log('--> AuthController.login()', req.user);
    return this.jwtStrategy.createJwtForlogin(req.user);
  }

  @Post('logout')
  @NoAuth()
  async logout(@Req() req: any): Promise<void> {
    console.log('--> AuthController.logout()', req.user);

    // TODO
    // some token cleanup (or removing token from IP bound JWT based on IP address)
  }
}
