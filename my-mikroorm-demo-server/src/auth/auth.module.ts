import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiration },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // globally activate - you can override it with controller/method level with @OverrideGlobalGuard
    },
  ],
})
export class AuthModule {}
