import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TransformUrl } from './transform-url/transform-url.entity';
import { User } from './user/user.entity';
import { UrlTrack } from './url-track/url-track.entity';

export const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [TransformUrl, User, UrlTrack],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration',
  migrationsRun: true,
  synchronize: true,
};

const datasource = new DataSource(options);

export default datasource;
