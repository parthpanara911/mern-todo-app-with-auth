import {
    createTodoService,
    getTodosService,
    getTodoService,
    updateTodoService,
    deleteTodoService,
    deleteTodosService,
} from "../services/todoService.js";

export async function createTodo(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: "User not authenticated"
            });
        }
        const todo = await createTodoService(userId, req.body);
        res.status(201).json({
            success: true,
            data: todo,
            message: "Todo created successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

export async function getTodos(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: "User not authenticated"
            });
        }
        const todos = await getTodosService(userId);
        res.json({
            success: true,
            data: todos,
            // count: todos.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export async function getTodo(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: "User not authenticated"
            });
        }
        const todo = await getTodoService(userId, req.params.id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                error: "Todo not found"
            });
        }
        res.json({ success: true, data: todo });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export async function updateTodo(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: "User not authenticated"
            });
        }
        const todo = await updateTodoService(userId, req.params.id, req.body);
        if (!todo || todo.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                error: "Todo not found"
            });
        }
        res.json({
            success: true,
            data: todo,
            message: "Todo updated successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

export async function deleteTodo(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: "User not authenticated"
            });
        }
        const result = await deleteTodoService(userId, req.params.id);
        if (!result || result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                error: "Todo not found"
            });
        }
        res.json({
            success: true,
            message: "Todo deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
export async function deleteTodos(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: "User not authenticated"
            });
        }
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({
                success: false,
                error: "Invalid request. Provide 'ids' array"
            });
        }

        const result = await deleteTodosService(userId, ids);
        res.json({
            success: true,
            deletedCount: result.deletedCount,
            message: `${result.deletedCount} todos deleted successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
