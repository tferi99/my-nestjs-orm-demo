import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PersonDmService } from '../person-dm/person-dm.service';
import { PersonDm } from '../person-dm/person-dm.entity';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(
    private service: ClientService
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
