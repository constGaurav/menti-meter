import { Request, Response } from "express";
import { config } from "../config";
import { QuizService } from "../services/QuizService";
import { AppError } from "../types/error";
import { CreateQuizSchema } from "../types/quiz";
import { asyncHandler } from "../utils/asyncHandler";

const quizService = new QuizService();

export class QuizController {
  createQuiz = asyncHandler(async (req: Request, res: Response) => {
    const createQuizRequest = CreateQuizSchema.safeParse(req.body);
    if (!createQuizRequest.success) {
      throw new AppError(
        400,
        "Invalid data",
        "INVALID_REQUEST",
        createQuizRequest.error.issues
      );
    }

    const userId = req.cookies[config.AUTH_COOKIE_KEY];
    if (!userId) {
      throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
    }

    const quiz = await quizService.createQuiz(createQuizRequest.data, userId);

    res.status(201).json({
      message: "Quiz created successfully",
      data: quiz,
    });
  });
}
