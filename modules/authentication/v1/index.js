const express = require('express');
const router = express.Router();

router.get("/",function(req,res,next){
    res.send("wunderbar v1");
})

module.exports = router;