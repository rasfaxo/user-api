import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthenticationError from "../utils/exceptions/AuthenticationError";

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const auth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header)
    return next(new AuthenticationError("Missing Authorization header"));
  const token = header.replace("Bearer ", "");
  try {
    const secret = process.env.JWT_SECRET || "secret";
    const decoded = jwt.verify(token, secret) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch (e) {
    next(new AuthenticationError("Invalid or expired token"));
  }
};
