import { Request, Response } from "express";
import authHelper from "../helpers/authHelper";
import { userService } from "../services/user.service";
import responseJson from "../commons/responseJson";

interface RequestWithUserRole extends Request {
    user?: any,
}

class UserController {

    public async login( req: Request, res: Response ) {

        let code = 500;
    
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
            return responseJson.success(200, { "token": strJWT }, res);
        } catch (error) {
            return responseJson.error(code || 500, (error as Error).message, (error as Error), res);
        }
    }

    public async register( req: Request, res: Response) {

        let code = 500;
    
        try {
            
            const { email, password, username } = req.body;
            const isExist = await userService.getFindUser({ email })
            if ( isExist ) {
                code = 409
                throw new Error("Email exist!")
            }
    
            const user = await userService.createUser({ username, email, password });
            return responseJson.success(200, user.toResources(), res);
        } catch (error) {
            return responseJson.error(code || 500, (error as Error).message, (error as Error), res);
        }
    }
    
    public async  getUser( req: RequestWithUserRole, res: Response ) 
    {

        const code: number = 500;
        
        try {
            const { user } = req;
            return responseJson.success(200, user, res);
        } catch (error) {
            return responseJson.error(code || 500, (error as Error).message, (error as Error), res);
        }
    }

}

const userController = new UserController();
export { userController };