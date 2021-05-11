var express = require('express');
const db = require(global.__MODULE_BASE__ + "database");
const response = require(global.__MODULE_BASE__ + "response")
const User = require(global.__MODEL_BASE__ + "User")
const httpStatus = require('http-status-codes');
const aurthor = require('./Aurthorize');
var router = express.Router();

/* GET users listing. */
router.use('*', aurthor.doAuthAction);
router.post('/create', async (req, res) => {
    const account = req.body.account || "";
    const username = req.body.username || "";
    const password = req.body.password || "";
    const passwordConfirm = req.body.passwordConfirm || "";
    const email = req.body.email || "";
    const adim = req.body.adim || "public";
    const department = req.body.department || "";
    try {
        const result = await new User().create(account, username, password, passwordConfirm,
            adim, email, department);
        return response.succ(res, result);
    } catch (err) {
        return response.fail(res, err);
    }
})

router.post('/active', async (req, res) => {
    const user_id = req.body.user_id || "";
    try {
        const result = await new User().active(user_id);
        return response.succ(res, result);
    } catch (err) {
        return response.fail(res, err);
    }
})

router.get('/data', async (req, res) => {
    const user_id = Number(req.query.id) || '';
    try {
        const result = await new User(req.body.token).getUserbyId(user_id);
        return response.succ(res, result);
    } catch (err) {
        return response.fail(res, err);
    }
})

router.put('/login', async (req, resp) => {
    const account = req.body.account;
    const pwd = req.body.password;
    try {
        const result = await new User().login(account, pwd);
        return response.succ(resp, result);
    } catch (err) {
        return response.fail(resp, err);
    }
});

module.exports = router;
