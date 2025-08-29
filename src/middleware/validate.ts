import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import InvariantError from "../utils/exceptions/InvariantError";

export const validate =
  (schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error)
      return next(
        new InvariantError(error.details?.[0]?.message || "Validation error")
      );
    req.body = value;
    next();
  };
