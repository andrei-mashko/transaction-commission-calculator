import type { Knex } from 'knex';
import { config as appConfig } from './src/common/config';

// Update with your config settings.

const defaultConfig: Knex.Config = {
  ...appConfig.DB_CONFIG,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

const config: { [key: string]: Knex.Config } = {
  development: {
    ...defaultConfig,
    migrations: {
      ...defaultConfig.migrations,
      loadExtensions: ['.ts'],
    },
  },
  production: {
    ...defaultConfig,
    migrations: {
      ...defaultConfig.migrations,
      loadExtensions: ['.js'],
    },
  },
};

module.exports = config;
