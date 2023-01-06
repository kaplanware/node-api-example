class Response {
    constructor(data = null, message = null) {
        this.data = data;
        this.message = message;
    }

    success(res){
        return res.status(200).json({
            status: true,
            data: this.data,
            message: this.message ?? "Success"
        });
    }

    created(res){
        return res.status(201).json({
            status: true,
            data: this.data,
            message: this.message ?? "Created"
        });
    }

    error400(res){
        return res.status(400).json({
            status: false,
            data: this.data,
            message: this.message ?? "Bad Request"
        });
    }

    error401(res){
        return res.status(401).json({
            status: false,
            data: this.data,
            message: this.message ?? "Unauthorized"
        });
    }

    error404(res){
        return res.status(404).json({
            status: false,
            data: this.data,
            message: this.message ?? "Not Found"
        });
    }

    error429(res){  // Too Many Requests as DDOS protection
        return res.status(429).json({
            status: false,
            data: this.data,
            message: this.message ?? "Too Many Requests"
        });
    }

    error500(res){
        return res.status(500).json({
            status: false,
            data: this.data,
            message: this.message ?? "Check your API. Something went wrong"
        });
    }

    error503(res){
        return res.status(503).json({
            status: false,
            data: this.data,
            message: this.message ?? "Service Unavailable"
        });
    }

    custom(res, statusCode){
        return res.status(statusCode).json({
            status: statusCode,
            data: this.data,
            message: this.message
        });
    }
}

module.exports = Response;