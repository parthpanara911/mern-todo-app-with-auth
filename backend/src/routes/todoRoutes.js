import { Router } from "express";
import {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
    deleteTodos,
} from "../controllers/todoController.js";
import { verifyJwtToken } from "../middlewares/verifyJwtToken.js";
import { validateTodo } from "../middlewares/validate.js";

const router = Router();

router.get("/", verifyJwtToken, getTodos);
router.post("/", verifyJwtToken, validateTodo, createTodo);
router.delete("/bulk", verifyJwtToken, deleteTodos);
router.get("/:id", verifyJwtToken, getTodo);
router.put("/:id", verifyJwtToken, validateTodo, updateTodo);
router.delete("/:id", verifyJwtToken, deleteTodo);

export default router;
