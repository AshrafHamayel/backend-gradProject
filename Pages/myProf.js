
const express = require('express');
const db = require('../config/database');
const User = require('../models/user');
const login = require('../Pages/login');


const appl = express.Router();


appl.get('/myProf', (req, res) => {

   
    res.json(login.getemail()+" ");

});
module.exports = appl;