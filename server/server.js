import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import router from "./routes/goalRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleare.js";
import connectDB from "./config/db.js";

connectDB();

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals/", router);
app.use("/api/users", userRouter);

// middleware
// error handler and error controllers
app.use(errorHandler);

app.get("/api/", (req, res) => {
  console.log("api has running".black.bgWhite);
});

app.listen(3001, () => {
  console.log("server has running".blue);
});
