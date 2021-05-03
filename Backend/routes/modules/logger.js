'use strict';
const asyncHook = require('./hook');

class Logger {
    constructor(){
        this.tags = [];
        if(asyncHook.getInstance().getRequestContext()){
            const reqContext =  asyncHook.getInstance().getRequestContext().data;
            this.tags = [reqContext.uuid, reqContext.ip, reqContext.method, reqContext.url];
        }
    }
    _log(level, tag, message) {
        if (typeof tag !== 'string') {
            tag = '';
        }
        console.log(`[${level}]${this.tags.join('')}${tag} ${message}`);
    }
    info(tag, message) {
        this._log('INFO', tag, message);
    }
    error(tag, message) {
        this._log('ERROR', tag, message);
    }
    warning(tag, message) {
        this._log('WARNING', tag, message);
    }
    appendTag(tag) {
        if (typeof tag === 'string') {
            this.tags.push(tag);
        }
        return this;
    }
}

module.exports = Logger;