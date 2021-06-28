var express = require('express');
const db = require(global.__MODULE_BASE__ + "database");
const response = require(global.__MODULE_BASE__ + "response")
const Post  = require(global.__MODEL_BASE__ + "Post")
const httpStatus = require('http-status-codes');
const aurthor = require('./Aurthorize');
var router = express.Router();

router.use('*', aurthor.doAuthAction);

router.post('/create', async (req, resp)=>{
    console.log("req: ", req.body)
    const token = req.body.token
    const type = req.body.type || "";
    const title_category = req.body.title_category || "";
    const title_content = req.body.title_content || "";
    const content = req.body.content || "" ;
    console.log("variable: ", type, title_category, title_content, content)

    try{
        const result = await new Post(token).create(type, title_category, title_content, content)
        return response.succ(resp, result)
    } catch (err) {
        return response.fail(resp, err)
    }
})

router.get("/getType", async(req, res) => {
    const type = req.query.type || ""
    const token = req.body.token
    try{
        const result = await new Post(token).getType(type)
        console.log("in router post: ", result)
        return response.succ(res, result)
    } catch (err) {
        return response.fail(res, err)
    }
})

router.delete("/deletePost", async(req, res) => {
    const token = req.body.token;
    const post_id = req.body.post_id;
    try{
        const result = await new Post(token).deletePost( post_id )
        return response.succ(res, result)
    } catch(err) {
        return response.fail(res, err)
    }
})


module.exports = router;
