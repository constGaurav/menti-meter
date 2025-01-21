import prismaClient from "../config/prisma";
import { TCreateQuestion } from "../types/question";

export class QuestionRepository {
  async createQuestion(quizId: string, data: TCreateQuestion) {
    const question = await prismaClient.question.create({
      data: {
        ...data,
        quizId,
      },
    });
    return question;
  }
}
