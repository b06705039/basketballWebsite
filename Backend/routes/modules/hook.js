const asyncHooks = require('async_hooks');


class AsyncHook{
    constructor(){
        this.store = new Map();
        asyncHooks.createHook({
            init: (asyncId, _, triggerAsyncId) => {
                if (this.store.has(triggerAsyncId)) {
                    this.store.set(asyncId, this.store.get(triggerAsyncId));
                }
            },
            destroy: (asyncId) => {
                if (this.store.has(asyncId)) {
                    this.store.delete(asyncId);
                }
            }
        }).enable();
    }
    createRequestContext(uuid, data){
        const requestInfo = { uuid, data };
        this.store.set(asyncHooks.executionAsyncId(), requestInfo);
        return;
    }
    getRequestContext(){
        return this.store.get(asyncHooks.executionAsyncId());
    }
}


class Singleton {
    constructor() {
        throw Error('This is singletion, please use getInstance method to get the instance');
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new AsyncHook();
        }
        return Singleton.instance;
    }
}


module.exports = Singleton;