const apiResponseErrorResource = function( req: any, res: any ){
    const response: { code?: number, message?: string, errors?: object } = {}
    if(req.errors){
        const errors = Object.keys(req.errors).map( objKey => {
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