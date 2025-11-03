import express from "express";
import dotenv from "dotenv";
import sequelize from "./configs/db.mjs";

const app = express();
dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

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
