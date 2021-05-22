var express = require('express');
const response = require(global.__MODULE_BASE__ + "response")
const Recorder = require(global.__MODEL_BASE__ + "Recorder")
const aurthor = require('./Aurthorize');


var router = express.Router();

router.use('*', aurthor.doAuthAction);

router.post('/create', async (req, resp) => {
    const token = req.body.token;
    const name = req.body.name || "";
    const department = req.body.department;
    try {
        const result = await new Recorder(token).create(name, department);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.post('/status', async (req, resp) => {
    const token = req.body.token;
    const recorder_id = req.body.id || "";
    const status = req.body.status || "";
    try {
        const result = await new Recorder(token).status(recorder_id, status);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.delete('/delete', async (req, resp) => {
    const token = req.body.token;
    const recorder_id = req.body.id || "";
    try {
        const result = await new Recorder(token).delete(recorder_id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.get('/data', async (req, resp) => {
    const token = req.body.token;
    const recorder_id = req.query.id || "";
    try {
        const result = await new Recorder(token).getInfoByID(recorder_id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.get('/getALL', async (req, resp) => {
    const token = req.body.token;
    try {
        const result = await new Recorder(token).getALL();
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.post('/update', async (req, resp) => {
    const token = req.body.token;
    const { name, department } = req.body;
    try {
        const result = await new Recorder(token).update(name, department);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});



module.exports = router;