import jwt from "jsonwebtoken";
import { connection } from "../config/db.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { createUser, findUserByEmailAndPassword } from "../models/userModel.js";

export async function loginUser(userData) {
    const db = await connection();
    const result = await findUserByEmailAndPassword(db, userData);
    return result;
}

export function signAuthToken(payload, cb) {
    jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }, cb);
}

export async function signupUser(userData) {
    const db = await connection();
    const result = await createUser(db, userData);
    return result;
}


