import AppError from "../utils/AppError.js";

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    error.statusCode = err.statusCode || 500;

    // MongoDB invalid ObjectId
    if (err.name === "CastError") {
        error = new AppError("Invalid ID Format", 400);
    }

    // MongoDB duplicate key
    if (err.code === 11000) {
        error = new AppError("Duplicate field value", 400);
    }

    if (err.name === "JsonWebTokenError") {
        error = new AppError("Invalid token", 401);
    }

    if (err.name === "TokenExpiredError") {
        error = new AppError("Token expired", 401);
    }

    res.status(error.statusCode).json({
        success: false,
        status: error.status,
        message: error.message || "Server Error"
    });
};

export default errorHandler;