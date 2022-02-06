import { Controller, Delete, Get, Logger, ParseBoolPipe, Post, Query } from "@nestjs/common";
import { SandboxService } from './sandbox.service';

@Controller('sandbox')
export class SandboxController {
  constructor(
    private sandboxService: SandboxService,
  ) {}

  @Get('emDumpWithFind')
  emDumpWithFind() {
    this.sandboxService.emDumpWithFind();
  }

  @Post('manyToOneOptional')
  manyToOneOptional(@Query('assign', ParseBoolPipe) assign: boolean) {
    this.sandboxService.manyToOneOptional(assign);
  }
}
