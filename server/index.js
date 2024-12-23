import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";

const app = express();
env.config();

const PORT = process.env.PORT;

function connect() {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/comments", commentRoute);
app.use("/api/videos", videoRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ success: false, message, status });
});

app.listen(PORT, () => {
  connect();
  console.log(`server is running on port ${PORT}`);
});
