
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1

const appl=express.Router();
//appl.use(authenticate);///       2


appl.get('/login',(req,res)=>{
    //var email = "asrf@gmail.com";



 //req.session.user = email;
 //console.log(req.session.user)
 //res.send(result);

 res.json("fome login")

    });


module.exports=appl;


