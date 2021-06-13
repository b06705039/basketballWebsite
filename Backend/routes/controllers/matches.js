var express = require("express");
const response = require(global.__MODULE_BASE__ + "response");
const Match = require(global.__MODEL_BASE__ + "Match");
const aurthor = require("./Aurthorize");

var router = express.Router();

router.use("*", aurthor.doAuthAction);

router.post('/create', async(req, resp) => {
    const token = req.body.token;
    const home_id = req.body.home_id || "";
    const away_id = req.body.away_id || "";
    const stage = req.body.stage || "";
    const stage_session = req.body.stage_session || "";
    try {
        const result = await new Match(token).create(home_id, away_id, stage, stage_session);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

router.post('/createInterMatch', async(req, resp) => {
    const token = req.body.token;
    console.log(token)
    try {
        const result = await new Match(token).createInterMatch(req.body.home_id, req.body.away_id, req.body.stage)
        return response.succ(resp, result);
    } catch (err){
        return response.fail(resp, err)
    }
});

router.delete('/delete', async (req, resp) => {
    const token = req.body.token;
    const match_id = req.body.id || "";
    try {
        const result = await new Match(token).delete(match_id);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
})

router.get("/data", async (req, resp) => {
  const token = req.body.token;
  const match_id = req.query.id || "";
  try {
    const result = await new Match(token).getInfoByID(match_id);
    return response.succ(resp, result);
  } catch (err) {s
    return response.fail(resp, err);
  }
});

router.get("/getAll", async (req, resp) => {
  const token = req.body.token;
  const match_id = req.query.id || "";
  try {
    const result = await new Match(token).getALL();
    return response.succ(resp, result);
  } catch (err) {
    return response.fail(resp, err);
  }
});

router.post("/update", async (req, resp) => {
  const token = req.body.token;
  const { match_id, startDate, field, recorder_id } = req.body;
  try {
    const result = await new Match(token).update(
      match_id,
      startDate,
      field,
      recorder_id
    );
    return response.succ(resp, result);
  } catch (err) {
    return response.fail(resp, err);
  }
});

router.delete("/deleteSession", async(req, resp) => {
  const token = req.body.token;
  const stage = req.query.stage;
  try{
    const result = await new Match(token).deleteSession( stage );
    return response.succ(resp, result);
  } catch (err) {
    return response.fail(resp, err);
  }
});


router.get("/checkIfStage", async(req, resp) => {
  const token = req.body.token;
  const stage = req.query.stage;

  console.log("in matches, checkIfStage: ", token, stage)
  try{
    const result = await new Match(token).checkIfStage( stage );
    console.log("in controller, matches, result: ", result)
    return response.succ(resp, result);
  } catch (err){
    return response.fail(resp, err);
  }
});




module.exports = router;
