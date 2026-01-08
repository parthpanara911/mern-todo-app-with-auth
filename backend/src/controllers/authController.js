import { loginUser, signAuthToken, signupUser } from "../services/authService.js";

export async function login(req, res) {
    const userData = req.body;
    if (userData.email && userData.password) {
        try {
            const result = await loginUser(userData);
            if (result) {
                signAuthToken({ userId: result._id.toString(), email: result.email }, (error, token) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            msg: "Error generating token",
                        });
                    }
                    res.send({
                        success: true,
                        msg: "login done",
                        token,
                    });
                });
            } else {
                res.status(401).send({
                    success: false,
                    msg: "Invalid email or password",
                });
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                msg: error.message || "Login failed",
            });
        }
    } else {
        res.status(400).send({
            success: false,
            msg: "Email and password are required",
        });
    }
}

export async function signup(req, res) {
    const userData = req.body;
    if (userData.email && userData.password) {
        try {
            const result = await signupUser(userData);
            if (result && result.insertedId) {
                signAuthToken({ userId: result.insertedId.toString(), email: userData.email }, (error, token) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            msg: "Error generating token",
                        });
                    }
                    res.status(201).send({
                        success: true,
                        msg: "signup done",
                        token,
                    });
                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: "Failed to create user",
                });
            }
        } catch (error) {
            res.status(400).send({
                success: false,
                msg: error.message || "signup not done",
            });
        }
    } else {
        res.status(400).send({
            success: false,
            msg: "Email and password are required",
        });
    }
}
