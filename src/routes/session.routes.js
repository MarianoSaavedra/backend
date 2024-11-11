import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { passportCall } from "../utils/utils.js";
const userController = new UserController();

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", passportCall("jwt"), userController.current);
router.post("/logout", userController.logout);

export default router;
