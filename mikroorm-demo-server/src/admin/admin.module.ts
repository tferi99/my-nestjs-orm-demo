import { Module } from '@nestjs/common';
import { ConfiguredOrmModule } from '../config/mikro-orm.config';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfiguredOrmModule(),
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService
  ]
})
export class AdminModule {}
