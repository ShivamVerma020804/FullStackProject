import dotenv from "dotenv";
dotenv.config({ path: "./.env" });  // ← add this at very top
console.log("CORS_ORIGIN =", process.env.CORS_ORIGIN);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",  // ← fallback just in case
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
// import videoRouter from "./routes/video.routes.js";
import videoRouter from "./routes/video.routes.js";

console.log(import.meta.url);
console.log(videoRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
console.log("✅ userRouter mounted at /api/v1/users");
console.log("✅ videoRouter mounted at /api/v1/videos");


// //http://localhost:8000/api/v1/users/register

export { app };

