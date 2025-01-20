import { Router } from "express";
import { errorHandler } from "../../middleware/errorHandler";
import userRouter from "./user";

const router = Router();

router.use("/user", userRouter);

// Error handling middleware should be 'LAST'
router.use(errorHandler);

export default router;
