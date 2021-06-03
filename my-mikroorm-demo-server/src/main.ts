import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mikro from './mikro-orm.config';

const dummy = mikro;
console.log(dummy);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
