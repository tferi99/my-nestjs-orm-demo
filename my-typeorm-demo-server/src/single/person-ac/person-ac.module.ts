import { Module } from '@nestjs/common';
import { PersonAcService } from './person-ac.service';
import { PersonAcController } from './person-ac.controller';

@Module({
  providers: [
    PersonAcService
  ],
  controllers: [PersonAcController]
})
export class PersonAcModule {}
