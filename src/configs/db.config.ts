import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const isProductionDB = typeof process.env.DATABASE_URL !== 'undefined';

export const typeOrmConfig = registerAs(
  'db',
  (): TypeOrmModuleOptions =>
    isProductionDB
      ? {
          type: 'postgres',
          ssl: {
            rejectUnauthorized: false,
          },
          url: process.env.DATABASE_URL,
          synchronize: false,
        }
      : {
          type: 'postgres',
          host: process.env.DB_HOST ?? 'localhost',
          port: parseInt(process.env.DB_PORT ?? '5432'),
          username: process.env.DB_USER ?? 'postgres',
          password: process.env.DB_PASSWORD ?? 'postgres',
          database: process.env.DB_DATABASE ?? 'tasks',
          synchronize: process.env.DB_SYNC === '1',
        },
);
