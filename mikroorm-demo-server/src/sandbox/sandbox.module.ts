import { Logger, Module } from '@nestjs/common';
import { SandboxController } from './sandbox.controller';
import { SandboxService } from './sandbox.service';
import { ConfiguredOrmModule } from '../config/mikro-orm.config';

@Module({
  imports: [ConfiguredOrmModule()],
  controllers: [SandboxController],
  providers: [Logger, SandboxService],
})
export class SandboxModule {}
