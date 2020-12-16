import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CompanyService } from './company.service';
import { Company } from './company.entity';

@Controller('company')
export class CompanyController {
  constructor(
    private service: CompanyService
  ) {}

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
    return this.service.save(dto);
  }

  @Put()
  async save(@Body() dto: Company): Promise<Company> {
    return this.service.save(dto);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.service.delete(id);
  }

}
