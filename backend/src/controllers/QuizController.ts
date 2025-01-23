import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authorization";
import { QuestionService } from "../services/QuestionService";
import { QuizService } from "../services/QuizService";
import { AppError } from "../types/error";
import { CreateQuestionSchema } from "../types/question";
import { CreateQuizSchema } from "../types/quiz";
import { asyncHandler } from "../utils/asyncHandler";

const quizService = new QuizService();
const questionService = new QuestionService();

export class QuizController {
  createQuiz = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const createQuizRequest = CreateQuizSchema.safeParse(req.body);
      if (!createQuizRequest.success) {
        throw new AppError(
          400,
          "Invalid data",
          "INVALID_REQUEST",
          createQuizRequest.error.issues
        );
      }

      const userId = req?.userId;
      if (!userId) {
        throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
      }

      const quiz = await quizService.createQuiz(createQuizRequest.data, userId);

      res.status(201).json({
        message: "Quiz created successfully",
        data: quiz,
      });
    }
  );

  addQuestionToQuiz = asyncHandler(async (req: Request, res: Response) => {
    const questionRequest = CreateQuestionSchema.safeParse(req.body);
    if (!questionRequest.success) {
      throw new AppError(
        400,
        "Invalid data",
        "INVALID_REQUEST",
        questionRequest.error.issues
      );
    }

    const quizId = req.params.quizId;
    if (!quizId) {
      throw new AppError(400, "Invalid quiz id", "INVALID_REQUEST");
    }

    //TODO: Need to add validation for only quiz owner can add questions to the quiz.

    const question = await questionService.addQuestionToQuiz(
      quizId,
      questionRequest.data
    );

    res.status(201).json({
      message: "Question added successfully",
      data: question,
    });
  });

  quizzesList = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      // return all quizzes created by the user.
      const userId = req?.userId;
      if (!userId) {
        throw new AppError(401, "Unauthorized", "UNAUTHORIZED");
      }

      const quizzes = await quizService.quizzesList(userId);
      res.status(200).json({
        message: "Quizzes list",
        data: quizzes,
      });
    }
  );

  getQuizDetails = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const quizId = req.params.quizId;
      if (!quizId) {
        throw new AppError(400, "Invalid quiz id", "INVALID_REQUEST");
      }

      const quiz = await quizService.getQuizDetails(quizId);
      res.status(200).json({
        message: "Quiz details",
        data: quiz,
      });
    }
  );
}
