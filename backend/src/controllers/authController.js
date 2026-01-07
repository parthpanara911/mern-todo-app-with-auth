import { loginUser, signAuthToken, signupUser } from "../services/authService.js";

export async function login(req, res) {
    const userData = req.body;
    if (userData.email && userData.password) {
        const result = await loginUser(userData);
        if (result) {
            signAuthToken(userData, (error, token) => {
                res.send({
                    success: true,
                    msg: "login done",
                    token,
                });
            });
        } else {
            res.send({
                success: false,
                msg: "User not found",
            });
        }
    } else {
        res.send({
            success: false,
            msg: "login not done",
        });
    }
}

export async function signup(req, res) {
    const userData = req.body;
    if (userData.email && userData.password) {
        const result = await signupUser(userData);
        if (result) {
            signAuthToken(userData, (error, token) => {
                res.send({
                    success: true,
                    msg: "signup done",
                    token,
                });
            });
        }
    } else {
        res.send({
            success: false,
            msg: "signup not done",
        });
    }
}


