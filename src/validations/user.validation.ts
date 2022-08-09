import { Validator } from "node-input-validator";
import errorHelper from "../helpers/errorHelper";
import { NextFunction, Request, Response } from "express";

interface RequestWithUserRole extends Request {
    errors?: any,
}

const LOGIN = async function( req: RequestWithUserRole, res: Response, next: NextFunction ) {
    
    const validate = new Validator(req.body, {
        email   : "required|email|minLength:3|maxLength:500",
        password: "required|string|minLength:1|maxLength:1000",
    },{
        'title.required'     : ":attribute is required"
    });
     
    const matched = await validate.check()
    if ( !matched ) {
        req.errors = validate.errors
        return errorHelper.apiResponseErrorResource( req, res )
    }
    next()
}

const REGISTER = async function( req, res, next ) {
    const validate = new Validator(req.body, {
        username: "required|string|minLength:1|maxLength:10000",
        email   : "required|email|minLength:3|maxLength:500",
        password: "required|string|minLength:1|maxLength:1000",
    },{
        'title.required'     : ":attribute is required"
    });
        
    const matched = await validate.check()
    if ( !matched ) {
        req.errors = validate.errors
        return errorHelper.apiResponseErrorResource( req, res )
    }
    next()
}

export default { LOGIN, REGISTER }