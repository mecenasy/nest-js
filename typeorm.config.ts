import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
console.log(__dirname + 'dist/src/migrations/*{.ts,.js}');
export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [__dirname + '/dist/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/dist/src/migrations/*{.ts,.js}'],
});
