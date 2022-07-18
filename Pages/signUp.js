
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1
const db = require('../config/database');
const User = require('../models/user');

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


//appl.use(authenticate);///     2

// appl.post('/signUp', (req, res) => {

//     var email = req.params['email'];

//     console.log(email)

//     req.on("data", (data) => {
//         console.log(JSON.parse(data))
//     })

//     if (isEmailValid(email)) {

//         var name = req.body.name;
//         var pass = req.body.password;

//         let newUser = new User(
//             {
//                 name: name,
//                 email: email,
//                 password: pass,
//                 image: 'asd.png'

//             });


//         newUser.save((err) => {
//             if (!err) {
//                 console.log('done !');
//                 res.json({
//                     Message: "Done successfully"
//                 })
//             }

//             else {
//                 console.log('Email exists !');

//             }

//         })


//     }

//     else {
//         res.send('Invalid Email !');

//     }


// });

appl.post('/signUp', (req, res) => {

    var email = req.query.email;

    if (isEmailValid(email)) {

        var name = req.query.name;
        var pass = req.query.password;

        let newUser = new User(
            {
                name: name,
                email: email,
                password: pass,
                image: 'asd.png'

            });


        newUser.save((err) => {
            if (!err) {

                console.log('done !');
                res.json("done ")
            }

            else {
                console.log('Email exists !');
                res.json('Email exists !')
            }

        })


    }

    else {
        res.send('Invalid Email !');

    }


});


module.exports = appl;