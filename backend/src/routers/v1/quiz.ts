import { Router } from "express";
import { QuizController } from "../../controllers/QuizController";

const router = Router();

const quizController = new QuizController();

router.post("/create", quizController.createQuiz);

export default router;
