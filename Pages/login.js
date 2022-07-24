
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1
const db = require('../config/database');
const User = require('../models/user');

const appl = express.Router();
const  newUser = new User();
let E ='asd';
let  email1;
const getemail = () => {E};
appl.post('/login', (req, res) => {

   email1= req.query.email;
  let  pass  = req.query.password;

     //E='email1';
    console.log(email1 +" --")
   User.findOne({ email: email1 })
    .then(newUser => {

      if (!newUser) {
        console.log('not found');

       

    }
    else
    return res.json(newUser.name);
    console.log(newUser.name);


});

});



module.exports = {
  getemail
};
module.exports = appl;