import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseSchemaCreator } from './orm/schema/database-schema-creator';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('createdbschema')
  initDb(): string {
    DatabaseSchemaCreator.create();
    return 'OK';
  }

}
