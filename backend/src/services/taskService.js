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

export async function addTask(payload) {
    const collection = await getTodosCollection();
    return await insertTodo(collection, payload);
}

export async function getTasks() {
    const collection = await getTodosCollection();
    return await listTodos(collection);
}

export async function getTaskById(id) {
    const collection = await getTodosCollection();
    return await findTodoById(collection, new ObjectId(id));
}

export async function updateTask(payload) {
    const collection = await getTodosCollection();
    const { _id, ...fields } = payload;
    const update = { $set: fields };
    return await updateTodoById(collection, new ObjectId(_id), update);
}

export async function deleteTaskById(id) {
    const collection = await getTodosCollection();
    return await deleteTodoById(collection, new ObjectId(id));
}

export async function deleteMultipleTasks(ids) {
    const collection = await getTodosCollection();
    const deleteTaskIds = ids.map((item) => new ObjectId(item));
    return await deleteTodosByIds(collection, deleteTaskIds);
}


