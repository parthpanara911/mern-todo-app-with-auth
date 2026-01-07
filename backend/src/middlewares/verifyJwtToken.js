import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export function verifyJwtToken(req, res, next) {
    //  console.log("verifyJWTToken ", req.cookies['token']);
    const token = req.cookies["token"];
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.send({
                msg: "invalid token",
                success: false,
            });
        }
        next();
    });
}


