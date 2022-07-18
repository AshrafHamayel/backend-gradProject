
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1
const db = require('../config/database');
const User = require('../models/user');

const appl = express.Router();

 

appl.post('/login', (req, res) => {

    var email = req.query.email;
    User.find({email:email},(result))
    res.json(result.name)


});


module.exports = appl;