import Joi from "joi";

const todoSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
    completed: Joi.boolean().optional(),
});

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(50).optional(),
});

export const validateTodo = (req, res, next) => {
    const { error } = todoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }
    next();
};

export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }
    next();
};
