import { QuestionRepository } from "../repositories/QuestionRepository";
import { TCreateQuestion } from "../types/question";

export class QuestionService {
  private questionRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  async addQuestionToQuiz(quizId: string, data: TCreateQuestion) {
    const question = await this.questionRepository.createQuestion(quizId, data);
    return question;
  }
}
