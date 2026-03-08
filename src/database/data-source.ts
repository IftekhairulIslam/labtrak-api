import 'dotenv/config';
import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER ?? 'user_name',
  password: process.env.DB_PASSWORD ?? 'user_password',
  database: process.env.DB_NAME ?? 'labtrak',

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],

  synchronize: false,
  migrationsRun: false,
});

export default appDataSource;
