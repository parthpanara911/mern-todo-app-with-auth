import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { loginUser, signAuthToken, signupUser } from "../services/authService.js";

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError("Email and password are required", 400);
    }

    const user = await loginUser({ email, password });
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = await signAuthToken({
        userId: user._id.toString(),
        email: user.email,
    });

    res.cookie("token", token, {
        httpOnly: true,
        // secure: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        success: true,
        msg: "Login Successful",
        user: {
            id: user._id,
            email: user.email,
        },
    });
});

export const signup = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError("Email and password are required", 400);
    }

    const result = await signupUser({ email, password });
    if (!result?.insertedId) {
        throw new AppError("Failed to create user", 400);
    }

    const token = await signAuthToken({
        userId: result.insertedId.toString(),
        email: email,
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
        success: true,
        msg: "Signup successful",
        user: { email },
    });
});

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
        success: true,
        msg: "Logged out successfully",
    });
}

export const me = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
}
