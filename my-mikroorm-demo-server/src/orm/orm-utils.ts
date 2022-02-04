import { EntityManager } from '@mikro-orm/core';

export class OrmUtils {
  static dumpUnitOfWork(em: EntityManager) {
    const uw = em.getUnitOfWork();

    console.log('EM: ', em);
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
