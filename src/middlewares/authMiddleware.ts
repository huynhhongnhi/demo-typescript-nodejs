import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || 'jsonwebtoken-secret';

interface RequestWithUserRole extends Request {
    user?: any,
}

const isAuth = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {

    const response: { code?: number, message?: string } = {};
    let code = 401;
    let access =  req.headers["x-access-token"] || req.headers["authorization"] || req.query.token || req.body.token

    try {
        if ( !access ) {
            code = 403;
            throw new Error('Unauthorized!!!');
        }

        access = access.replace('Bearer ','');
        const user = await jwt.verify( access, secret );
        req.user = user;
        next(); 
    } catch (error) {
        response.code             = code || 401
        response.message          = (error as Error).message || 'Unauthorized.'
        return res.status(response.code).json(response);
    }
}

export default { isAuth };