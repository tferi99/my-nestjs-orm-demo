import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Person } from '../entities/person.entity';
import { PersonService } from './person.service';
import { EmployeeType } from 'my-ts-orm-demo-lib';

@Controller('person')
export class PersonController {
  constructor(
    private service: PersonService
  ) {}

  @Get()
  async getAll(): Promise<Person[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Person> {
    return this.service.get(id);
  }

  @Post()
  async create(@Body() p: Person): Promise<Person> {
    return this.service.save(p);
  }

  @Put()
  async save(@Body() p: Person): Promise<Person> {
    return this.service.save(p);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Get('dummy')
  dummy(): Person {
    const p: Person = {
      id: 0,
      name: 'John Smith',
      email: 'js@test.org',
      birth: new Date(1975, 3, 14),
      employeeType: EmployeeType.DIRECTOR,
      rank: 5,
      note: 'This is dummy person',
//      company: undefined,
      active: true
    };
    return p;
  }
}
