import { Module } from '@nestjs/common';
import { SandboxController } from './sandbox.controller';
import { SandboxService } from './sandbox.service';
import { OrmModule } from '../orm/orm.module';
import { Logger } from '@mikro-orm/core';

@Module({
  imports: [OrmModule],
  controllers: [SandboxController],
  providers: [Logger, SandboxService],
})
export class SandboxModule {}
