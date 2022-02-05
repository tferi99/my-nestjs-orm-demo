import { EntityManager } from '@mikro-orm/core';

export class OrmUtils {
  static dumpUnitOfWork(em: EntityManager, label?: string) {
    const uw = em.getUnitOfWork();

    console.log('================================================================================================================');
    console.log(`EM[${label}]: `, em);
    console.log('================================================ unite-of-work =================================================');
    console.log('Identity map:', uw.getIdentityMap());
    console.log('Change sets:', uw.getChangeSets());
    console.log('Original entity:', uw.getOriginalEntityData());
    console.log('Persist stack:', uw.getPersistStack());
    console.log('Remove stack:', uw.getRemoveStack());
    console.log('Collection updates:', uw.getCollectionUpdates());
    console.log('Extra updates:', uw.getExtraUpdates());
    console.log('******************************************************************************************************************');
  }
}
