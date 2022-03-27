import { AnyEntity, EntityName, MikroORM } from '@mikro-orm/core';
import { GET_MIKRO_ORM_OPTIONS } from '../../../config/mikro-orm.config';
import { BASE_ENTITIES } from '../entity/base-entities';

export class DatabaseSchemaCreator {
  static async create(entities: EntityName<AnyEntity<any>>[], exitOnError: boolean) {
    try {
      const options = GET_MIKRO_ORM_OPTIONS();
      options.entities = [...BASE_ENTITIES, ...entities];

      const orm = await MikroORM.init(options);

      const generator = orm.getSchemaGenerator();

      const dropDump = await generator.getDropSchemaSQL();
      console.log(dropDump);

      const createDump = await generator.getCreateSchemaSQL();
      console.log(createDump);

      const updateDump = await generator.getUpdateSchemaSQL();
      console.log(updateDump);

      // there is also `generate()` method that returns drop + create queries
      const dropAndCreateDump = await generator.generate();
      console.log(dropAndCreateDump);

      // or you can run those queries directly, but be sure to check them first!
      await generator.dropSchema();
      await generator.createSchema();
      await generator.updateSchema();

      await orm.close(true);
    } catch (e) {
      console.log('');
      console.log('');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.error('Error during creating DB schema', e);
      process.exit(1);
    }
  }
}
