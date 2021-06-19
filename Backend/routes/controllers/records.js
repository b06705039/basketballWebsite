var express = require('express');
const db = require(global.__MODULE_BASE__ + "database");
const response = require(global.__MODULE_BASE__ + "response")
const Record  = require(global.__MODEL_BASE__ + "Record")
const httpStatus = require('http-status-codes');
const aurthor = require('./Aurthorize');
var router = express.Router();

router.use('*', aurthor.doAuthAction);

router.post('/createTeamRecord', async (req, resp)=>{
    console.log("in createTeamRecord controller")
    const token = req.body.token
    const match_id = req.body.match_id || "";
    const team_id = req.body.team_id || "";
    console.log("variable: ", match_id, team_id)

    try{
        const result = await new Record(token).createTeamRecord( match_id, team_id )
        return response.succ(resp, result)
    } catch (err) {
        return response.fail(resp, err)
    }
})



module.exports = router;
