import { Router } from "express";
import { errorHandler } from "../../middleware/errorHandler";
import userRouter from "./user";
import quizRouter from "./quiz";

const router = Router();

router.use("/user", userRouter);
router.use("/quiz", quizRouter);

// Error handling middleware should be 'LAST'
router.use((err: any, req: any, res: any, next: any) => {
  errorHandler(err, req, res, next);
  next();
});

export default router;
