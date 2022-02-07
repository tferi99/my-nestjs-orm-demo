import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './model/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Get()
  async getAll(): Promise<Company[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.service.get(id);
  }

  @Post()
  async create(@Body() dto: Company): Promise<Company> {
    console.log('DTO:', dto);
    return this.service.create(dto);
  }

  @Put('/:id')
  async save(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<Company>): Promise<Company> {
    return this.service.update(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Post('/withPerson')
  async saveWithPerson(@Body() dto: Company): Promise<Company> {
    return this.service.saveWithPerson(dto);
  }
}
