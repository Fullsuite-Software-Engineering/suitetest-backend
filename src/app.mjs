import express from "express";
import dotenv from "dotenv";
import sequelize from "./configs/db.mjs";
import {
  AnswerOption,
  Bridge,
  Department,
  Examiner,
  QuestionBank,
  Quiz,
  Result,
} from "./models/index.model.mjs";

const app = express();
dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
  }
})();

export default app;
