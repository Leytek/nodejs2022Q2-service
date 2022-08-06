import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/**/migration/*.js'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
