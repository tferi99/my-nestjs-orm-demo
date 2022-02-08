import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Company } from './model/company.entity';
import { CompanyRepository } from './company.repository';
import { InjectRepository } from '@mikro-orm/nestjs';

@Controller('company')
export class CompanyController {
  constructor(
    @InjectRepository(Company) private repo: CompanyRepository
  ) {}

  @Get()
  async getAll(): Promise<Company[]> {
    return this.repo.findAll({}, { name: 'ASC' });
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.repo.crud().get(id);
  }

  @Post()
  async insert(@Body() data: Company): Promise<Company> {
    console.log('DTO:', data);
    return this.repo.crud().insert(data);
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<Company>): Promise<Company> {
    return this.repo.crud().update(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.repo.crud().delete(id);
  }

  /*  @Post('/withPerson')
  async saveWithPerson(@Body() dto: Company): Promise<Company> {
    return this.service.saveWithPerson(dto);
  }*/
}
