import { Sequelize } from "sequelize";
import env from "./env.mjs";
import mysql from "mysql2";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "mysql",
  dialectModule: mysql,
  // dialectOptions: {
  //   connectTimeout: 20000,
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: true,
  //   },
  // },
});

export default sequelize;
