import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./configs/db.mjs";
import routes from "./routes/index.routes.mjs";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // await sequelize.sync({
    //   force: true,
    // });
    // console.log("All models synced");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
