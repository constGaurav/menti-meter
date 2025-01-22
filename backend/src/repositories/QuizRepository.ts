import prismaClient from "../config/prisma";
import { AppError } from "../types/error";
import { TCreateQuiz } from "../types/quiz";
import { generateCode, generateIdentifier } from "../utils";

export class QuizRepository {
  async createQuiz(data: TCreateQuiz, userId: string) {
    const quiz = await prismaClient.quiz.create({
      data: {
        title: data.title,
        description: data.description,
        identifier: generateIdentifier(data.title),
        code: generateCode(),
        userId,
      },
    });
    return quiz;
  }

  async quizzesList(userId: string) {
    const quizzes = await prismaClient.quiz.findMany({
      where: {
        userId,
      },
    });
    return quizzes;
  }

  async getQuizDetails(quizId: string) {
    const quiz = await prismaClient.quiz.findUnique({
      where: {
        id: quizId,
      },
    });

    if (!quiz) {
      throw new AppError(404, "Quiz not found", "QUIZ_NOT_FOUND");
    }

    const questions = await prismaClient.question.findMany({
      where: {
        quizId,
      },
    });

    return { ...quiz, questions };
  }
}
