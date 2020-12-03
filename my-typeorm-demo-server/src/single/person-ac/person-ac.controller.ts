import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PersonDm } from '../person-dm/person-dm.entity';
import { PersonAcService } from './person-ac.service';
import { PersonAc } from './person-ac.entity';

@Controller('person-ac')
export class PersonAcController {
  constructor(
    private service: PersonAcService
  ) {}

  @Post()
  async save(@Body() p: PersonAc): Promise<PersonAc> {
    return this.service.save(p);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.service.delete(id);
  }
}
