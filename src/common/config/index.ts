import 'dotenv/config';
import * as Joi from 'joi';
import { Config } from './config.interface';

const env = {
  APP_PORT: process.env.APP_PORT,
  EXCHANGE_RATE_API_URL: process.env.EXCHANGE_RATE_API_URL,
  EXCHANGE_RATE_API_CACHE_MAX_RESULTS:
    process.env.EXCHANGE_RATE_API_CACHE_MAX_RESULTS,
  DB_CONFIG: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  ZIPKIN_URL: process.env.ZIPKIN_URL,
};

const configSchema = Joi.object<Config>({
  APP_PORT: Joi.number().required(),
  EXCHANGE_RATE_API_URL: Joi.string().required(),
  EXCHANGE_RATE_API_CACHE_MAX_RESULTS: Joi.number().required(),
  DB_CONFIG: Joi.object({
    client: Joi.string().required(),
    connection: Joi.object({
      host: Joi.string().required(),
      port: Joi.number().required(),
      database: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  }),
  ZIPKIN_URL: Joi.string(),
});

const { error, value: config } = configSchema.validate(env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export { config };
