import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import Database from "../src/db/db.js";
import userRouter from "./routes/userRoute.js";

// dotenv configuration
dotenv.config();

// express app configuration
const app = express();

const port = parseInt(process.env.PORT);

app.set("port", port);

// Implementing morgan middleware
app.use(morgan("dev"));

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database initialized
Database.init();

// diverting user request to user router
app.use("/user", userRouter);

// checking invalid route
app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exits"));
});

// Intializing error-handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ status: false, status1: err.status || 500, mssg: err.message });
});

export default app;
