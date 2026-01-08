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

export async function createTodoService(payload) {
    const collection = await getTodosCollection();
    const todoWithUser = {
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    return await insertTodo(collection, todoWithUser);
}

export async function getTodosService() {
    const collection = await getTodosCollection();
    return await listTodos(collection);
}

export async function getTodoService(id) {
    const collection = await getTodosCollection();
    return await findTodoById(collection, new ObjectId(id));
}

export async function updateTodoService(id, payload) {
    const collection = await getTodosCollection();
    const update = {
        $set: {
            ...payload,
            updatedAt: new Date()
        }
    };
    return await updateTodoById(collection, new ObjectId(id), update);
}

export async function deleteTodoService(id) {
    const collection = await getTodosCollection();
    return await deleteTodoById(collection, new ObjectId(id));
}

export async function deleteTodosService(ids) {
    const collection = await getTodosCollection();
    const objectIds = ids.map(id => new ObjectId(id)); // Converts to ObjectId
    return await deleteTodosByIds(collection, objectIds);
}
