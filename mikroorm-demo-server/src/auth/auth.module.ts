import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from '../admin/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './passport/local.strategy';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION }, // from https://github.com/vercel/ms
    }),
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // globally activate - you can override it with controller/method level with @OverrideGlobalGuard
    },
  ],
})
export class AuthModule {}
