const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get("/", async function(req,res,next){
    let result
    try{
        result = await controller.authenticate("nope","and again nope");
    }catch(err){
        console.log(err);
    }
    return res.json(result);
})

module.exports = router;