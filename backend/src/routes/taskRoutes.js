import { Router } from "express";
import {
    createTask,
    getTask,
    listTasks,
    removeMultiple,
    removeTask,
    updateTaskData,
} from "../controllers/taskController.js";
import { verifyJwtToken } from "../middlewares/verifyJwtToken.js";

const router = Router();

router.post("/add-task", verifyJwtToken, createTask);
router.get("/tasks", verifyJwtToken, listTasks);
router.get("/task/:id", verifyJwtToken, getTask);
router.put("/update-task", verifyJwtToken, updateTaskData);
router.delete("/delete/:id", verifyJwtToken, removeTask);
router.delete("/delete-multiple", verifyJwtToken, removeMultiple);

export default router;


