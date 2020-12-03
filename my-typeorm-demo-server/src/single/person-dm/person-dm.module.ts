import { Module } from '@nestjs/common';
import { PersonDmService } from './person-dm.service';
import { PersonDmController } from './person-dm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonDm } from './person-dm.entity';
import { PersonDm2Controller } from './person-dm2.controller';
import { PersonDm2Service } from './person-dm2.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonDm])
  ],
  providers: [
    PersonDmService,
    PersonDm2Service
  ],
  controllers: [
    PersonDmController,
    PersonDm2Controller
  ]
})
export class PersonDmModule {}
