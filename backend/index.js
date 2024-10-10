import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

import authRoutes from "./routes/auth.js";
import fishRoutes from "./routes/fish.js";
import orderRoutes from "./routes/order.js";
import { setupSocket } from "./services/socket.js";

configDotenv();
const app = express();
const httpServer = createServer(app);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// API
app.use("/api/auth", authRoutes);
app.use("/api/fish", fishRoutes);
app.use("/api/order", orderRoutes);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  },
});

// Socket Setup
setupSocket(io);

httpServer.listen(process.env.PORT, async (req, res) => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
