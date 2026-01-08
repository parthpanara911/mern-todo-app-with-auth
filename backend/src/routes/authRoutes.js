import { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import { validateUser } from "../middlewares/validate.js";

const router = Router();

router.post("/login", validateUser, login);
router.post("/signup", validateUser, signup);

export default router;
