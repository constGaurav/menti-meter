import { Router } from "express";
import authorization from "../../middleware/authorization";
import { errorHandler } from "../../middleware/errorHandler";
import quizRouter from "./quiz";
import userRouter from "./user";

const router = Router();

router.use("/user", userRouter);
router.use("/quiz", authorization, quizRouter);

// Error handling middleware should be 'LAST'
router.use((err: any, req: any, res: any, next: any) => {
  errorHandler(err, req, res, next);
  next();
});

export default router;
