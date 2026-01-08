import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_CREDENTIALS, CORS_ORIGIN } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: CORS_ORIGIN,   // Allow Requests from frontend
        credentials: CORS_CREDENTIALS,
    }),
);
app.use(cookieParser()); // Parses cookies for jwt

app.use(authRoutes);
app.use(todoRoutes);

app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`
    });
});

export default app;