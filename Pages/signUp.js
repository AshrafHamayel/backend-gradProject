
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1
const db = require('../config/database');
//const User = require('../models/user');
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

 

appl.post('/signUp', (req, res) => {

    var email = req.query.email;
    var name = req.query.name;
    var pass = req.query.password;
    var confPassword = req.query.confPassword;

    if (isEmailValid(email)) {

        if(confPassword!=pass){
       

            let newUser = new userInfo(
                {
                   
                    email: email,
                    name: name,
                    password: pass,
                    image: 'NoImage.jpg',
                    work :'بدون مهنة',
                    followers : '00',
                    Ifollow : '00',
                    evaluation :'00',
                    description : 'اضف وصف لعملك'

                });


        newUser.save((err) => {
            if (!err) {

              res.json({
                  NT:'done'
                      })
              console.log("done ");
                        
                      
            }

            else {
            
                res.json({
                    NT:'Email exists !'
                })
                console.log('Email exists !');

            }

        })


    }
    else{

        console.log("password does not match"); 

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


module.exports = appl;