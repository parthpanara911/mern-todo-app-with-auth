import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export function verifyJwtToken(req, res, next) {
    //  console.log("verifyJWTToken ", req.cookies['token']);
    const token = req.cookies["token"];
    if (!token) {
        return res.status(401).json({
            success: false,
            error: "No token provided"
        });
    }
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                success: false,
                error: "Invalid or expired token"
            });
        }
        req.user = {
            userId: decoded.userId || decoded.id,
            email: decoded.email
        };

        next();
    });
}
