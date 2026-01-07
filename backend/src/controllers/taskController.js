import {
    addTask,
    deleteMultipleTasks,
    deleteTaskById,
    getTaskById,
    getTasks,
    updateTask,
} from "../services/taskService.js";

export async function createTask(req, res) {
    const result = await addTask(req.body);
    if (result) {
        res.send({ message: "new task added", success: true, result });
    } else {
        res.send({ message: " task not added", success: false });
    }
}

export async function listTasks(req, res) {
    const result = await getTasks();
    if (result) {
        res.send({ message: "task list fetched", success: true, result });
    } else {
        res.send({ message: "error try after sometime", success: false });
    }
}

export async function getTask(req, res) {
    const id = req.params.id;
    const result = await getTaskById(id);
    if (result) {
        res.send({ message: "task  fetched", success: true, result });
    } else {
        res.send({ message: "error try after sometime", success: false });
    }
}

export async function updateTaskData(req, res) {
    const result = await updateTask(req.body);
    if (result) {
        res.send({ message: "task data updated", success: true, result });
    } else {
        res.send({ message: "error try after sometime", success: false });
    }
}

export async function removeTask(req, res) {
    const id = req.params.id;
    const result = await deleteTaskById(id);
    if (result) {
        res.send({ message: "task deleted ", success: true, result });
    } else {
        res.send({ message: "error try after sometime", success: false });
    }
}

export async function removeMultiple(req, res) {
    const Ids = req.body;
    console.log(Ids);
    const result = await deleteMultipleTasks(Ids);
    if (result) {
        res.send({ message: "task deleted ", success: result });
    } else {
        res.send({ message: "error try after sometime", success: false });
    }
}


