import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.status || 500;
    err.message = err.message || 'Internal Server Error';

    //wrong MongoDB id
    if (err.name === 'CastError') {
        const message = `Recourse not Found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Duplicate error Key
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json Web Token is Invalid, try again`;
        err = new ErrorHandler(message, 400);
    }
    //Wrong Expired error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}
