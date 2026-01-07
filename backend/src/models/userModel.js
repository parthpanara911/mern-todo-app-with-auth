import { USERS_COLLECTION } from "../config/env.js";

export async function findUserByEmailAndPassword(db, { email, password }) {
    const collection = await db.collection(USERS_COLLECTION);
    return await collection.findOne({ email, password });
}

export async function createUser(db, userData) {
    const collection = await db.collection(USERS_COLLECTION);
    return await collection.insertOne(userData);
}


