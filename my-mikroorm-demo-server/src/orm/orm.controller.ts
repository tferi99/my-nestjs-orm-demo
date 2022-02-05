import { Controller, Delete, Get } from '@nestjs/common';
import { OrmService } from './orm.service';

@Controller('orm')
export class OrmController {
  constructor(private ormService: OrmService) {}

  @Get('em')
  async dumpEm(): Promise<void> {
    this.ormService.dumpEm();
  }

  @Delete('em')
  emClear() {
    this.ormService.emClear();
  }
}
