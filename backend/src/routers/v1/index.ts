import { Router } from "express";
import { errorHandler } from "../../middleware/errorHandler";
import userRouter from "./user";

const router = Router();

router.use("/user", userRouter);

// Error handling middleware should be 'LAST'
router.use((err: any, req: any, res: any, next: any) => {
  errorHandler(err, req, res, next);
  next();
});

export default router;
