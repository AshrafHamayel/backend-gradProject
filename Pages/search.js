const express = require('express');
const db = require('../config/database');
const userInfo = require('../models/userInfo');
const userLiksAndFollow = require('../models/userLiksAndFollow');

const appl = express.Router();



appl.get('/Search', (req, res)  => {

 var CurrentUser= req.query.currentUser;
   
   userInfo.find({_id:CurrentUser })
   .then(userCurren => {
     if(!userCurren)
     {
      console.log('not found');
          return  res.json({
              NT:'not found'
          })
     }

     else
     {



     }
  
  
    
  });
  
  
  });
  

module.exports = appl;
