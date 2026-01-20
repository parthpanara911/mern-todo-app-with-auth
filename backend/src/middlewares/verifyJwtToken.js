import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import AppError from "../utils/AppError.js";

export function verifyJwtToken(req, res, next) {
    //  console.log("verifyJWTToken ", req.cookies['token']);
    const token = req.cookies.token;
    if (!token) {
        throw new AppError("No token provided", 401);
    }
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            throw new AppError("Invalid or expired token", 401);
        }
        req.user = {
            userId: decoded.userId || decoded.id,
            email: decoded.email
        };

        next();
    });
}
