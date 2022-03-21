import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseSchemaCreator } from './core/orm/schema/database-schema-creator';
import { WinstonModule } from 'nest-winston';
import { LoggingConfig } from './config/logging.config';
import { ENTITIES } from './config/mikro-orm.config';

const argv = process.argv.slice(2);
console.log('myArgs: ', argv);

if (argv.includes('createdbschema')) {
  try {
    DatabaseSchemaCreator.create(ENTITIES, true);
  } catch (e) {
    console.log('ERROR:', e);
  }
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(LoggingConfig.MAIN),
    });
    await app.listen(3001);
  }
  bootstrap();
}
