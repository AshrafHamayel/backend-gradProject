
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1



var mongoose=require('mongoose'); // Database sentences 1






const appl=express.Router();

//appl.use(authenticate);///     2

appl.get('/signUp',(req,res,err)=>
{


    res.json("fome Sign up !")


mongoose.connect('mongodb://localhost:27017/GraduationProject').then(_ => {
    console.log('conceted');
})
.catch(e =>{
    console.log('error',e);

})


   //if (err)
   //res.json("pleas sigin")

    });


module.exports=appl;


