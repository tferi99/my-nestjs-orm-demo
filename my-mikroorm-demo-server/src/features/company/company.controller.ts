import { Controller } from '@nestjs/common';
import { Company } from './model/company.entity';
import { CompanyRepository } from './company.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventEmitterService } from '../../core/events/event-emitter.service';
import { OrmCrudControllerBase } from '../../core/orm/controller/orm-crud-controller.base';
import { CrudEntityRepository } from 'src/core/orm/service/crud-entity-repository';

@Controller('company')
export class CompanyController extends OrmCrudControllerBase<Company> {
  constructor(
    @InjectRepository(Company) private repo: CompanyRepository,
    private eventEmitterService: EventEmitterService,
  ) {
    super({ orderBy: { name: 'ASC' } });
  }

  getRepository(): CrudEntityRepository<Company> {
    return this.repo;
  }
}

/*  @Get()
  async getAll(): Promise<Company[]> {
    return this.repo.findAll({ orderBy: { name: 'ASC' } });
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.repo.crud().get(id);
  }

  @Post()
  async insert(@Body() data: Company): Promise<Company> {
    console.log('DTO:', data);
    const obj = await this.repo.crud().insert(data);
    await this.repo.flush();
    return obj;
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<Company>): Promise<Company> {
    const obj = await this.repo.crud().update(id, dto);
    await this.repo.flush();
    return obj;
  }

  @Put('/:id/native')
  async nativeUpdate(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Company>): Promise<number> {
    return this.repo.crud().nativeUpdate(id, data);
  }

  @Delete('native')
  async deleteAll(): Promise<void> {
    await this.repo.crud().nativeDelete({});
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.repo.crud().delete(id);
    await this.repo.flush();
  }

  @Delete('/:id/native')
  async nativeDelete(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.repo.crud().nativeDelete(id);
  }
}*/
