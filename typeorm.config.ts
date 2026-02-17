import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
console.log(__dirname + 'dist/src/migrations/*{.ts,.js}');

const isProductionDB = typeof process.env.DATABASE_URL !== 'undefined';

export default new DataSource(
  isProductionDB
    ? {
        type: 'postgres',
        ssl: {
          rejectUnauthorized: false,
        },
        url: process.env.DATABASE_URL,
        synchronize: false,
        entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: false,
      },
);
