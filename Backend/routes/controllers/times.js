var express = require('express');
const db = require(global.__MODULE_BASE__ + "database");
const response = require(global.__MODULE_BASE__ + "response")
const Time = require(global.__MODEL_BASE__ + "Time")
const httpStatus = require('http-status-codes');
const aurthor = require('./Aurthorize');
var router = express.Router();
router.use('*', aurthor.doAuthAction);

router.post('/update', async (req, resp) => {
    const token = req.body.token;
    const { id, timeString } = req.body;
    try {
        const result = await new Time(token).update(id, timeString);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.delete('/delete', async (req, resp) => {
    const token = req.body.token;
    const id = req.body.id || "";
    try {
        const result = await new Time(token).delete(id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.get('/getALL', async (req, resp) => {
    const token = req.body.token;
    try {
        const result = await new Time(token).getALL();
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

module.exports = router;
