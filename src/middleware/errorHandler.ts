import { NextFunction, Request, Response } from "express";
import ClientError from "../utils/exceptions/ClientError";

/**
 * Global error handler translating domain (ClientError) exceptions into
 * structured API responses. Non-domain errors become 500 responses.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ClientError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }

  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};
