import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const initDataSource = (): DataSourceOptions => ({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: "attendance_db",
  synchronize: false,
  logging: true,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
});
const dataSource = new DataSource(initDataSource());

export default dataSource;
