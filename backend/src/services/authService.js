import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connection } from "../config/db.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { createUser, findUserByEmail } from "../models/userModel.js";

export async function loginUser(userData) {
    const db = await connection();
    const user = await findUserByEmail(db, userData.email);
    if (!user) {
        return null;
    }
    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    return user;
}

export function signAuthToken(payload, cb) {
    jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }, cb);
}

export async function signupUser(userData) {
    const db = await connection();
    const existingUser = await findUserByEmail(db, userData.email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    // Replace plain password with hashed password
    const userDataWithHashedPassword = {
        ...userData,
        password: hashedPassword
    };
    const result = await createUser(db, userDataWithHashedPassword);
    return result;
}
