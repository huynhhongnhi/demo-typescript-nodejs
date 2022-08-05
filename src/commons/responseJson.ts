import { Response } from "express";

const success = (code: number, data: any, res: Response) => {
    return res.status(code).json({
        success: true,
        message: "success",
        data: data
    })
}

const error = (code: number, message: string, error: object, res: Response) => {
    return res.status(code).json({
        success: false,
        message: message,
        error: error
    })
}

export default {
    success,
    error
}