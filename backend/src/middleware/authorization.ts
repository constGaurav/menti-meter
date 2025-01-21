import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { AppError } from "../types/error";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

const authorization = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies[config.AUTH_COOKIE_KEY];
    if (!token) {
      throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
    }

    const user = verifyAccessToken(token);
    if (!user) {
      throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
    }

    req.userId = user.userId;
    next();
  }
);

export default authorization;
