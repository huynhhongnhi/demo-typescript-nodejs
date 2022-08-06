import { Request, Response } from "express";
import authHelper from "../helpers/authHelper";
import { userService } from "../services/user.service";

interface RequestWithUserRole extends Request {
    user?: any,
}

class UserController {

    public async login( req: Request, res: Response ) {

        let code = 500;
        const response: { code?: number, data?: { token?: string }, message?: string } = {}
    
        try {
            const { email, password } = req.body
            const user = await userService.getFindUser({ email })
            if ( !user ) {
                code = 409
                throw new Error("Email or password incorrect!")
            }
    
            const isMatch = await user.comparePassword(password)
            if ( !isMatch ) {
                code = 401 
                throw new Error("Email or password incorrect!")
            }
    
            const strJWT = await authHelper.hashTokenAccess(user.toResources())
    
            response.code             = 200
            response.data             = { "token": strJWT }
            response.message          = "User login success"
            return res.status(response.code).json(response)
        } catch (error) {
            response.code             = code || 500
            response.message          = (error as Error).message
            return res.status(response.code).json(response)
        }
    }

    public async register( req: Request, res: Response) {

        let code = 500;
        let response: { code?: number, data?: object, message?: string } = {};
    
        try {
            
            const { email, password, username } = req.body;
            const isExist = await userService.getFindUser({ email })
            if ( isExist ) {
                code = 409
                throw new Error("Email exist!")
            }
    
            const user = await userService.createUser({ username, email, password });
            response.code             = 200;
            response.message          = "success";
            response.data             = user.toResources();
            return res.status(response.code).json(response);
        } catch (error) {
            response.code             = code || 500
            response.message          = (error as Error).message
            return res.status(response.code).json(response)
        }
    }
    
    public async  getUser( req: RequestWithUserRole, res: Response ) {
        const response: { code?: number, data?: object, message?: string } = {};
        const code: number = 500;
        try {
            const { user } = req;
            response.code             = 200;
            response.data             = user;
            response.message          = "success";
            return res.status(response.code).json(response);
    
        } catch (error) {
            let err                   = { error: 'error', message: (error as Error).message };
            response.code             = code || 500
            response.message          = (error as Error).message
            return res.status(response.code).json(response)
        }
    }

}

const userController = new UserController();
export { userController };