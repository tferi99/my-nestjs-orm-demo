import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * It's a factory so it's evaluated when called and not when imported
 */
export function createTypeOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'mytypeormdemo',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: 'all',
    logger: 'advanced-console'
  };
}
