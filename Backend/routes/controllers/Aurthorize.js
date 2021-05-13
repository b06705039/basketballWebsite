const _ = require('underscore');
const jwt = require('jsonwebtoken');
const config = require(global.__MODULE_BASE__ + 'config');
const Logger = require(global.__MODULE_BASE__ + 'logger');
const exception = require(global.__MODULE_BASE__ + 'exception');
const response = require(global.__MODULE_BASE__ + 'response');
const tool = require(global.__MODULE_BASE__ + 'tool');

const whiteList = [
    { url: '/users/login', method: 'PUT' },
    { url: '/users/create', method: 'POST' }
];
function doAuthAction(req, resp, next) {
    const logger = new Logger();
    const TAG = '[DoAuthAction]';

    const url = req.baseUrl;
    let matches = _.where(whiteList, { url: url, method: req.method });
    if (matches.length > 0 || req.method === 'OPTIONS') {
        next();
        return;
    }

    let token = req.get('Authorization');
    try {
        req.body.token = jwt.verify(token, config.SECRET_KEY);
        const expTime = req.body.token.exp;
        const nowTime = tool.getUnixTimestamp(Date.now());
        if (nowTime > expTime) {
            logger.error(TAG, `This token has been expired. exp:${expTime}, now:${nowTime}`);
            return response.fail(resp, exception.PermissionError('INVALID_TOKEN', 'invalid token'));
        } else if (req.body.token.active === 0) {
            logger.error(TAG, `This token is not actived yet, please contact adimisiter.`);
            return response.fail(resp, exception.PermissionError('INVALID_TOKEN', 'invalid token'));
        }
        next();
    } catch (err) {
        logger.error(TAG, `Unexpected exception occurred because ${err}.`);
        return response.fail(resp, exception.PermissionError('INVALID_TOKEN', 'invalid token'));
    }
}

module.exports.doAuthAction = doAuthAction;
