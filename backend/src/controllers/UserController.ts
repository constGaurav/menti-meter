import { Request, Response } from "express";
import { UserSignUpSchema } from "../types/user";
import { AppError } from "../types/error";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  async signUp(req: Request, res: Response) {
    const signUpRequest = UserSignUpSchema.safeParse(req.body);
    if (!signUpRequest.success) {
      throw new AppError(
        400,
        "Invalid data",
        "INVALID_REQUEST",
        signUpRequest.data
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
  }
}
