import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

export const getUserIdFromToken = (token: string) => {
  try {
    const decoded = jwt.decode(token) as {
      userId: string;
    };
    return decoded.userId ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
