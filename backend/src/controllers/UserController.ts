import { Request, Response } from "express";
import { UserLoginSchema, UserSignUpSchema } from "../types/user";
import { AppError } from "../types/error";
import { UserService } from "../services/UserService";
import { asyncHandler } from "../utils/asyncHandler";

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

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
}
