const HttpException = require('./httpException');

module.exports = (functionHandler) => {
    
    return (req, res, next) => {
        try {
            const resp = functionHandler(req, res, next)
            res.send(resp)
        } catch (err) {
            if (err instanceof HttpException) {
                res.status(err.statusCode).send(new ErrorResponse(err.message))
            } else {
                res.status(500).send('Internal Server Error')
            }
        }
    }
}

class ErrorResponse {
    constructor (error, message, context) {
        this.Error = error;
        this.Message = message;
        this.Context = context;
    }
    
}