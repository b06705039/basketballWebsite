var express = require('express');
const db = require(global.__MODULE_BASE__ + "database");
const response = require(global.__MODULE_BASE__ + "response")
const User  = require(global.__MODEL_BASE__ + "User")
const httpStatus = require('http-status-codes');
const aurthor = require('./Aurthorize');

router.post('post/create', async (req, res)=>{
    const title = req.body.title || "";
})