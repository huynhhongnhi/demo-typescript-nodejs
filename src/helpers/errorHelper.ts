
import { Request, Response } from 'express';

interface RequestWithUserRole extends Request {
    errors?: any,
}

const apiResponseErrorResource = function( req: RequestWithUserRole, res: Response) {

    const response: { code?: number, message?: string, errors?: object } = {}
    
    if (req.errors) {
        const errors = Object.keys(req.errors as Request).map( objKey => {
            const error = req.errors[objKey];
            return { error: objKey, ...error }
        })
        response.code             = 422;
        response.message          = "system error";
        response.errors           = errors;
        return res.status(response.code).json(response)
    }
}

export default { apiResponseErrorResource };