const APIError = require('../utils/errors');

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof APIError) {
        return res.status(err.statusCode || 400).json({
            status: false,
            message: err.message,
            _from: "errorHandlerMiddleware"
        });
    }
    return res.status(500).json({
        status: false,
        message: "Check your API. Something went wrong",
    });
}

module.exports = errorHandlerMiddleware;