var express = require('express');
const response = require(global.__MODULE_BASE__ + "response")
const Time = require(global.__MODEL_BASE__ + "Time")
const aurthor = require('./Aurthorize');
var router = express.Router();
router.use('*', aurthor.doAuthAction);

router.post('/update', async (req, resp) => {
    const token = req.body.token;
    const { timeString } = req.body;
    try {
        const result = await new Time(token).update(timeString);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.get('/data', async (req, resp) => {
    const token = req.body.token;
    try {
        const result = await new Time(token).getTime();
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
