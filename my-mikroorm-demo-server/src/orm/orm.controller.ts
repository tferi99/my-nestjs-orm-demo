import { Controller, Delete, Get } from '@nestjs/common';
import { OrmUtilsService } from './service/orm-utils.service';

@Controller('orm')
export class OrmController {
  constructor(private ormService: OrmUtilsService) {}

  @Get('em')
  async dumpEm(): Promise<void> {
    this.ormService.dumpEm();
  }

  @Delete('em')
  emClear() {
    this.ormService.emClear();
  }
}
