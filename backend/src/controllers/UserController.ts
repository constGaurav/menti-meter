import { Request, Response } from "express";
import { config } from "../config";
import { UserService } from "../services/UserService";
import { AppError } from "../types/error";
import { UserLoginSchema, UserSignUpSchema } from "../types/user";
import { asyncHandler } from "../utils/asyncHandler";
import { generateAccessToken } from "../utils/jwt";

const userService = new UserService();

export class UserController {
  signUp = asyncHandler(async (req: Request, res: Response) => {
    const signUpRequest = UserSignUpSchema.safeParse(req.body);
    if (!signUpRequest.success) {
      throw new AppError(
        400,
        "Invalid data",
        "INVALID_REQUEST",
        signUpRequest.error.issues
      );
    }

    const user = await userService.createUser(signUpRequest.data);

    // Set JWT cookie
    const token = generateAccessToken(user.id);
    res.cookie(config.AUTH_COOKIE_KEY, token, {
      httpOnly: true,
      secure: false,
    });

    res.status(201).json({
      message: "User created successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const loginRequest = UserLoginSchema.safeParse(req.body);
    if (!loginRequest.success) {
      throw new AppError(
        400,
        "Invalid data",
        "INVALID_REQUEST",
        loginRequest.error.issues
      );
    }

    const user = await userService.login(loginRequest.data);

    // Set JWT cookie
    const token = generateAccessToken(user.id);
    res.cookie(config.AUTH_COOKIE_KEY, token, {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie(config.AUTH_COOKIE_KEY);
    res.status(200).json({
      message: "User logged out successfully",
    });
  });
}
