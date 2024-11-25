import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db";
import auth from "./routes/auth";
import fav from "./routes/fav";

const app = express();

// db 연결
connectDB();

// middleware
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"], // 허용할 HTTP 메서드
    credentials: true, // 쿠키를 포함한 인증정보 전송 허용 (필요한 경우)
  })
);
app.use(express.json());
app.use(morgan("dev")); // Morgan 미들웨어 설정

// router
app.use("/api/auth", auth);
app.use("/api/fav", fav);

export default app;
