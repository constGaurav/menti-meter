import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET) as {
      userId: string;
    };
  } catch (error) {
    return null;
  }
};
