import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseSchemaCreator } from './core/orm/schema/database-schema-creator';

const argv = process.argv.slice(2);
console.log('myArgs: ', argv);

if (argv.includes('createdbschema')) {
  try {
    DatabaseSchemaCreator.create(true);
  } catch (e) {
    console.log('ERROR:', e);
  }
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: console,
    });
    await app.listen(3001);
  }
  bootstrap();
}
