import express from "express";
import dotenv from "dotenv";
import sequelize from "./configs/db.mjs";
import {
  Applicant,
  Department,
  Quiz,
  QuestionBank,
  AnswerOption,
  Result,
  Bridge,
  TestLink,
} from "./models/index.model.mjs";

const app = express();
dotenv.config();

app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established succesfully.");

    // await sequelize.sync({
    //   alter: true,
    // });
    // console.log("All models synced");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  } finally {
    console.log("Database Sync Successfully");
  }
})();

export default app;
