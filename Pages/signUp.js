
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1

const appl=express.Router();

//appl.use(authenticate);///     2

appl.get('/signUp',(req,res,err)=>{


    res.json("fome Sign up")

   //if (err)
   //res.json("pleas sigin")

    });


module.exports=appl;


