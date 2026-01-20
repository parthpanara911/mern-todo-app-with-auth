import { ObjectId } from "mongodb";
import { collectionName, connection } from "../config/db.js";
import {
    deleteTodoById,
    deleteTodosByIds,
    findTodoById,
    insertTodo,
    listTodos,
    updateTodoById,
} from "../models/todoModel.js";

async function getTodosCollection() {
    const db = await connection();
    return await db.collection(collectionName);
}

export async function createTodoService(userId, payload) {
    const collection = await getTodosCollection();
    const todoWithUser = {
        ...payload,
        userId: new ObjectId(userId),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    return await insertTodo(collection, todoWithUser);
}

export async function getTodosService(userId) {
    const collection = await getTodosCollection();
    return await listTodos(collection, new ObjectId(userId));
}

export async function getTodoService(userId, id) {
    const collection = await getTodosCollection();
    return await findTodoById(collection, new ObjectId(userId), new ObjectId(id));
}

export async function updateTodoService(userId, id, payload) {
    const collection = await getTodosCollection();
    const update = {
        $set: {
            ...payload,
            updatedAt: new Date()
        }
    };
    return await updateTodoById(collection, new ObjectId(userId), new ObjectId(id), update);
}

export async function deleteTodoService(userId, id) {
    const collection = await getTodosCollection();
    return await deleteTodoById(collection, new ObjectId(userId), new ObjectId(id));
}

export async function deleteTodosService(userId, ids) {
    const collection = await getTodosCollection();
    const objectIds = ids.map(id => new ObjectId(id)); // Converts to ObjectId
    return await deleteTodosByIds(collection, new ObjectId(userId), objectIds);
}
