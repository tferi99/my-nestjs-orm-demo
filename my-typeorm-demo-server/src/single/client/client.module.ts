import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PersonDmModule } from '../person-dm/person-dm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonDm } from '../person-dm/person-dm.entity';
import { Client2Service } from './client2.service';
import { Client2Controller } from './client2.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonDm]),
  ],
  providers: [
    ClientService,
    Client2Service
  ],
  controllers: [
    ClientController,
    Client2Controller
  ]
})
export class ClientModule {}
