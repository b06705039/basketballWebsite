var express = require('express');
const response = require(global.__MODULE_BASE__ + "response")
const Team = require(global.__MODEL_BASE__ + "Team")
const aurthor = require('./Aurthorize');
const timeRouter = require('./times');

var router = express.Router();

router.use('*', aurthor.doAuthAction);

router.post('/create', async (req, resp) => {
    const token = req.body.token;
    const name = req.body.name || "";
    const department = req.body.department;
    try {
        const result = await new Team(token).create(name, department);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.post('/status', async (req, resp) => {
    const token = req.body.token;
    const team_id = req.body.id || "";
    const status = req.body.status || "";
    try {
        const result = await new Team(token).status(team_id, status);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.delete('/delete', async (req, resp) => {
    const token = req.body.token;
    const team_id = req.body.id || "";
    try {
        const result = await new Team(token).delete(team_id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.get('/data', async (req, resp) => {
    const token = req.body.token;
    const team_id = req.query.id || "";
    try {
        const result = await new Team(token).getInfoByID(team_id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.use('/time', timeRouter);

module.exports = router;