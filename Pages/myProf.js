
const express = require('express');
const db = require('../config/database');
//const User = require('../models/user');
const posts = require('../models/posts');
const userInfo = require('../models/userInfo');
const multer = require('multer');
const upload = multer({dest:'uploads/'});

const appl = express.Router();
var uploading = multer({
  dest: __dirname + '../public/uploads/',
})

appl.get('/myProf', (req, res) => {
   var emailP= req.query.email;
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


appl.post('/editPassword', (req, res) => {
  var emailP= req.query.email;
  var oldPass = req.query.Opassword;
  var NewPass = req.query.Npassword;
  var ConfNewPass = req.query.NCpassword;


  console.log(emailP +" --")

  userInfo.findOne({ email: emailP })
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
        userInfo.findOneAndUpdate({ email: emailP }, { password: NewPass },(err) => {
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
  

  var emailP= req.query.email;
 var imagePath= req.query.imagePath;



    console.log(emailP +" --ashraf")

    console.log(imagePath +" --")


  //  userInfo.findOne({ email: emailP })
  //  .then(UserInfor => {

  //    if (!UserInfor) 
  //    {
  //      console.log('not found');

  //  }
  //  else
  //  {

  return res.json({
    NT:'done'
        })

  //}


// });


  

});





module.exports = appl;





