
const express = require('express');
const db = require('../config/database');
const User = require('../models/user');
const login = require('../Pages/login');
const posts = require('../models/posts');
const userInfo = require('../models/userInfo');

const appl = express.Router();


appl.get('/myProf', (req, res) => {
    emailP= req.query.email;
    console.log(emailP +" --")

    userInfo.findOne({ email: emailP })
    .then(UserInfor => {

      if (!UserInfor) 
      {
        console.log('not found');


    }
    else
    return res.json(UserInfor);


});


   

});
module.exports = appl;