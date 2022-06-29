
const express = require('express');
//const authenticate = require('authenticate'); /////  1
//appl.use(authenticate);///       2

const appl=express.Router();


appl.get('/login',(req,res)=>{

 res.json("Email  ashraf")

console.log("ashraf");


    });


module.exports=appl;


