import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connection } from "../config/db.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { createUser, findUserByEmail } from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export async function loginUser(userData) {
    const db = await connection();
    const normalizedEmail = userData.email.toLowerCase().trim();
    const user = await findUserByEmail(db, normalizedEmail);
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordValid) return null;

    return user;
}

export async function signupUser(userData) {
    const db = await connection();
    const normalizedEmail = userData.email.toLowerCase().trim();
    const existingUser = await findUserByEmail(db, normalizedEmail);
    if (existingUser) {
        throw new AppError("User with this email already exists", 409);
    }
    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    return await createUser(db, {
        email: normalizedEmail,
        password: hashedPassword,
        createdAt: new Date(),
    });
}

export function signAuthToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN },
            (err, token) => {
                if (err) {
                    return reject(new AppError("Error generating token", 500));
                }
                resolve(token);
            }
        );
    });
}
