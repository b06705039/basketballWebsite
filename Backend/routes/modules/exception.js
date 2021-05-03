const httpStatus  = require('http-status-codes');

class WebBaseError extends Error {
    constructor(statusCode, code, message, data) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.data = data;
    }
}

class SqlError extends WebBaseError {
    constructor(code, message) {
        super(httpStatus.BAD_REQUEST, code, message); // 400
    }
}

class BadRequestError extends WebBaseError {
    constructor(code, message, data) {
        super(httpStatus.BAD_REQUEST, code, message, data); // 400
    }
}

class AuthError extends WebBaseError {
    constructor(code, message) {
        super(httpStatus.UNAUTHORIZED, code, message);  // 401
    }
}

class PermissionError extends WebBaseError {
    constructor(code, message) {
        super(httpStatus.UNAUTHORIZED, code, message); // 401
    }
}

class ForbiddenError extends WebBaseError {
    constructor(code, message) {
        super(httpStatus.FORBIDDEN, code, message); // 403
    }
}

class ServerError extends WebBaseError {
    constructor(code, message) {
        super(httpStatus.INTERNAL_SERVER_ERROR, code, message); // 500
    }
}

module.exports = {
    isWebError: function(err) {
        if (err instanceof WebBaseError) {
            return true;
        }
        return false;
    },

    SqlError: function(code, message) {
        return new SqlError(code, message);
    },

    BadRequestError: function(code, message, data) {
        return new BadRequestError(code, message, data);
    },

    AuthError: function(code, message) {
        return new AuthError(code, message);
    },

    PermissionError: function(code, message) {
        return new PermissionError(code, message);
    },

    ForbiddenError: function(code, message) {
        return new ForbiddenError(code, message);
    },

    ServerError: function(code, message) {
        return new ServerError(code, message);
    }
};
