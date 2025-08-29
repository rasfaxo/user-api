import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
app.use(limiter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "User Management API" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
