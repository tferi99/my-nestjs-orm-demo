import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseSchemaCreator } from './orm/database-schema-creator';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('initdb')
  initDb(): string {
    DatabaseSchemaCreator.create();
    return 'OK';
  }

}
