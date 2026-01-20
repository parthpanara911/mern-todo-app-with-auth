import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_CREDENTIALS, CORS_ORIGIN } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import AppError from "./utils/AppError.js";
import errorHandler from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: CORS_ORIGIN,   // Allow Requests from frontend
        credentials: CORS_CREDENTIALS,
    }),
);
app.use(cookieParser()); // Parses cookies for jwt

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;