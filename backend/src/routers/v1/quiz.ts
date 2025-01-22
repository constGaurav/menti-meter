import { Router } from "express";
import { QuizController } from "../../controllers/QuizController";

const router = Router();

const quizController = new QuizController();

router.post("/create", quizController.createQuiz);
router.post("/:quizId/add-question", quizController.addQuestionToQuiz);
router.get("/list", quizController.quizzesList);
router.get("/:quizId", quizController.getQuizDetails);

export default router;
