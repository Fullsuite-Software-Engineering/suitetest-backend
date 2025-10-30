import { Sequelize } from "sequelize";
import env from "./env.mjs";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "mysql",
});

export default sequelize;
