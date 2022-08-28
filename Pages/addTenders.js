const express = require('express');
const db = require('../config/database');
const tenders = require('../models/tenders');
const userInfo = require('../models/userInfo');
const appl = express.Router();




//////          Time   & Date      ////////////
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let mm =year + "-" + month + "-" + date;
/////////////////////////////////////////////////


appl.post('/newtenders', (req, res,err) => {

    var idTenders = req.query.UserId;
    var descriptionTenders = req.query.description;
    var imageTenders1 = req.query.imageComplaint;
    var SectionTenders=req.query.sectionTenders;

    userInfo.findOne({ _id: idTenders })
    .then(ownerTenders => {
        if(!ownerTenders){
            console.log('not found');
        }


        else{

            let newTenders = new tenders(
                {
                    name:ownerTenders.name,
                    id:idTenders,
                    imageuser: ownerTenders.image,
                    imageTenders:imageTenders1,
                    date :mm,
                    Section:SectionTenders,
                    description :descriptionTenders,
                 
                  
                });

                newTenders.save((err) => {
                    if (!err) {
                          
              res.json({
                NT:'done',})
         
                    }

                    else{
                        res.json({
                            NT:'error',
                                })
                        console.log("Error --- :"+err);

                    }
                
                });


        }


    });
 
        


});



module.exports = appl;