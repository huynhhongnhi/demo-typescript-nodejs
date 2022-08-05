import { NextFunction, Request, Response } from "express";

const { validationResult } = require('express-validator');

const validate = (schemas) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }

        const errors = result.array();
        return res.status(500).json({
            message: 'Validation error',
            errors: errors,
        });
    };
}

export default { validate }