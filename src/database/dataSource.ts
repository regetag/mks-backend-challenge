import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Movie } from './entities/Movies.entity';
import { User } from './entities/User.entity';

const prodConfig = {
  migrationsRun: true,
  migrations: ['./dist/database/migrations/**.js'],
  synchronize: false,
};

const devConfig = {
  migrationsRun: false,
  synchronize: true,
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Movie, User],
  ...(process.env.NODE_ENV ? devConfig : prodConfig),
};

const cliDatasource = new DataSource(dataSourceOptions);

export default cliDatasource;
