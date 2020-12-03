import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PersonDm } from './person-dm.entity';

import { PersonDm2Service } from './person-dm2.service';

@Controller('person-dm2')
export class PersonDm2Controller {
  constructor(
    private service: PersonDm2Service
  ) {}

  @Post()
  async save(@Body() p: PersonDm): Promise<PersonDm> {
    return this.service.save(p);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.service.delete(id);
  }
}
