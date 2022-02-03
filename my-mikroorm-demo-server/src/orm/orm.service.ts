import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class OrmService {
  constructor(private em: EntityManager) {}

  dumpUnitOfWork() {
    const uw = this.em.getUnitOfWork();

    console.log('=================== UniteOfWork ========================');
    console.log('Change sets:', uw.getChangeSets());
    console.log('Original entity:', uw.getOriginalEntityData());
    console.log('Persist stack:', uw.getPersistStack());
    console.log('Remove stack:', uw.getRemoveStack());
    console.log('Collection updates:', uw.getCollectionUpdates());
    console.log('Extra updates:', uw.getExtraUpdates());
    console.log('========================================================');
  }
}
