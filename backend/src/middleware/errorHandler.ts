import { NextFunction, Request, Response } from "express";
import { AppError } from "../types/error";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      code: err.code,
      data: err.data,
    });
    next();
  }

  // Handle unknown errors
  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    code: "INTERNAL_ERROR",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
  next();
};
