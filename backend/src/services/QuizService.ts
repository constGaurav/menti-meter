import { QuizRepository } from "../repositories/QuizRepository";
import { TCreateQuiz } from "../types/quiz";

export class QuizService {
  private quizRepository;
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async createQuiz(data: TCreateQuiz, userId: string) {
    const quiz = await this.quizRepository.createQuiz(data, userId);
    return quiz;
  }
}
