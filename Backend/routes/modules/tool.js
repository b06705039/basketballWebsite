const logger = require(global.__MODULE_BASE__ + 'logger');
const _ = require('underscore');
const config = require(global.__MODULE_BASE__ + 'config');

function isVaildDepartment(department) {
    if (config.department.find(x => (x === department)) !== undefined) {
        return true;
    }
    return false;
}

function isNull() {
    if (!arguments || arguments.length == 0) {
        return true;
    }

    for (let i = 0; i < arguments.length; i++) {
        if (_.isNull(arguments[i]) || _.isUndefined(arguments[i]) || arguments[i].length == 0 || (_.isObject(arguments[i]) && _.isEmpty(arguments[i]))) {
            return true;
        }
    }
    return false;
}

function jsonNull(jsonObject) {
    for (let key in jsonObject) {
        if (typeof jsonObject[key] == 'undefined') {
            new logger().error(key + ' ' + jsonObject[key]);
            return true;
        }
    }
    return false;
}


const getUnixTimestamp = (timestamp) => {
    return (timestamp.toString().length > 10) ? Math.floor(timestamp / 1000) : timestamp;
};

function getIp(req) {
    let ip = '';
    if (!req) {
        return ip;
    }

    if (req.headers['Cdn-Src-Ip']) {
        ip = req.headers['Cdn-Src-Ip'];
    } else if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(',')[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }

    if (typeof ip !== 'string') {
        logger.warning('[GetIp]', `Invalid IP Address ${ip}`);
        ip = '';
    }

    return ip.trim();
}

function toJSONSafeString(val) {
    if (typeof val !== 'string') {
        return val;
    }

    return val.replace(/[\t\n\r]/g, (match) => {
        switch (match) {
            case '\t':
                return '\\t';
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            default:
                return match;
        }
    });
}

function isValidAccount(account) {
    return new RegExp(config.ACCOUNT_FORMAT).test(account);
}

function isValidPwd(pwd) {
    return new RegExp(config.PWD_FORMAT).test(pwd);
}

function isValidMail(mail) {
    return new RegExp(config.MAIL_FORMAT).test(mail);
}

function isValidUserName(userName) {
    return new RegExp(config.USERNAME_FORMAT).test(userName);
}

function countPage(totalCount, pageSize) {
    if (isNull(totalCount, pageSize) || !_.isNumber(totalCount, pageSize)) {
        throw Error;
    }
    return Math.ceil(totalCount / pageSize);
}

function isNumber() {
    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] != 'number') {
            // logger.error(arguments[i] + ' is not number');
            return false;
        }
    }
    return true;
}

function isInteger() {
    for (let i = 0; i < arguments.length; i++) {
        if (!isNumber(arguments[i]) || arguments[i] % 1 != 0) {
            //logger.error(arguments[i] + ' is not integer');
            return false;
        }
    }
    return true;
}


function isPositiveInteger() {
    for (let i = 0; i < arguments.length; i++) {
        if (!isInteger(arguments[i]) || arguments[i] < 0) {
            return false;
        }
    }
    return true;
}

function isDate(target) {
    try {
        Date(target);
        return true;
    } catch {
        return false;
    }
}

module.exports.isNull = isNull;
module.exports.jsonNull = jsonNull;
module.exports.getUnixTimestamp = getUnixTimestamp;
module.exports.getIp = getIp;
module.exports.toJSONSafeString = toJSONSafeString;
module.exports.isValidAccount = isValidAccount;
module.exports.isValidPwd = isValidPwd;
module.exports.isValidMail = isValidMail;
module.exports.isValidUserName = isValidUserName;
module.exports.countPage = countPage;
module.exports.isNumber = isNumber;
module.exports.isInteger = isInteger;
module.exports.isPositiveInteger = isPositiveInteger;
module.exports.isDate = isDate;
module.exports.isVaildDepartment = isVaildDepartment;