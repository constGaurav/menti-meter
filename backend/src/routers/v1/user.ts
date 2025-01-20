import { Router } from "express";
import { UserController } from "../../controllers/UserController";

const router = Router();

const userController = new UserController();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

export default router;
