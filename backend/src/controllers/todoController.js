import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import {
    createTodoService,
    getTodosService,
    getTodoService,
    updateTodoService,
    deleteTodoService,
    deleteTodosService,
} from "../services/todoService.js";

export const createTodo = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError("User not authenticated", 401);
    }
    const todo = await createTodoService(userId, req.body);
    res.status(201).json({
        success: true,
        data: todo,
        message: "Todo created successfully"
    });
});

export const getTodos = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError("User not authenticated", 401);
    }
    const todos = await getTodosService(userId);
    res.json({
        success: true,
        data: todos,
        // count: todos.length
    });
});

export const getTodo = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError("User not authenticated", 401);
    }
    const todo = await getTodoService(userId, req.params.id);
    if (!todo) {
        throw new AppError("Todo not found", 404);
    }
    res.json({ success: true, data: todo });
});

export const updateTodo = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError("User not authenticated", 401);
    }
    const todo = await updateTodoService(userId, req.params.id, req.body);
    if (!todo) {
        throw new AppError("Todo not found", 404);
    }

    res.json({
        success: true,
        data: todo,
        message: "Todo updated successfully"
    });
});

export const deleteTodo = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError("User not authenticated", 401);
    }

    const result = await deleteTodoService(userId, req.params.id);
    if (!result || result.deletedCount === 0) {
        throw new AppError("Todo not found", 404);
    }
    res.json({
        success: true,
        message: "Todo deleted successfully"
    });
});

export const deleteTodos = asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new AppError("User not authenticated", 401);
    }
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
        throw new AppError("Invalid request. Provide 'ids' array", 400);
    }

    const result = await deleteTodosService(userId, ids);
    if (result.deletedCount === 0) {
        throw new AppError("No todos found to delete", 404);
    }
    res.json({
        success: true,
        deletedCount: result.deletedCount,
        message: `${result.deletedCount} todos deleted successfully`
    });
});
