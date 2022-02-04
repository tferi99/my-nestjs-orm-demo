import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class OrmService {
  constructor(private em: EntityManager) {}
}
