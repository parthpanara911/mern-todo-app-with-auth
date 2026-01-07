import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_CREDENTIALS, CORS_ORIGIN } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: CORS_CREDENTIALS,
    }),
);
app.use(cookieParser());

app.use(authRoutes);
app.use(taskRoutes);

export default app;


