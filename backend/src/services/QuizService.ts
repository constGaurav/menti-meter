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

  async quizzesList(userId: string) {
    const quiz = await this.quizRepository.quizzesList(userId);
    return quiz;
  }

  async getQuizDetails(quizId: string) {
    const quiz = await this.quizRepository.getQuizDetails(quizId);
    return quiz;
  }
}
