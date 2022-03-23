import { Controller, Delete, Get, Post } from '@nestjs/common';
import { InitService } from './init.service';

@Controller('init')
export class InitController {
  constructor(private initService: InitService) {}

  @Post()
  async init(): Promise<void> {
    this.initService.initApplication();
  }

  @Delete()
  async clean(): Promise<void> {
    this.initService.clean();
  }
}
