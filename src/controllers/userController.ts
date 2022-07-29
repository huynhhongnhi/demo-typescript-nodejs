import { NextFunction, Request, Response } from "express";
import authHelper from "../helpers/authHelper";
import userService from "../services/userService";

const login = async ( req: Request, res: Response ) => {

    let code = 500, response: any = {}

    try {
        const { email, password } = req.body
        const user = await userService.getFindUser({ email })
       
        if( !user ) {
            code = 409
            throw new Error("Email or password incorrect!")
        }

        const isMatch = await user.comparePassword(password)
        if( !isMatch ){
            code = 401 
            throw new Error("Email or password incorrect!")
        }

        const strJWT = await authHelper.hashTokenAccess(user.toResources())

        response.code             = 200
        response.data             = { "token": strJWT }
        response.message          = "User login success"
        response.internal_message = `Login success with email là ${email}`

        return res.status(response.code).json(response)

    } catch (error: any) {
        let err                       = { error: 'error', message: error.message }
            response.code             = code || 500
            response.message          = error.message
            response.internal_message = error.message
            response.errors           = [ err ]

        return res.status(response.code).json(response)
    }
}

export default {
    login
};