const express = require('express');
const db = require('../config/database');
const complaint = require('../models/complaint');
const userInfo = require('../models/userInfo');
const appl = express.Router();




//////          Time   & Date      ////////////
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let mm =year + "-" + month + "-" + date;
/////////////////////////////////////////////////


appl.post('/newcomplaint', (req, res,err) => {

    var idComplaint = req.query.UserId;
    var descriptionPost = req.query.description;
    var imageComplaint1 = req.query.imageComplaint;


    userInfo.findOne({ _id: idComplaint })
    .then(ownerComplaint => {
        if(!ownerComplaint){
            console.log('not found');
        }


        else{

            let newComplaint = new complaint(
                {
                    name:ownerComplaint.name,
                    id:idComplaint,
                    imageuser: ownerComplaint.image,
                    imagecomplaint:imageComplaint1,
                    date :mm,
                    description :descriptionPost,
                 
                  
                });

                newComplaint.save((err) => {
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