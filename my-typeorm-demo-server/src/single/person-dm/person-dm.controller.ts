import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PersonDm } from './person-dm.entity';
import { PersonDmService } from './person-dm.service';
import { EmployeeType } from 'my-typeorm-demo-lib';
import { DeleteResult } from 'typeorm';

@Controller('person-dm')
export class PersonDmController {
  constructor(
    private service: PersonDmService
  ) {}

  @Get()
  async getAll(): Promise<PersonDm[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<PersonDm> {
    return this.service.get(id);
  }

  @Post()
  async create(@Body() p: PersonDm): Promise<PersonDm> {
    return this.service.save(p);
  }

  @Put()
  async save(@Body() p: PersonDm): Promise<PersonDm> {
    return this.service.save(p);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.service.delete(id);
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
