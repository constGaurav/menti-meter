import prismaClient from "../config/prisma";
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
}
