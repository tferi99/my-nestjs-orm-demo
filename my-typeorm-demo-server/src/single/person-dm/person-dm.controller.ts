import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PersonDm } from './person-dm.entity';
import { PersonDmService } from './person-dm.service';
import { EmployeeType } from 'my-typeorm-demo-lib';

@Controller('person-dm')
export class PersonDmController {
  constructor(
    private service: PersonDmService
  ) {}

  @Get()
  async getAll(): Promise<PersonDm[]> {
    return this.service.getAll();
  }

  @Post()
  async save(@Body() p: PersonDm): Promise<PersonDm> {
    return this.service.save(p);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.service.delete(id);
  }

  @Get('dummy')
  dummy(): PersonDm {
    const p: PersonDm = {
      id: 0,
      name: 'John Smith',
      email: 'js@test.org',
      birth: new Date(1975, 3, 14),
      employeeType: EmployeeType.DIRECTOR,
      rank: 5,
      note: 'This is dummy person',
      active: true
    };
    return p;
  }
}
