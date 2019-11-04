module.exports = class HttpException {
    message;
    statusCode;
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode
    }
}