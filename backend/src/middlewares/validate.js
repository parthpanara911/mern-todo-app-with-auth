import Joi from "joi";
import AppError from "../utils/AppError.js";

const createTodoSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
});

const updateTodoSchema = Joi.object({
    title: Joi.string().min(1).max(100).optional(),
    description: Joi.string().max(500).optional(),
    completed: Joi.boolean().optional(),
}).min(1);

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(50).optional(),
});

export const validateCreateTodo = (req, res, next) => {
    const { error, value } = createTodoSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: true,
    });
    if (error) {
        throw new AppError(error.details[0].message, 400);
    }
    req.body = value;
    next();
};

export const validateUpdateTodo = (req, res, next) => {
    const { error, value } = updateTodoSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: true,
    });
    if (error) {
        throw new AppError(error.details[0].message, 400);
    }
    req.body = value;
    next();
};

export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    });
    if (error) {
        throw new AppError(error.details[0].message, 400);
    }
    next();
};
