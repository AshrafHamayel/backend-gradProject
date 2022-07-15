
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1
const db = require('../config/database');
const User =require('../models/user');



let newUser=new User({
name :'Ashraf',
email:'asrf@gmail.com',
password:'1234',
image:'asd.png'

});


const appl=express.Router();

//appl.use(authenticate);///     2

appl.get('/signUp',(req,res,err)=>
{


    res.json("fome Sign up !")




    newUser.save( (err)=> {
        if(!err){
            console.log('done !');
        }
        else {
            console.log('error add !');
        
        
        }
        
        })





   //if (err)
   //res.json("pleas sigin")

    });


module.exports=appl;


