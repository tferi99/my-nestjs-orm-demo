import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PersonDmService } from '../person-dm/person-dm.service';
import { PersonDm } from '../person-dm/person-dm.entity';
import { ClientService } from './client.service';
import { Client2Service } from './client2.service';

@Controller('client2')
export class Client2Controller {
  constructor(
    private service: Client2Service
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
