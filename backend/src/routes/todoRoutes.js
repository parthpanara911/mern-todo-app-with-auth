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

router.get("/api/todos", verifyJwtToken, getTodos);
router.post("/api/todos", verifyJwtToken, validateTodo, createTodo);
router.get("/api/todos/:id", verifyJwtToken, getTodo);
router.put("/api/todos/:id", verifyJwtToken, validateTodo, updateTodo);
router.delete("/api/todos/:id", verifyJwtToken, deleteTodo);
router.delete("/api/todos", verifyJwtToken, deleteTodos);

export default router;
