const { request } = require("express");
var express = require("express");
const db = require(global.__MODULE_BASE__ + "database");
const response = require(global.__MODULE_BASE__ + "response");
const User = require(global.__MODEL_BASE__ + "User");
const httpStatus = require("http-status-codes");
const aurthor = require("./Aurthorize");
var router = express.Router();

/* GET users listing. */
router.use("*", aurthor.doAuthAction);

router.post("/create", async (req, res) => {
  const account = req.body.account || "";
  const username = req.body.username || "";
  const password = req.body.password || "";
  const passwordConfirm = req.body.passwordConfirm || "";
  const email = req.body.email || "";
  const adim = req.body.adim;
  const department = req.body.department || "";
  try {
    const result = await new User().create(
      account,
      username,
      password,
      passwordConfirm,
      adim,
      email,
      department
    );
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
});

router.post("/active", async (req, res) => {
  const user_id = req.body.id || "";
  try {
    const result = await new User(req.body.token).active(user_id);
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
});

router.delete("/delete", async (req, res) => {
  const user_id = req.body.id || "";
  try {
    const result = await new User(req.body.token).delete(user_id);
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
});

router.get("/data", async (req, res) => {
  const user_id = Number(req.query.id) || "";
  try {
    const result = await new User(req.body.token).getUserbyId(user_id);
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
});

router.get("/getALL", async (req, res) => {
  try {
    const result = await new User(req.body.token).getALL();
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
});

router.put("/login", async (req, res) => {
  const account = req.body.account;
  const pwd = req.body.password;
  try {
    const result = await new User().login(account, pwd);
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
});

router.put("/remind", async (req, res) => {
  const email = req.body.email;
  try {
    const result = await new User().remindInfo(email);
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
});

router.post("/update", async (req, res) => {
  const { account, username, email, department } = req.body;
  try {
    const result = await new User(req.body.token).update(
      account,
      username,
      email,
      department
    );
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
});

router.get("/register", async (_, res) => {
  try {
    const result = await new User().getRegister();
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
});

router.get("/checkToken", async(req, res) => {
  try {
    const result = await new User(req.body.token);
    return response.succ(res, result);
  } catch (err) {
    return response.fail(res, err);
  }
})

module.exports = router;
