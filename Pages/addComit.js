const express = require('express');
const db = require('../config/database');
const comit = require('../models/comit');
const userInfo = require('../models/userInfo');
const appl = express.Router();




//////          Time   & Date      ////////////
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let mm =year + "-" + month + "-" + date;
/////////////////////////////////////////////////


appl.post('/newComit', (req, res,err) => {

    var idComit = req.query.UserId;
    var frindId = req.query.FrindId;
    var descriptionPost = req.query.description;
    var imageComit1 = req.query.imageComit;
    var Rating = req.query.rating;

    userInfo.findOne({ _id: idComit })
    .then(ownerComit => {
        if(!ownerComit){
            console.log('not found');
        }


        else{

            let newComit = new comit(
                {
                    name:ownerComit.name,
                    id: frindId,
                    idFriend:idComit,
                    imageuser: ownerComit.image,
                    imagecomit:imageComit1,
                    date :mm,
                    description :descriptionPost,
                    rating:Rating,
                  
                });

                newComit.save((err) => {
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



appl.get('/youComits', (req, res) => {
    var frindId= req.query.FrindId;
     console.log(frindId +" --")
 
 
     if (frindId.length> 10){
        
        comit.find({id: frindId })
     .then(userComits => {
 
       if (!userComits) 
       {
         console.log('not found Comits');
 
       }
     else
     {
        
        return res.json(userComits);

     }
 
 
 });
 }
 
 else{
   console.log('Id is Null ---------');
 
 }
 
    
 
 });



 appl.get('/myComits', (req, res) => {
    var frindId= req.query.FrindId;
     console.log(frindId +" --")
 
 
     if (frindId.length> 10){
        
        comit.find({idFriend: frindId })
     .then(userComits => {
 
       if (!userComits) 
       {
         console.log('not found Comits');
 
       }
     else
     {
        
        return res.json(userComits);

     }
 
 
 });
 }
 
 else{
   console.log('Id is Null ---------');
 
 }
 
    
 
 });

 


 
appl.post('/AddReport',(req, res) => {

  
  var comitId= req.query.ComitId;
  var CurrentUser= req.query.currentUser;
 
  comit.findOne({ _id:comitId,reports: CurrentUser})
.then(UserPost => {

  if (!UserPost) 
  {
    comit.findOneAndUpdate({ _id:comitId },{ $push: { reports: CurrentUser }}).then(Comiitt => {

       if(Comiitt.reports.length>5){
        comit.findOneAndDelete({ _id:comitId }).then(Comiitt =>
         {
          return  res.json({NT:'done1' })
        })

       }
       else{
        return  res.json({NT:'done2' })
       }

    })
    

  }
     else
     {

      return  res.json({NT:'done3' })

     }

})

  



     

       



})




module.exports = appl;