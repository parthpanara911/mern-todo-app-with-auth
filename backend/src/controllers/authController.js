import { loginUser, signAuthToken, signupUser } from "../services/authService.js";

export async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            msg: "Email and password are required",
        });
    }

    try {
        const result = await loginUser({ email, password });
        if (!result) {
            return res.status(401).json({
                success: false,
                msg: "Invalid email or password",
            });
        }

        signAuthToken({ userId: result._id.toString(), email: result.email }, (error, token) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    msg: "Error generating token",
                });
            }
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
                    email: result.email,
                    id: result._id
                },
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message || "Login failed",
        });
    }
}

export async function signup(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            msg: "Email and password are required",
        });
    } try {
        const result = await signupUser({ email, password });
        if (!result || !result.insertedId) {
            return res.status(400).json({
                success: false,
                msg: "Failed to create user",
            });
        }
        signAuthToken({ userId: result.insertedId.toString(), email }, (error, token) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    msg: "Error generating token",
                });
            }
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
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: error.message || "Signup failed",
        });
    }
} 
