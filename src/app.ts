import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import auth from "./routes/auth";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Morgan 미들웨어 설정

// router
app.use("/api/auth", auth);

export default app;
