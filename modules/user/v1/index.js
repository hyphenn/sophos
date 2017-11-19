const express = require('express');
const router = express.Router();
const Controller = require("./controller");
router.get("/", async function(req,res,next){
    return res.send("test v1");
})

module.exports = router;