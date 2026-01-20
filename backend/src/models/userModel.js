import { USERS_COLLECTION } from "../config/env.js";

export async function findUserByEmail(db, email) {
    const collection = db.collection(USERS_COLLECTION);
    return await collection.findOne({ email });
}

export async function createUser(db, userData) {
    const collection = db.collection(USERS_COLLECTION);
    return await collection.insertOne(userData);
}