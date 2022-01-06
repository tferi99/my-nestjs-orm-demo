import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Person } from '../orm/entities/person.entity';
import { PersonService } from './person.service';
import { EmployeeType } from '@lib/orm-types';

@Controller('person')
export class PersonController {
  constructor(
    private service: PersonService
  ) {}

/*  @Get()
  async getAll(): Promise<Person[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Person> {
    return this.service.get(id);
  }

  @Post()
  async create(@Body() p: Person): Promise<Person> {
    p.id = -1;
    p.birth = new Date(1975, 3, 14);
    p.rank = 5;
    return this.service.create(p);
  }

  @Put()
  async update(@Param('id', ParseIntPipe) id: number, @Body() p: Person): Promise<Person> {
    return this.service.update(p.id, p);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Get('dummy')
  dummy(): Person {
    const p: Person = new Person();
    p.id = 0;
    p.name = 'John Smith';
      p.email = 'js@test.org';
    p.birth = new Date(1975, 3, 14);
    p.employeeType = EmployeeType.DIRECTOR;
    p.rank = 5;
    p.note = 'This is dummy person',
    p.active = true;

    return p;
  }*/
}
