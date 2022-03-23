import { Module } from '@nestjs/common';
import { SandboxController } from './sandbox.controller';
import { SandboxService } from './sandbox.service';
import { Logger } from '@mikro-orm/core';
import { ConfiguredOrmModule } from '../config/mikro-orm.config';

@Module({
  imports: [ConfiguredOrmModule()],
  controllers: [SandboxController],
  providers: [Logger, SandboxService],
})
export class SandboxModule {}
