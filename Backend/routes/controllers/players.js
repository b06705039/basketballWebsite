var express = require('express');
const response = require(global.__MODULE_BASE__ + "response")
const Player = require(global.__MODEL_BASE__ + "Player")
const aurthor = require('./Aurthorize');


var router = express.Router();

router.use('*', aurthor.doAuthAction);

router.post('/create', async (req, resp) => {
    const token = req.body.token;
    const {number, name, team_id, grade, student_id} = req.body;
    const photo_url = req.body.photo_url || "";

    try {
        const result = await new Player(token).create(number, name, team_id, grade, student_id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.delete('/delete', async (req, resp) => {
    const token = req.body.token;
    const player_id = req.body.player_id || "";
    try {
        const result = await new Player(token).delete(player_id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.get('/data', async (req, resp) => {
    const token = req.body.token;
    const player_id = req.query.player_id || "";
    try {
        const result = await new Player(token).getInfoByID(player_id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.get('/getAllPlayerByTeamId', async (req, resp) => {
    const token = req.body.token;
    const team_id = req.query.team_id;
    try {
        const result = await new Player(token).getAllbyTeam(team_id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.post('/update', async (req, resp) => {
    const token = req.body.token;
    const {player_id, number, name, team_id, grade, student_id} = req.body;
    const photo_url = req.body.photo_url || "";
    try {
        const result = await new Player(token).update({player_id, number, name, photo_url, team_id, grade, student_id});
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

module.exports = router;