import { Router } from "express";
import { login, signup, logout, me } from "../controllers/authController.js";
import { validateUser } from "../middlewares/validate.js";
import { verifyJwtToken } from "../middlewares/verifyJwtToken.js";

const router = Router();

router.post("/login", validateUser, login);
router.post("/signup", validateUser, signup);
router.get("/me", verifyJwtToken, me);
router.post("/logout", logout);

export default router;