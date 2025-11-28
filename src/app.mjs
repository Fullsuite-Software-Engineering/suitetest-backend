import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./configs/db.mjs";
import routes from "./routes/index.routes.mjs";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [
      process.env.FRONT_END_BASE_URL_DEV || "http://localhost:5173",
      process.env.FRONT_END_BASE_URL_PROD,
    ],
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
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
