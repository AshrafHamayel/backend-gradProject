
const express = require('express');
const db = require('../config/database');
const posts = require('../models/posts');
const userInfo = require('../models/userInfo');
const multer = require('multer');
const upload = multer({dest:'uploads/'});

const appl = express.Router();
var uploading = multer({
  dest: __dirname + '../public/uploads/',
})

appl.get('/myProf', (req, res) => {
   var UserId= req.query.UserId;
    console.log(UserId +" --")


    if (UserId.length> 10){
    userInfo.findOne({_id: UserId })
    .then(UserInfor => {

      if (!UserInfor) 
      {
        console.log('not found');


    }
    else
    return res.json(UserInfor);


});
}

else{
  console.log('Id is Null ---------');

}

   

});


appl.post('/editPassword', (req, res) => {
  var UserId= req.query.UserId;
  var oldPass = req.query.Opassword;
  var NewPass = req.query.Npassword;
  var ConfNewPass = req.query.NCpassword;


  console.log(UserId +" --")

  userInfo.findOne({ _id: UserId })
  .then(UserInfor => {

    if (!UserInfor) 
    {
      console.log('not found');
    }
       else
       {
        if(oldPass==UserInfor.password){
           if(NewPass==ConfNewPass){

        // const update = {  { password: NewPass } }
        userInfo.findOneAndUpdate({ _id: UserId }, { password: NewPass },(err) => {
      if (err) console.log(err);
      else
      return  res.json({
        NT:'done'
    })

    })

           }
        else
        {
          return  res.json({
            NT:'password does not match'
        })
        }

           
        }
        else
        {
          return  res.json({
            NT:'The password is incorrect'
        })
        }

       }
        //return res.json(UserInfor);


});



});



appl.post('/saveImage',(req, res) => {
  

  var UserId= req.query.UserId;
 var imagePath= req.query.imagePath;



    console.log(UserId +" --ashraf")

    console.log(imagePath +" --")


  userInfo.findOne({ _id: UserId })
  .then(UserInfor => {

    if (!UserInfor) 
    {
      console.log('not found');
    }
       else
       {
        
        //   if(NewPass==ConfNewPass){

      
        userInfo.findOneAndUpdate({ _id: UserId }, { image: imagePath },(err) => {
      if (err) console.log(err);
      else
      return  res.json({
        NT:'done'
    })

    })

           }
      

      // }
        //return res.json(UserInfor);


});

  

});


module.exports = appl;



