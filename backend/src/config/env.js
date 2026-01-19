import dotenv from "dotenv";

dotenv.config();

const requiredEnv = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`FATAL ERROR: Environment variable ${name} is missing`);
    }
    return value;
};

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = Number(process.env.PORT) || 3200;

export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
export const CORS_CREDENTIALS = process.env.CORS_CREDENTIALS !== "false";

export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017";
export const DB_NAME = requiredEnv("DB_NAME");

export const TODOS_COLLECTION = process.env.TODOS_COLLECTION;
export const USERS_COLLECTION = process.env.USERS_COLLECTION;

export const JWT_SECRET = requiredEnv("JWT_SECRET");
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
