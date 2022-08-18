
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1
const db = require('../config/database');
const userInfo = require('../models/userInfo');

const appl = express.Router();

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


function isEmailValid(email) {
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) { return part.length > 63; }))
        return false;

    return true;
}

 

appl.post('/signUp', (req, res,err) => {

    var email = req.query.email;
    var name = req.query.name;
    var pass = req.query.password;
    var confPassword = req.query.confPassword;
    var token = req.query.fbm;
    
    console.log(email);
    if (isEmailValid(email)) {

      
       

            let newUser = new userInfo(
                {
                   
                    email: email,
                    name: name,
                    password: pass,
                    image: 'NoImage.jpg',
                    work :'بدون مهنة',
                    followers : 00,
                    Ifollow : 00,
                    evaluation :00,
                    description : 'اضف وصف لعملك',
                    Section:'لا يوجد',
                    phoneNumber:'غير منوفر',
                    city:'لا يوجد',
                    Salary:'100',
                    Type:'email',
                    Token:token,


                });

                if(pass== confPassword){
        newUser.save((err) => {
            if (!err) {

             
              res.json({
                  NT:'done',
                  uid:newUser._id,
                  imegUrl:newUser.image,
                      })
              console.log("done ");
                        
                      
            }

            else {
            
                console.log('Email exists !');
                console.log(err);
                res.json({
                    NT:'Email exists !'
                })
                console.log('Email exists !');

            }

        })


    }
    else{

        console.log("password does not match"); 
        console.log('this error'+err)
        res.json({
            NT:'password does not match'
        })
    }

    }

    else {

        res.json({
            NT:'Invalid Email !'
        })
        console.log('Invalid Email !');

    }


});



appl.post('/addUserFromGoogleOrFacebook', (req, res,err) => {

    var email = req.query.email;
    var name = req.query.name;
    var Uimage = req.query.image;
    var token = req.query.fbm;

    if (isEmailValid(email)) {
            let newUser = new userInfo(
                {
                   
                    email: email,
                    name: name,
                    password:'password',
                    image: Uimage,
                    work :'بدون مهنة',
                    followers : 00,
                    Ifollow : 00,
                    evaluation :00,
                    description : 'اضف وصف لعملك',
                    Section:'لا يوجد',
                    phoneNumber:'غير منوفر',
                    city:'لا يوجد',
                    Type:'Google',
                    Salary:'100',

                    Token:token,


                });

               
        newUser.save((err) => {
            if (!err) {

             
              res.json({
                  NT:'done',
                  uid:newUser._id,
                      })
              console.log("done ");
                        
                      
            }

            else {
            
                console.log('Email exists !');
                res.json({
                    NT:'Email exists !',
                    uid:newUser._id,
                })

            }

        })
    }

});





appl.post('/addInfoUser', (req, res,err) => {

    var Uid = req.query.UserId;
    var _work = req.query.Work;
    var _description = req.query.Description;
    var _phoneNumber = req.query.PhoneNumber;
    var _salary = req.query.Salary;
    var _city = req.query.City;

    console.log(Uid);

    userInfo.findOneAndUpdate({ _id: Uid }, { work: _work , description:_description , phoneNumber:_phoneNumber ,Salary:_salary ,city:_city  },(err) => {
        if (err) {
            console.log(err);
            console.log('Email Not exists !');
            return  res.json({
                NT:'Email Not exists !'
            });


        }
        else
        {
            return  res.json({
                NT:'done'
            });

        }
       
  
      })

});






module.exports = appl;