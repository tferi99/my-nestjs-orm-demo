"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOrmConfig = void 0;
function createTypeOrmConfig() {
    return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'mytypeormdemo',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
        logging: 'all',
        logger: 'advanced-console'
    };
}
exports.createTypeOrmConfig = createTypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map