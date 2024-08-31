import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import logger from "morgan";
import authRouter from "./routes/api/auth-router.js";
import chatsRouter from "./routes/api/chats-router.js";

interface CustomError extends Error {
  status?: number;
}

const app: Application = express();
const server = http.createServer(app);
export const wsServer = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

wsServer.on("connection", () => {
  console.log("New fronterd connected!");
});

const formatlogger = process.env.NODE_ENV === "development" ? "dev" : "short";

app.use(logger(formatlogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/chats", chatsRouter);

app.use((req: Request, res: Response) => {
  res.json({ message: "Not Found" });
});

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
);

export default server;
