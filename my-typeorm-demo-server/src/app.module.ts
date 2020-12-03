import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmConfig } from './config/typeorm.config';
import { PersonAcModule } from './single/person-ac/person-ac.module';
import { PersonDmModule } from './single/person-dm/person-dm.module';
import { ClientModule } from './single/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(createTypeOrmConfig()),
    PersonAcModule,
    PersonDmModule,
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
