import Joi from 'joi';
import { AppConfig } from './app.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface ConfigTypes {
  app: AppConfig;
  db: TypeOrmModuleOptions;
}

export const configSchema = Joi.object({
  PORT: Joi.string().default(3000),
  APP_MESSAGE: Joi.string().default('Hello'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNC: Joi.number().valid(0, 1).required(),
});
