import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const PORT = Number(process.env.PORT) || 3200;

export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
export const CORS_CREDENTIALS =
    process.env.CORS_CREDENTIALS === "false" ? false : true;

export const JWT_SECRET = process.env.JWT_SECRET || "Google";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "5d";

export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME || "todo_app";

export const TODOS_COLLECTION = process.env.TODOS_COLLECTION || "todos";
export const USERS_COLLECTION = process.env.USERS_COLLECTION || "users";
