
const express = require('express');
const db = require('../config/database');
const userInfo = require('../models/userInfo');
const userLiksAndFollow = require('../models/userLiksAndFollow');



const appl = express.Router();


//----------------------------Building--------------------------------------

appl.get('/usersBuilding', (req, res) => {


     var sectionBuilding='Building';
    userInfo.find({Section:sectionBuilding })
    .then(usersBuilding => {

      if (!usersBuilding) 
      {
        console.log('not found users Building');
        return  res.json({
            NT:'not found'
        })
    
      }
    else
    {
      
       return res.json(usersBuilding);

    }


});


});

//----------------water and electricity--------------------------------------

appl.get('/usersWaterAndElectricity', (req, res) => {

   
     var sectionBuilding='WaterAndElectricity';
    userInfo.find({Section:sectionBuilding })
    .then(usersWaterAndElectricity => {

      if (!usersWaterAndElectricity) 
      {
        console.log('not found users water and electricity');
        return  res.json({
            NT:'not found'
        })
    
      }
    else
    {
      
       return res.json(usersWaterAndElectricity);

    }


});


});





module.exports = appl;



